import React,{useState} from 'react';
import logo from '../images/live-chat.png';
import { Button, TextField ,Backdrop,CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster';

function Login() {

const [showlogin,setShowlogin]=useState(false);
const [data,setData]=useState({name:'',email:'',password:''});
const [loading,setLoading]=useState(false);

const [loginStatus,setLoginStatus]=React.useState('');
const [signInStatus,setSignInStatus]=React.useState('');

const navigate=useNavigate();

const changehandler=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
}

const loginHandler=async(e)=>{
  setLoading(true);
 try{
  const config={headers:{"Content-type":"application/json"}};
  let response=await axios.post("http://localhost:8080/user/login/",data,config);
  console.log('Login:',response);
  setLoginStatus({msg:"Success",key:Math.random()});
  setLoading(false);
  localStorage.setItem("userData",JSON.stringify(response));
  navigate("/app/welcome");
 }catch(error){
  setLoginStatus({msg:'Invalid user name or password',
  key:Math.random()});
 }
 setLoading(false)
}

const signUpHandler=async()=>{
  setLoading(true);
 try{
  const config={headers:{
      "Content-type":"application/json"}
  }
  const response=await axios.post('http://localhost:8080/user/register',data,config);
  console.log(response);
  setSignInStatus({msg:'Success',key:Math.random()});
  navigate("/app/welcome");
  localStorage.setItem("userData",JSON.stringify(response));
  setLoading(false);
 }catch(error){
  console.log(error);
  console.log(error.response.status);
  if(error.response.status===405){
    setLoginStatus({msg:'User with this email already exists',
   key:Math.random()})
  }
  setLoading(false);
 }
}

return (
  <>
  <Backdrop sx={{colors:'#fff',zIndex:(theme)=>theme.zIndex.drawer+1}} open={loading}>
  <CircularProgress color='secondary'/>
  </Backdrop>
  <div className='login-container'>
   <div className='image-container'>
    <img src={logo} className='welcome-logo' alt='logo'/>
   </div>
   {showlogin && (
    <div className='login-box'>
    <p className='login-text'>Login into your account</p>
    <TextField id="standard-basic" label="Enter User Name" color='secondary'
     variant="outlined" onChange={changehandler} name='name'/>
    <TextField id="outlined-password-input" onChange={changehandler}
     label="Enter Password" type='password' color='secondary' name='password'
    autoComplete='current-password'/>
    <Button variant="outlined" onClick={loginHandler}>Login</Button>
    <p style={{fontSize:'1.5vw'}}> Dont have an account ?(" ")
    <span className='hyper' onClick={()=>{setShowlogin(false)}}>SignUp</span>
    </p>
    {loginStatus?(
     <Toaster key={loginStatus.key} message={loginStatus.msg}/>
    ):null}
  </div>
   )}
   { !showlogin &&
    (<div className='login-box'>
    <p className='login-text'>Create your account</p>
    <TextField id="standard-basic" label="Enter User Name" color='secondary'
     variant="outlined" onChange={changehandler} name='name' helperText=''/>
    <TextField id="standard-basic 1" label="Enter email address" color='secondary'
     variant="outlined" onChange={changehandler} name='email'/>
    <TextField id="outlined-password-input" onChange={changehandler}
     label="Enter Password" type='password' color='secondary' name='password'
    autoComplete='current-password'/>
    <Button variant="outlined" color='secondary' onClick={signUpHandler}>Sign Up</Button>
    <p style={{fontSize:'1.5vw'}}> Already have an account?
    <span className='hyper' onClick={()=>{setShowlogin(true)}}>Log in</span>  
    </p>
    {signInStatus?(
     <Toaster key={signInStatus.key} message={signInStatus.msg}/>
    ):null}
    </div>)
   }
   </div>
  </>

   
)
}
export default Login;
