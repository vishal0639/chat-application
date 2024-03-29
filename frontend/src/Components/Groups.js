import React, { useState,useEffect ,useContext} from 'react'
import './myStyles.css'
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/live-chat.png';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./MainContainer";

function Groups() {

    let lightTheme=useSelector((state)=>state.themeKey);
    let navigate=useNavigate();
    let dispatch=useDispatch();
    const { refresh, setRefresh } = useContext(myContext);
    const [groups,setGroups]=useState([]);
    const userData=JSON.parse(sessionStorage.getItem('userData'));
    if(!userData){
     console.log("user not authenticated");
     navigate("/");
    }
    const user=userData.data;
    useEffect(()=>{
        console.log("Users refreshed : ", user.token);
     const config={
       headers:{
           Authorization:`Bearer ${user.token}`
       }
      }
      axios.get('http://localhost:8080/chat/fetchGroips',config)
      .then((response)=>{
       setGroups(response.data)
      })
    },[refresh,user.token]);
    
return (
<AnimatePresence>
<motion.div 
initial={{opacity:0,scale:0}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:0}}
transition={{
    ease:'anticipate',
    duration:'0.3'
}}
className='list-container'>
<div className={`ug-header ${lightTheme?'':'dark'}`}>
    <img src={logo} alt='logo'
    style={{height:'2rem',width:'2rem',marginLeft:'10px'}}/>
    <p className={`ug-title ${lightTheme?'':'dark'}`}>Available Groups</p>
</div>
<div className={`sb-search ${lightTheme?'':'dark'}`}>
    <IconButton onClick={()=>{setRefresh(!refresh)}}>
        <RefreshIcon className={`${lightTheme?'':'dark'}`}/>
    </IconButton>
    <input placeholder='search' className={`search-box ${lightTheme?'':'dark'}`} />
 </div>
<div className={`sb-search ${lightTheme?'':'dark'}`}>
    <IconButton>
        <SearchIcon className={`${lightTheme?'':'dark'}`}/>
    </IconButton>
    <input placeholder='search' className={`search-box ${lightTheme?'':'dark'}`} />
 </div>
 <div className='ug-list'>
    {groups.map((group,index)=>{
     return(
        <motion.div whileHover={{scale:1.01}} whileTap={{scale:0.98}}
        className={`list-item ${lightTheme?'':'dark'}`} key={index}
        onClick={()=>{
            const config={headers:{
                    Authorization:`Bearer ${userData.data.token}`}}
         axios.put("http://localhost:8080/chat/addSelfToGroup",{
            chatId:group._id,
            userId:userData.data._id
         },config)
         dispatch(refreshSidebarFun())          
        }}>
           <p className='con-icon'>T</p>
           <p className={`con-title ${lightTheme?'':'dark'}`}>{group.chatName}</p>
       </motion.div> 
     );
    })}       
 </div>
</motion.div>    
</AnimatePresence>    
    )
}

export default Groups