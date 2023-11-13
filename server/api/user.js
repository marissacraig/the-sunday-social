const router = require('express').Router();
const { verifyToken } = require('../utils/auth');
const { User, Post } = require('../models');

// this route is just to check if user is logged in. Used in Navigation
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
        })

        res.status(200).json(posts)

    } catch(err) {
        console.log('could not get posts', err)
    }
})

module.exports = router;