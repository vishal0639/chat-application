import React from 'react';
import './myStyles.css';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import Welcome from './Welcome';
import CreateGroups from './CreateGroups';
import Users from './Users';
import { Outlet } from 'react-router-dom';

function MainContainer() {
 
    
return (
  <div className='main-container'>
     <Sidebar/>
     <Outlet/>
     {/*<CreateGroups/>*/}
      {/*<Welcome/>*/}
      {/*<Users_Groups/>*/}
     {/*<ChatArea props={chatheader}/>*/}
  </div>
)
}

export default MainContainer