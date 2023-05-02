const express=require("express");
const { PostModel } = require("../Models/Post.model");
const postRouter=express.Router();

postRouter.post("/create",async(req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save()
        res.status(200).send({"msg":"New post has been added"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.get("/",async(req,res)=>{
    try {
        const {device}=req.query
        let query={authorID:req.body.authorID};
        if(device){
            query.device=device
        }
        const post=await PostModel.find(query)
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.authorID!=post.authorID){
            res.status(200).send({"msg":"Not authorized for this operation"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`Post with id:${postID} has been updated`})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.authorID!=post.authorID){
            res.status(200).send({"msg":"Not authorized for this operation"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.status(200).send({"msg":`Post with id:${postID} has been deleted`})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={postRouter}