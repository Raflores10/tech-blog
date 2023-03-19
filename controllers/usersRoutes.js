const express = require('express');
const router = express.Router()
const { Op } = require("sequelize");
const {User,Post,Comment} = require('../models')
const bcrypt = require('bcrypt');


router.get("/", (req,res)=>{
 User.findAll().then(userData=>{
    res.json(userData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})

router.get("/:id", (req,res)=>{
    User.findByPk(req.params.id,{
        include:[Post]
    }).then(userData=>{
       res.json(userData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error has occured",err})
    })
})

router.post("/", (req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
        res.json(userData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error has occured",err})
    })
})

router.post("/login", (req,res)=>{
    User.findOne({
        where:{
            [Op.or]: [{ username: req.body.login }, [{ email: req.body.login }]]
        }
    }).then(userData=>{
        if(!userData){
            res.status(401).json({msg:"check your login credentials"})
        } else {
            if(bcrypt.compareSync(req.body.password,userData.password)){
                req.session.userId = userData.id
                req.session.userEmail = userData.email
                return res.json(userData)
            } else {
                res.status(401).json({msg:"check your login credentials"})
            }
        }
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error has occured",err})
    })
})

router.delete("/:id", (req,res)=>{
    if(req.session.userId){
       User.findByPk(req.params.id).then(userData=>{
         if(!userData){
          res.status(404).json({msg:"User does not exist"})
         } else if(userData.id===req.session.userId){
          User.destroy({where: {
             id:req.params.id
          }})
          res.send("User has been deleted")
         } else {
          res.status(403).json({msg:"Action unavailable"})
         }
      }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"An error has occured",err})
      })
    } else {
       res.status(403).json({msg:"Must be logged in"})
    }
 })

module.exports = router