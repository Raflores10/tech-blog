const express = require('express');
const router = express.Router();
const {users, posts, comments} = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res)=> {
    try {
        const allUsers = await users.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "An error has occurred!"});
    }
})

router.get("/:id", (req,res)=>{
    users.findByPk(req.params.id,{
     include:[posts]
    }).then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"An error has occurred",err})
    })
 })

module.exports = router;