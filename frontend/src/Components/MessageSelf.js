import React from 'react'
import { useSelector } from 'react-redux';

function MessageSelf() {
  var props2={name:'You',message:'This is a sample message from me'}
  let lightTheme=useSelector((state)=>state.themeKey);
  //className={`ug-header ${lightTheme?'':'dark'}`}

  return (
    <div className={`self-message-container ${lightTheme?'':'dark'}`} >
       <div className={`messageBox ${lightTheme?'':'dark'}`}>
          <p>{props2.message}</p>
          <p className={`self-timeStamp ${lightTheme?'':'dark'}`}>12:20am</p>
       </div>
    </div>
  )
}

export default MessageSelf