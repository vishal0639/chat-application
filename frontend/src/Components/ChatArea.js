import { IconButton } from '@mui/material';
import React,{useState,useEffect,useContext} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { io } from "socket.io-client";
import {myContext} from './MainContainer';

const ENDPOINT='http://localhost:8080';
var socket;

export default function ChatArea({props}) {

  let lightTheme=useSelector((state)=>state.themeKey);
  const [messageContent,setMessageContent]=useState('');
  const dyParams=useParams();
  const [chat_id,chat_user]=dyParams._id.split("&");
  const [allMessages,setAllMessages]=useState([]);
  const [allMessagesCopy,setAllMessagesCopy]=useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  console.log("Context API : refresh : ", refresh);
  const [loaded,setLoaded]=useState(false);
  const [socketConnectionStatus,setSocketConnectionStatus]=useState(false);

  const sendMessage=()=>{
    var data=null;
    const config={
      headers:{
          Authorization:`Bearer ${userData.data.token}`
      }}
      axios.post('http://localhost:8080/message/',{
        content:messageContent,
        chatId:chat_id
      },config)
      .then(({response})=>{
         data=response;
         console.log('message fired');})
         socket.emit('newMessage',data);
        }
const userData=JSON.parse(localStorage.getItem('userData'));

useEffect(()=>{
  socket=io(ENDPOINT);
  socket.emit('setup',userData);
  socket.on('connection',()=>{
    setSocketConnectionStatus(!socketConnectionStatus);
  })
},[socketConnectionStatus,userData])

useEffect(()=>{
  socket.on('message recieved',(newMessage)=>{
    if(!allMessagesCopy ||!allMessagesCopy._id!==newMessage._id){

    }else{
      setAllMessages([...allMessages],newMessage);
    }
  })
},[allMessagesCopy,setAllMessages,allMessages])
//fetch chats
useEffect(()=>{
  const config={
    headers:{
        Authorization:`Bearer ${userData.data.token}`
    }}

    axios.post('http://localhost:8080/messages/'+chat_id,config)
    .then(({data})=>{
     setAllMessages(data);
     setLoaded(true);
     socket.emit("join chat",chat_id)
    })
    setAllMessagesCopy(allMessages);
},[refresh,chat_id,userData.data.token,allMessages])

if(!loaded){
  return(
    <div style={{
      border:'20px',padding:'10px',width:'100%',display:'flex',
      flexDirection:'column',gap:'10px'
    }}>
    <Skeleton variant="rectangular" sx={{width:'100%',borderRadius:'10px'}} height={60} />
    <Skeleton variant="rectangular" sx={{width:'100%',borderRadius:'10px',flexGrow:'1'}}  />
    <Skeleton variant="rectangular" sx={{width:'100%',borderRadius:'10px'}} height={60} />
    </div>
  )
}else{
  return (
    <div className='chartArea-container'>
       <div className={`chartArea-header ${lightTheme?'':'dark'}`}>
          <p className={`con-icon ${lightTheme?'':'dark'}`}>{props.name[0]}</p>
          <div className={`header-text ${lightTheme?'':'dark'}`}>
            <p className={`con-title ${lightTheme?'':'dark'}`}>{chat_user}</p>
            <p className={`con-timeStamp ${lightTheme?'':'dark'}`}>{props.timeStamp}</p>
          </div>
          <IconButton>
            <DeleteIcon className={`${lightTheme?'':'dark'}`}/>
          </IconButton>
      </div> 
       <div  className={`message-container ${lightTheme?'':'dark'}`}>
       {allMessages.slice(0).reverse().map((message,index)=>{
          const sender=message.sender;
          const self_id=userData.data._id;
          if(sender._id===self_id){
            return <MessageSelf props={message} key={index}/>
          }else{
            return <MessageOthers props={message} key={index}/>
          }
       })
       }
      </div> 
       <div className={`message-input-box ${lightTheme?'':'dark'}`}>
          <input placeholder='Type a message'
           className={`search-box ${lightTheme?'':'dark'}`}
           value={messageContent} onChange={(e)=>{setMessageContent(e.target.value)}}
           onKeyDown={(event)=>{
            if(event.code==='Enter'){
              sendMessage();
              setMessageContent('');
              setRefresh(!refresh)
            }
           }}/>
          <IconButton onClick={()=>{sendMessage();
            setRefresh(!refresh)}}>
            <SendIcon className={`${lightTheme?'':'dark'}`}/>
          </IconButton>
      </div> 
    </div>
  )
  }

}
