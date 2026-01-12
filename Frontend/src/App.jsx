import React from 'react'
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import getCurrentUser from './CustomHook/GetCurrentUser'
import Profile from './pages/profile'
import Home from './pages/Home'
import Login from "./pages/Login"
import { useDispatch, useSelector } from 'react-redux'
import getOtherUser from './CustomHook/getOtherUser'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
import { serverUrl } from './main'
import { setonlineUser, setsocket } from './redux/userSlice'

  
const App = () => {
let {userData,socket,onlineUser}= useSelector(state=>state.user)
 let dispatch= useDispatch()
getCurrentUser();
getOtherUser();



useEffect(() => {
  if(userData){
    const socketio = io(serverUrl, {
      query: {
        userId: userData._id
      }
    });

    dispatch(setsocket(socketio));

    socketio.on("getOnlineUser", (users)=>{
      dispatch(setonlineUser(users));
    });

    return () => socketio.disconnect();
  } else {
    if(socket){
      socket.disconnect();
      dispatch(setsocket(null));
    }
  }
}, [userData, dispatch]);


  return (
    <div className='overflow-y-none '>
     <div>
       <Routes>
        {/* <Route path="/Signup" element={!userData?<Signup/>: <Navigate to={'/Profile'}/>}/> */}
        <Route path="/Signup" element={<Signup/>}/>
        
        {/* <Route path="/Login" element={!userData?<Login/>:<Navigate to={'/'}/>}/> */}
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={userData?<Home/>: <Navigate to={'/Login'}/>}/>
        <Route path="/Profile" element={userData?<Profile/> :<Navigate to={'/Signup '}/>}/>
      </Routes>
     </div>
      <div className='font-bold h-[20px] overflow flex w-full rounded-full items-center justify-center text-red-500  '><h1>made by Dhirendra pal </h1></div>
    </div>
  )
}

export default App
