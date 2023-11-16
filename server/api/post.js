const router = require('express').Router();
const { Post, Comment, User, Likes } = require('../models');

// this is for the homeroutes to get the ids
router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            attributes: ['id'],
            include: [
                {
                    model: Comment,
                    attributes: ['id'], // Include only the comment id for counting
                },
                {
                    model: Likes,
                    attributes: ['id'], // Include only the comment id for counting
                },
            ],
        });
        if (!posts) {
            return res.status(400).json({ error: 'could not retrieve posts' })
        }
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
    }
})

// this is for the posts on the homepage to render their posts
router.get('/getSinglePost/:id', async (req, res) => {
    try {
        const posts = await Post.findByPk( req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id'], // Include only the comment id for counting
                },
                {
                    model: Likes,
                    attributes: ['id'], // Include only the comment id for counting
                },
                {
                    model: User,
                    attributes: ['profilePic']
                }
            ],
        });
        if (!posts) {
            return res.status(400).json({ error: 'could not retrieve posts' })
        }
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
    }
})


// This is to get a single view of a post
router.get('/getSingleViewPost/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'createdAt'], 
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
            ],
        });
        if (!post) {
            return res.status(400).json({ error: 'could not retrieve post' })
        }
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
