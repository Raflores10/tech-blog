const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const postRoutes = require('./postsRoutes');
const commentsRoutes = require('./commentsRoutes');


router.use('/api/users', usersRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentsRoutes);

module.exports = router;