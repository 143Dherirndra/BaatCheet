

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpg";

const Sender = ({ image, message }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // ✅ get userData properly
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImage = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex items-start gap-[10px]"
    >


      {/* message */}
      <div className="ml-auto w-fit max-w-[500px] px-4 py-2 flex flex-col gap-2
      bg-[#0b7295] text-white rounded-2xl rounded-tr-none shadow-lg" ref={scrollRef}>
        {image && (
          <img
            src={image}
            alt="sent"
            className="w-[150px] rounded-lg object-cover"
            onLoad={handleImage}
          />
        )}
        {message && <span className="text-[18px]">{message}</span>}
      </div>
            {/* profile image */}
      <div
        className="w-[40px] h-[40px] rounded-full flex justify-center items-center 
        overflow-hidden bg-white shadow-gray-300 shadow-lg "
        onClick={() => navigate("/Profile")}
      >
        <img
          src={userData?.image || dp}
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Sender;
