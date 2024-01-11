import React from 'react'
import './myStyles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ConversationsItem({props}) {

    let navigate=useNavigate();
    let lightTheme=useSelector((state)=>state.themeKey);
return (
<div  className='conversation-container'
onClick={()=>{navigate("chat")}}>
 <p className='con-icon' >{props.name[0]}</p> 
 <p className={`con-title  ${lightTheme?'':'dark'}`}>{props.name}</p> 
 <p className={`con-lastMessage  ${lightTheme?'':'dark'}`}>{props.lastMessage}</p> 
 <p className={`con-timeStamp  ${lightTheme?'':'dark'}`}>{props.timeStamp}</p> 
</div>
)
}

export default ConversationsItem