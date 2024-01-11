import React from 'react';
import { useSelector } from 'react-redux';

function MessageOthers() {
  var props1={name:'Random user',message:'this is sample message'};
  let lightTheme=useSelector((state)=>state.themeKey);
  //className={`ug-header ${lightTheme?'':'dark'}`}
  return (
    <div className={`others-message-container ${lightTheme?'':'dark'}`}>
     <div className={`conversation-container ${lightTheme?'':'dark'}`}>
     <p className={`con-icon ${lightTheme?'':'dark'}`}>{props1.name[0]}</p>
      <div className={`others-text-content ${lightTheme?'':'dark'}`}> 
      <p className={`con-title ${lightTheme?'':'dark'}`}>{props1.name}</p> 
      <p className={`con-lastMessage ${lightTheme?'':'dark'}`}>{props1.message}</p> 
      <p className={`con-timeStamp ${lightTheme?'':'dark'}`}>12:20am</p>
      </div> 
      </div>
    </div>
  )
}

export default MessageOthers