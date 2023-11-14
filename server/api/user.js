const router = require('express').Router();
const { verifyToken } = require('../utils/auth');
const { Post, Comment } = require('../models');

// this route is just to check if user is logged in. Used in Navigation
// and other components. no database query
// the 'verifyToken' sets the req.user to have user information
router.get('/', verifyToken, async(req, res) => {
    try {
        res.status(200).json(req.user)
    } catch(err) {
        console.log('no user with that id found', err)
    }
})


router.post('/addPost', verifyToken, async(req, res) => {
    try {
        const data = req.body;
        const newPost = await Post.create({
            postText: data.postText.trim(),
            userId: req.user.data.id,
            author: req.user.data.username
        })
        if (!newPost) {
            return res.status(400).json({ error: 'invalid input'})
        }
        res.status(200).json(newPost)
    } catch(err) {
        console.log('error adding posts', err)
    }
})

router.get('/getPosts', verifyToken, async(req, res) => {
    try {
        const posts = await Post.findAll({ 
            where: { userId: req.user.data.id},
            order: [['createdAt', 'DESC']]
        })
        if (!posts) {
            return res.status(400).json({ error: 'could not get posts' })
        } else {
            res.status(200).json(posts)
        }

    } catch(err) {
        console.log('could not get posts', err)
    }
})

router.post('/addComment', verifyToken, async(req, res) => {
    try {
        const post = await Post.findByPk(req.body.postId);
        if (!post) {
            return res.status(400).json({ error: 'post is no long available'})
        }
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            userId: req.user.data.id,
            postId: post.id
        })

        if (!newComment) {
            return res.status(400).json({ error: 'comment not added'})
        }

        res.status(200).json(newComment)
    } catch(err) {
        res.status(500).json({ error: 'comment not added'})
    }
})

module.exports = router;