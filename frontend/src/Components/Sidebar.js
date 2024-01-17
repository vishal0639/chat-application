import React,{useState,useEffect,useContext} from 'react'
import './myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
//import ConversationsItem from './ConversationsItem';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import axios from 'axios';
//import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {myContext} from './MainContainer';

function Sidebar() {
 
 const navigate=useNavigate();
 const dispatch= useDispatch();
 let lightTheme=useSelector((state)=>state.themeKey);
 const [refresh,setRefresh]=useContext(myContext)
 let [conversations,setConversations]=useState([]);
 const userData=JSON.parse(sessionStorage.getItem('userData'));
 if(!userData){
  console.log("user not authenticated");
  navigate("/");
 }
 const user=userData.data;
 useEffect(()=>{
  const config={
    headers:{
        Authorization:`Bearer ${user.token}`
    }
   }
   axios.get('http://localhost:8080/chat/',config)
   .then((response)=>{
    setConversations(response.data)
   })
 },[]);
return (
<div className='sideBar-container'>
  <div className={`sb-header ${lightTheme?'':'dark'}`}>
    <div>
    <IconButton>
    <AccountCircleIcon className={`icons ${lightTheme?'':'dark'}`}/>
    </IconButton>
    </div>
    <div className='other-icons'>
    <IconButton onClick={()=>{navigate('users')}}>
      <PersonAddIcon className={`icons ${lightTheme?'':'dark'}`}/>
    </IconButton>
    <IconButton onClick={()=>{navigate('groups')}}>
      <GroupAddIcon className={`icons ${lightTheme?'':'dark'}`}/>
    </IconButton>
    <IconButton onClick={()=>{navigate('create-groups')}}>
      <AddCircleIcon className={`icons ${lightTheme?'':'dark'}`}/>
    </IconButton>
    <IconButton onClick={()=>{ dispatch(toggleTheme())}}>
    {lightTheme && <NightlightIcon className={`icons ${lightTheme?'':'dark'}`}/>}
    {!lightTheme && <LightModeIcon className={`icons ${lightTheme?'':'dark'}`}/>}
    </IconButton>  
    </div>
  </div>
  <div className={`sb-search  ${lightTheme?'':'dark'}`}>
    <IconButton>
        <SearchIcon className={`${lightTheme?'':'dark'}`}/>
    </IconButton>
    <input placeholder='search' className={`search-box ${lightTheme?'':'dark'}`}/>
  </div>
  <div className={`sb-conversations ${lightTheme?'':'dark'}`}>
    {conversations.map((conversation,index)=>{
      var chatName='';
      if(conversation.isGroupChat){
        chatName=conversation.chatName;
      }else{
        conversation.users.map((user)=>{
          if(user._id!==userData.data._id){
           return chatName=user.name;
          }
        })
      }

    if(conversation.latestMessage===undefined){
      return(
        <div key={index} onClick={()=>{setRefresh(!refresh)}}>
        <div key={index} className='conversation-container' 
        onClick={()=>{navigate("chat/"+conversation._id+"&"+chatName)}}>
          <p className='con-icon' >{chatName[0]}</p> 
          <p className={`con-title  ${lightTheme?'':'dark'}`}>{chatName}</p> 
          <p className={`con-lastMessage  ${lightTheme?'':'dark'}`}>
          No previous Messages,Click here to start new Chat  
          </p> 
        </div>
        </div>
      )
    }else{
      return(
        <div key={index} onClick={()=>{setRefresh(!refresh)}}>
        <div key={index} className='conversation-container' 
        onClick={()=>{navigate("chat/"+conversation._id+"&"+chatName)}}>
          <p className='con-icon' >{chatName[0]}</p> 
          <p className={`con-title  ${lightTheme?'':'dark'}`}>{chatName}</p> 
          <p className={`con-lastMessage  ${lightTheme?'':'dark'}`}>
          {conversation.latestMessage.content}  
          </p> 
        </div>
        </div>
      )
    }

   /*return <ConversationsItem props={conversation} 
    key={conversation.name}
    />*/
    })}
  </div>
</div>
)
}

export default Sidebar