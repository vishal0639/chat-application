import React, { useEffect, useState } from 'react'
import './myStyles.css'
import { IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import logo from '../images/live-chat.png';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Users() {
    const [refresh,setRefresh]=useState(true);
    let lightTheme=useSelector((state)=>state.themeKey);
    const [users,setUsers]=useState([]);
    const userData=JSON.parse(localStorage.getItem('userData'));
    const nav=useNavigate();
    if(!userData){
        console.log('user not authenticated');
        nav(-1)
    }  
    useEffect(()=>{
        console.log('users refreshed');
        const config={
           headers:{
            Authorization:`Bearer ${userData.data.token}`
           } 
        }
      axios.get('http://localhost:8080/users/fetchUsers',config)
      .then((data)=>{
        console.log('user data from api',data);
        setUsers(data.data)
      })  
    },[refresh,userData.data.token])
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
    <p className={`ug-title ${lightTheme?'':'dark'}`}>Available Users</p>
    <IconButton onClick={()=>{setRefresh(!refresh)}}>
    <RefreshIcon/>
    </IconButton> 
</div>
<div className={`sb-search ${lightTheme?'':'dark'}`}>
    <IconButton>
        <SearchIcon className={`${lightTheme?'':'dark'}`}/>
    </IconButton>
    <input placeholder='search' className={`search-box ${lightTheme?'':'dark'}`} />
 </div>
 <div className='ug-list'>
    {users.map((user,index)=>{
      return(
        <motion.div className={`list-item ${lightTheme?'':'dark'}`}
        key={index} whileTap={{scale:0.98}} whileHover={{scale:1.01}}
        onClick={()=>{
            console.log('Creating user with',user.name);
            const config={
                headers:{
                    Authorization:`Bearer ${userData.data.token}`
                }
            }
            axios.post('htttp://localhost:8080/chat/',{
                userId:user._id
            },
            config
            )
        }}
        >
            <p className='con-icon'>T</p>
            <p className={`con-title ${lightTheme?'':'dark'}`}>{user.name}</p>
        </motion.div>
      );
    })}         
 </div>
 </motion.div>    
</AnimatePresence>
    )
}

export default Users;

/*


*/