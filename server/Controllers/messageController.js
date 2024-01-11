const Chat=require("../modals/chatModel");
const User=require("../modals/userModel");
const Message=require("../modals/messageModel");
const expressAsyncHandler = require("express-async-handler");

const allMessages=expressAsyncHandler(async(req,res)=>{
  try{
   const messages=await Message.find({chat:req.params.chatId})
   .populate("sender","name email")
   .populate("reciever")
   .populate("chat");
   res.json(messages);
  }catch(error){
    res.status(400);
    throw new Error(error.message)
  }
}) 

const sendMessage=expressAsyncHandler(async(req,res)=>{
  const {content,chatId}=req.body;
  if(!content || !chatId){
    return res.sendStatus(400)
  }
  var newMessage={
    sender:req.user._id,
    content:content,
    chat:chatId
  }
  try{
   var message=await Message.create(newMessage);
   message=await message.populate('sender','name');
   message=await message.populate('chat');
   message=await message.populate('reciever');
   message=await User.populate(message,{
    path:'chat.users',
    select:'name email'
   });
   await Chat.findByIdAndUpdate(req,body.chatId,{latestMessage:message})
   res.json(message);
  }catch(error){
    res.status(400);
    throw new Error(error.message)
  }
})

module.exports={allMessages,sendMessage};
