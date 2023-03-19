const express = require('express');
const router = express.Router();

const userRoutes = require('./usersRoutes')
router.use("/api/users", userRoutes)

const postRoutes = require('./postsRoutes')
router.use("/api/posts", postRoutes)

const commentRoutes = require('./commentsRoutes')
router.use("/api/comments", commentRoutes)

const frontEndRoutes = require('./frontEndRouters')
router.use("/", frontEndRoutes)

module.exports = router