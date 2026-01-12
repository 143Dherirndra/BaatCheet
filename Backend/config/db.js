import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Db is  connected")
    } catch (error) {
        console.log("Db error");
    }
}

export default connectDB;



















