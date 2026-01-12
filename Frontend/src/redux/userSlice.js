import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUser:null,
        selectedUser:null,
        socket:null,
        onlineUser:null,
        searchData:null
    },
   reducers:{
    setUserData:(state,action)=>{
        state.userData= action.payload
    },
    setotherUser:(state,action)=>{
        state.otherUser= action.payload
    }
    ,
    setselectedUser:(state,action)=>{
        state.selectedUser= action.payload
    },
     setsocket:(state,action)=>{
        state.socket= action.payload
    },
     setonlineUser:(state,action)=>{
        state.onlineUser= action.payload
    }
    ,
     setsearchData:(state,action)=>{
        state.searchData= action.payload
    }
   }
})

export const {setUserData,setotherUser,setselectedUser,setsocket,setonlineUser,setsearchData}=userSlice.actions
export default userSlice.reducer


