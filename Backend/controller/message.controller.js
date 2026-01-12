import { io } from "../SocketIo/Socket.js";


import uploadCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIo/Socket.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image = "";
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    // 🔍 find conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    // ✉️ create new message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    // 🆕 create conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const ReceiverSocketId=getReceiverSocketId(receiver);
    if(ReceiverSocketId){
      io.to(ReceiverSocketId).emit("newMessages"
,newMessage);
      
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `sendMessage error: ${error.message}` });
  }
};




export const getMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    // ✅ very important
    if (!conversation) {
      return res.status(200).json([]); // empty chat, NOT error
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getMessage error: ${error.message}` });
  }
};
