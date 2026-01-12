




import React, { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../redux/messageSlice";
import { setselectedUser } from "../redux/userSlice";
import { setmessage } from "../redux/messageSlice";
import Sender from "./Sender";
import Reveiver from "./Reveiver";
import dp from "../assets/dp.jpg";
import { serverUrl } from "../main";

const Messagearea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData, socket } = useSelector(
    (state) => state.user
  );
  const { message } = useSelector((state) => state.message);

  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const imageRef = useRef(null);
  const bottomRef = useRef(null);

  // ✅ auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);




useEffect(() => {
  if (!socket) return;

  const handleNewMessage = (newMsg) => {
    // ❗ filter: sirf selected user ke message lo
    if (
      newMsg.sender === selectedUser?._id ||
      newMsg.receiver === selectedUser?._id
    ) {
      dispatch(addMessage(newMsg));
    }
  };

  socket.on("newMessages", handleNewMessage);

  return () => {
    socket.off("newMessages", handleNewMessage);
  };
}, [socket, selectedUser, dispatch]);


  // ✅ emoji
  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  // ✅ image select
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // ✅ send message
  const handleSendMessage = async () => {
    if (!input && !backendImage) return;

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (backendImage) formData.append("image", backendImage);

      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      // dispatch(setmessage([...message, res.data]));

      dispatch(addMessage(res.data));


      setInput("");
      setBackendImage(null);
      setFrontendImage(null);
      setShowPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UI =================
  return (
    <div
      className={`${
        selectedUser ? "flex" : "hidden"
      } flex-col w-full lg:w-[70%] min-h-screen bg-slate-400 border-l`}
    >
      {/* ---------- HEADER ---------- */}
      {selectedUser && (
        <div className="flex items-center gap-3 px-4 h-[80px] bg-[#0d7ea3] shadow-md">
          <IoArrowBack
            onClick={() => dispatch(setselectedUser(null))}
            className="text-2xl text-white cursor-pointer lg:hidden"
          />

          <img
            src={selectedUser.image || dp}
            className="w-12 h-12 rounded-full object-cover"
            alt=""
          />

          <h1 className="text-white font-semibold text-lg">
            {selectedUser.userName}
          </h1>
        </div>
      )}

      {/* ---------- CHAT AREA ---------- */}
      <div className="flex-1 h-[70%]  overflow-auto px-[20px] py-[30px] pb-[90px] flex flex-col gap-[20px]">
        {message &&
          message.map((mess, index) =>
            mess.sender === userData?._id ? (
              <Sender
                key={index}
                image={mess.image}
                message={mess.message}
              />
            ) : (
              <Reveiver
                key={index}
                image={mess.image}
                message={mess.message}
              />
            )
          )}
        <div ref={bottomRef} />
      </div>

      {/* ---------- EMOJI PICKER ---------- */}
      {showPicker && (
        <div className="absolute bottom-[110px] left-4 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={280} />
        </div>
      )}

      {/* ---------- IMAGE PREVIEW ---------- */}
      {frontendImage && (
        <img
          src={frontendImage}
          alt=""
          className="w-[80px] h-[80px] object-cover rounded-lg absolute bottom-[110px] right-6 shadow-lg"
        />
      )}

      {/* ---------- INPUT AREA ---------- */}
      {selectedUser && (
        <div className="w-full bg-[#20c7ff] px-3 py-3">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 bg-white/20 rounded-full px-4 py-2"
          >
            <MdOutlineEmojiEmotions
              className="text-2xl text-white cursor-pointer"
              onClick={() => setShowPicker((prev) => !prev)}
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bg-transparent outline-none text-white placeholder-white"
            />

            <input
              type="file"
              hidden
              accept="image/*"
              ref={imageRef}
              onChange={handleImage}
            />

            <FaRegImage
              className="text-xl text-white cursor-pointer"
              onClick={() => imageRef.current.click()}
            />

            <IoMdSend
              className="text-2xl text-white cursor-pointer"
              onClick={handleSendMessage}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Messagearea;
