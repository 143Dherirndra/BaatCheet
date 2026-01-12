import http from 'http'
import {Server} from 'socket.io'
import express from 'express';
import { Socket } from 'dgram';
 const app = express();

 const server= http.createServer(app)

 const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
 })

 const userSocketMap={};

 export const getReceiverSocketId=(receiver)=>{
   return userSocketMap[receiver]
 }

io.on("connection",(socket)=>{
  const userId = socket.handshake.query.userId;

  if(userId){
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    if(userId){
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});


 export {app,server,io}


