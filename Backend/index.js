import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import{ app, server }from './SocketIo/Socket.js'
dotenv.config()


const port = process.env.PORT || 5000

app.use(express.json()); // MUST be before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
server.listen(port, () => {
  connectDB()
  console.log(`Server running on port ${port}`)
})
