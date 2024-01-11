const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const bcrpyt=require('bcrypt');
const generateToken = require('../Config/generateToken');
const UserModel = require('../modals/userModel');

//Login
const loginController=expressAsyncHandler(async (req,res)=>{
    const {name,password}=req.body;
    const user=await UserModel.findOne({name});
    console.log(await user.matchPassword(password))
    if(user && (await user.matchPassword(password))){
        const response={
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
          }
      res.json(response)
    }else{
        throw new Error('invalid username or password')
    }
})

//registration
const registerController=expressAsyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;

    //Check for all fields
    if(!name || !email || !password){
        res.sendStatus(400);
        throw Error('All necessary input fields have not been filled');
    }

    //pre-existing user
    const userExist=await UserModel.findOne({email})
    if(userExist){
        throw new Error('user already exists')
    }

    //userName already Taken
    const userNameExist=await UserModel.findOne({name})
    if(userNameExist){
        throw new Error('userName already exists')
    }

    //create an entry in the database for the user
    const user= await UserModel.create({name,email,password})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Registration failed')
    }

})

const fetchAllUsersController=expressAsyncHandler(async(req,res)=>{
    const keyword=req.query.search
    ?{
        $or:[
          {name:{$regex:req.query.search,$options:"i"}},
          {email:{$regex:req.query.search,$options:"i"}},
        ]
    }:null

    const users=await UserModel.find(keyword).find({
        _id:{$ne:req.user._id},
    })
    res.send(users);
})
module.exports={loginController,registerController,fetchAllUsersController}