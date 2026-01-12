import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { serverUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { setotherUser, setUserData, setselectedUser, setsearchData } from "../redux/userSlice";
import axios from "axios";

const Sidebar = () => {
  const { userData, otherUser,selectedUser,onlineUser,searchData } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("")
  const navigate = useNavigate();
 
const dispatch = useDispatch();

  const hanldeLogOut = async () => {
    try {
       let result=await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setotherUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
   const hanldeSearch = async () => {
    try {
       let result= await axios.get(`${serverUrl}/api/user/search?query=${input}`, {
        withCredentials: true,
      });

     
      dispatch(setsearchData(result.data))
      console.log(result)
    } catch (error) {
     console.log(error)
    }
  };
  useEffect(()=>{
    if(input){
  hanldeSearch()
    }
  
  },[input])


  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block ${!selectedUser?"block":"hidden"}
     bg-slate-200 h-screen flex flex-col relative`}>

      {/* Logout */}
      <div
        onClick={hanldeLogOut}
        className="w-[55px] h-[55px] rounded-full bg-[#20c7ff] fixed bottom-5 left-3 cursor-pointer shadow-lg flex justify-center items-center z-50"
      >
        <RiLogoutCircleLine className="w-6 h-6 text-white" />
      </div>

      {
        input.length>0 && <div className="flex  absolute top-[250px] w-full h-[500px]
         overflow-y-auto items-center pt-[20px] bg-white flex-col gap-[10px] shadow-lg z-[150] ">
          {searchData?.map((user)=>(
            <div className="w-[95%] border-b-2 flex items-center h-[70px] gap-[20px] hover:bg-[#78cae5] cursor-pointer" 
            onClick={()=>{dispatch(setselectedUser(user))
              setInput("")
              setSearch(false)
            }}>
            <div className=" relative rounded-full bg-white flex justify-center items-center">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden justify-center items-center ">
              <img src={user.image || dp} alt="" className="h-[100%]" />
              </div>
              {onlineUser?.includes(user._id) &&
               <span className="w-[13px] h-[13px] absolute rounded-full bg-green-500 shadow-gray-400 shadow-lg"></span>}

            </div>
      

            </div>
          )) }

        </div>
      }

      {/* Top Section */}
      <div className="w-full bg-[#20c7ff] rounded-b-[30%] shadow-lg px-6 py-6">

        <h1 className="text-white text-lg">Chatly</h1>

        <div className="flex items-center justify-between mt-2">
          <h2 className="text-gray-700 font-semibold">
            hi’ {userData?.userName}
          </h2>

          <div
            onClick={() => navigate("/Profile")}
            className="w-[55px] h-[55px] rounded-full overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={userData?.image || dp}
              className="w-full h-full object-cover rounded-full"
              alt="profile"
            />
          </div>
        </div>

        {/* Search + Horizontal Users */}
        <div className="mt-5 flex items-center gap-4 overflow-x-auto scrollbar-hide">

          {!search && (
            <div
              onClick={() => setSearch(true)}
              className="min-w-[55px] h-[55px] rounded-full bg-white shadow-lg flex justify-center items-center cursor-pointer"
            >
              <IoIosSearch className="w-6 h-6" />
            </div>
          )}

          {search && (
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 w-full">
              <IoIosSearch className="w-5 h-5" />
              <input
                type="text"
                placeholder="search user..."
                className="flex-1 outline-none"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-5 h-5 cursor-pointer"
                onClick={() => setSearch(false)}
              />
           
            </div>
          )}

          {!search &&
            otherUser?.map((user) => (
              onlineUser?.includes(user._id) &&
              <div
               onClick={()=>dispatch(setselectedUser(user))}
                key={user._id}
                className="min-w-[55px] cursor-pointer h-[55px] rounded-full overflow-hidden relative justify-center items-center shadow-lg mt-[10px]"
              >
               <div className=" w-[60px] h-[60px] rounded-full justify-center items-center">
                 <img
                  src={user.image || dp}
                  className="w-full h-full object-cover rounded-full"
                  alt="user"
                />
               </div>
               
              </div>
            ))}
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col items-center mt-[20px] gap-[20px] w-full h-[50%] overflow-auto px-3 py-4 space-y-3">

        {otherUser?.map((user) => (
          <div
            key={user._id}
            onClick={()=>dispatch(setselectedUser(user))}
            className="w-full h-[60px] bg-white rounded-full shadow-md flex items-center gap-4 px-3 cursor-pointer hover:bg-slate-100"
          >
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
              <img
                src={user.image || dp}
                className="w-full h-full object-cover rounded-full"
                alt="user"
              />
            </div>

            <h1 className="text-gray-700 font-semibold text-sm">
              {user.userName || user.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


