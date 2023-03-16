const express = require("express");
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    include: [
      {
        model: Post,
        attributes: ["title"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((PostData) => res.json(PostData))
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
  Comment.create({
    comment_text: req.body.comment_text,
    userId: req.session.userId,
    postId: req.body.postId,
  })
    .then((PostData) => res.json(PostData))
    .catch((err) => {
      
      res.status(500).json(err);
    });
});

module.exports = router;