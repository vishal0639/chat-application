const express=require('express');
const {protect}=require('../middleware/authMiddleware');
const Router=express.Router();
const { loginController, registerController,
fetchAllUsersController } = require('../Controllers/userController');


Router.post('/login',loginController);
Router.post('/register',registerController);
Router.get('/fetchUsers',protect,fetchAllUsersController);

module.exports=Router;