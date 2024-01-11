const mongoose=require('mongoose');
const {Schema:{Types:{ObjectId:id}}}=mongoose;

const chatModel=mongoose.Schema({
    chartName:{
        type:String
    },
    isGroupChat:{
        type:Boolean
    },
    users:[
        {type:id,
         ref:'User'
        }
    ],
    latestMessage:{
        type:id,
        ref:'Message'
    },
    groupAdmin:{
        type:id,
        ref:'User'
    }
}

)

const Chat=mongoose.model("Chat",chatModel);

module.exports=Chat;