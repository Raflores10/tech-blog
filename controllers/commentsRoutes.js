const express = require("express");
const router = require("express").Router();
const { Users, Posts, Comments } = require("../models");

router.get("/", (req, res) => {
  Comments.findAll({
    include: [
      {
        model: Posts,
        attributes: ["title"],
      },
      {
        model: Users,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.session.userId) {
    res
      .status(400)
      .json({ message: "You must be logged in to create a post." });
    return;
  }
  Comments.create({
    comment_text: req.body.comment_text,
    userId: req.session.userId,
    postId: req.body.postId,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      
      res.status(500).json(err);
    });
});

module.exports = router;