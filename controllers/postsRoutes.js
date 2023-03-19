const express = require('express');
const router = express.Router();
const {User, Post} = require('../models');

router.get("/",(req,res) => {
    Post.findAll().then(postData => {
     res.json(postData)
    }).catch(err => {
     console.log(err);
     res.status(500).json({msg:"An error has occurred", err})
    })
 });

 router.get("/:id",(req,res) => {
    Post.findByPk(req.params.id,{
     include:[User]
    }).then(postData => {
     res.json(postData)
    }).catch(err => {
     console.log(err);
     res.status(500).json({msg:"An error has occurred", err})
    })
 })

router.post("/",(req,res)=>{
    if (!req.session.user_id){
       return res.status(403).json({msg:"Please log in to post."})
    }
    console.log(req.body);
    Post.create({
     title:req.body.title,
     content: req.body.content,
     user_id:req.session.user_id
    }).then(postData => {
     res.json(postData)
    }).catch(err => {
     console.log(err);
     res.status(500).json({msg:"An error has occurred", err})
    })
 });
 router.delete("/:id",(req,res)=>{
    if(!req.session.user_id){
       return res.status(403).json({msg:"Please login to access request."})
    }
    console.log(req.body);
    Post.findByPk(req.params.id).then(postData => {
       if (!postData){
          return res.status(404).json({msg:"Post does not exist."})
       } else if (postData.user_id !== req.session.user_id){
          return res.status(403).json({msg:"Not your pos!"})
       }
       Post.destroy({
        where:{
           id:req.params.id,
        }
       }).then(postData => {
         res.json(postData)
        }).catch(err => {
         console.log(err);
         res.status(500).json({msg:"An error has occurred.",err})
        })
    }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"An error has occurred.",err})
    })
 });

 module.exports = router;