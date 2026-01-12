

import mongoose from "mongoose";


const userSchema= mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String,
        required: true,
        unique:true
    },
      email:{
        type:String,
        required: true,
        unique:true
    },
      password:{
        type:String,
        required: true,
        
    },
      image:{
        type:String,
        default:"https://tse2.mm.bing.net/th/id/OIP.q0yHLZixG7SoH8ckD2IuiQHaE8?pid=Api&P=0&h=180"
    }
},{ timestamps: true }
)

const User =mongoose.model("User",userSchema)
export default User
























