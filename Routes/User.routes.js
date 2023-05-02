const express=require("express");
const { UserModel } = require("../Models/User.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,gender}=req.body
    console.log(email,pass)
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            const user=new UserModel({email,name,gender,pass:hash});
            await user.save()
            res.status(200).send({"msg":"Added new user"})
        });
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,pass}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                if(result){
                 token = jwt.sign({ authorID:user._id }, 'masai');
                 res.status(200).send({"msg":"Login Successfull","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong Credentials!!"})
                }
            });
        }else{
            res.status(200).send({"msg":"Wrong Credentials!!!!"})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={userRouter}