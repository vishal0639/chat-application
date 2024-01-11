const mongoose=require('mongoose');
const {Schema:{Types:{ObjectId:id}}}=mongoose;

const messageModel=mongoose.Schema({
    sender:{
        type:id,
         ref:'User'
    },
    reciever:{
        type:id,
         ref:'User'
    },
    chat:{
        type:id,
        ref:'Chat'
    },   
  },
 {
    timeStamp:true
 }
)

const Message=mongoose.model('message',messageModel);

module.exports=Message;
