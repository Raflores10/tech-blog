const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const postRoutes = require('./postsRoutes');
const commentsRoutes = require('./commentsRoutes');


router.use('/users', usersRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentsRoutes);


module.exports = router;