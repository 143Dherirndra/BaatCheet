import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
  import { useSelector } from "react-redux";
const Signup = () => {
    let navigate= useNavigate()
    const [show, setshow] = useState(false)
    const [userName, setuserName] = useState('')
     const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [loading, setloading] = useState(false);
      const [error, seterror] = useState('');
      let dispatch= useDispatch();
      // const user = useSelector(state => state.user.userData);
// console.log("Redux user 👉", user);
const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true)

  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signup`,
      { userName, email, password },
      { withCredentials: true }
    );

    // console.log("Signup Result 👉", result);        // full response
    // console.log("Signup Data 👉", result.data);    // user object
    dispatch(setUserData(result.data))
    navigate("/Login")
  setEmail("");
  setPassword("");
  setloading(false)
  seterror("")
    // setTimeout(() => {
    //   navigate('/Login');
    // }, 500);

  } catch (error) {
    console.error("Signup Error 👉", error.response?.data || error.message);
    setloading(false);
     seterror(error?.response?.data?.message);

  }
};

  return (
    <div className='w-full h-[100vh] bg-blue-100 justify-center flex items-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className=' h-[200px] w-full bg-[#20c7ff] shadow-gray-400 rounded-b-[30%] shadow-lg flex justify-center items-center'>
                <h1 className=' font-semibold text-[30px] text-gray-600'>Welcome to <span className='text-white'>Real Chat</span></h1>
            </div>

            <form className=' w-full flex flex-col gap-[20px] items-center' onSubmit={handleSubmit}>
                <input onChange={(e)=>setuserName(e.target.value)} value={userName} className='border-2 w-[90%] h-[50px] outline-none bg-white rounded-lg  shadow-lg border-[#20c7ff]' type="text" placeholder='enter userName' />
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border-2 w-[90%] h-[50px] outline-none bg-white rounded-lg  shadow-lg border-[#20c7ff]' type="email" placeholder=' enter Email'/>
               <div className='w-[90%] relative h-[50px] border-[#20c7ff] border-2 rounded-lg overflow-hidden shadow-gray-200 shadow-lg'>
  <input
  onChange={(e)=>setPassword(e.target.value)}
  value={password}
    type={show ? "text" : "password"}
    className='w-full h-full outline-none px-[20px] py-[10px] bg-white text-gray-600 text-[19px]'
    placeholder='password'
  />

  <span
    className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer'
    onClick={() => setshow(prev => !prev)}
  >
    {show ? "hide" : "show"}
  </span>
  {error && <p className=' text-red-400'>{"*" +error}</p>}
</div>

                <button className='w-[200px] bg-[#20c7ff] px-12 py-[12px] h-11 rounded-full shadow-gray-300 shadow-lg mt-[20px]
                hover:shadow-inner  '>{loading?"Sign up...":"signup"}</button>
                <p onClick={()=>navigate('/Login')}>Already have an Account <span className='text-[#20c7ff] font-semibold cursor-pointer'>Login</span> </p>
            </form>
        </div>
        
    </div>
  )
}

export default Signup