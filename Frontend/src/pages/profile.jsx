

import React, { useRef, useState } from "react";
import dp from "../assets/dp.jpg";
import { FaCamera } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const serverUrl = "http://localhost:8000"; // ✅ FIX

  // const [name, setName] = useState(userData?.name || "");
  const [userName, setUserName] = useState(userData?.userName || "");

  const [frontendImage, setFrontendImage] = useState(userData?.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const imageRef = useRef(null);




  if (!userData) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", userName);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.put(
  "http://localhost:8000/api/user/profile",
  formData,
  { withCredentials: true }
);


      dispatch(setUserData(res.data)); // ✅ Redux update
      navigate("/")
      console.log("Profile updated:", res.data);

    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col justify-center items-center gap-6">
      
      <div className="fixed top-5 left-5 cursor-pointer" onClick={() => navigate("/")}>
        <IoArrowBack className="text-3xl text-gray-500" />
      </div>

      <div className="bg-white rounded-full border-4 border-[#20c7ff] shadow-lg relative">
        <div
          className="w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer"
          onClick={() => imageRef.current.click()}
        >
          <img src={frontendImage} className="w-full h-full object-cover" />
        </div>
        <FaCamera className="absolute right-5 bottom-4 text-gray-700 w-7 h-7" />
      </div>

      <form onSubmit={handleProfile} className="w-[95%] max-w-[500px] flex flex-col gap-5 items-center">
        <input type="file" accept="image/*" ref={imageRef} hidden onChange={handleImage} />

        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2 w-[90%] h-[50px] px-3 rounded-lg border-[#20c7ff]"
        />

        <input readOnly value={userData.userName}
          className="border-2 w-[90%] h-[50px] px-3 rounded-lg border-[#20c7ff]" />

        <input readOnly value={userData.email}
          className="border-2 w-[90%] h-[50px] px-3 rounded-lg border-[#20c7ff]" />

        <button type="submit"
          className="text-lg bg-[#20c7ff] w-[200px] rounded-full h-[40px] shadow-lg">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
