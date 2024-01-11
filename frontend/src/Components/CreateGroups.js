import React, { useState } from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Dialog, DialogActions, DialogContent, DialogContentText, IconButton,DialogTitle,Button} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateGroups() {
  let lightTheme=useSelector((state)=>state.themeKey);
    //className={`search-box ${lightTheme?'':'dark'}`}
    const userData=JSON.parse(localStorage.getItem('userData'));
    const nav=useNavigate();
    if(!userData){
        console.log('user not authenticated');
        nav(-1)
    }  
    const user=userData.data;
    const [groupName,setGroupName]=useState(" ");
    const [open,setOpen]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true)
    }    
  const handleClose=()=>{
    setOpen(false)
  }  

  const createGroup=()=>{
    const config={
      headers:{
          Authorization:`Bearer ${user.token}`
      }}

      axios.post('http://localhost:8080/chat/createGroup',{
        name:groupName,
        users:null},config);
        nav("/app/groups");
  }
return (
  <>
  <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title'
  aria-describedby='alert-dialog-description'>
  <DialogTitle id="alert-dialog-title">
    {"Do you want to create a Group Named"+groupName}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id='alert-dialog-description'>
      This will create a group in which you will be the admin and other will be
      to join this group
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Disagrre</Button>
    <Button autoFocus onClick={()=>{
      createGroup(); handleClose();
    }}>Agree</Button>
  </DialogActions>
  </Dialog>
  <div  className={`createGroups-container ${lightTheme?'':'dark'}`} >
    <input className={`search-box ${lightTheme?'':'dark'}`} name=''
     placeholder='Enter Group Name' onChange={(e)=>setGroupName(e.target.value)}/>
     <IconButton className={`icon ${lightTheme?'':'dark'}`}
     onClick={()=>{handleClickOpen()}}>
      <DoneOutlineIcon/>
    </IconButton>
    <IconButton className={`${lightTheme?'':'dark'}`}>
      <DoneOutlineIcon/>
    </IconButton>
  </div>
  </> 
)
}

export default CreateGroups