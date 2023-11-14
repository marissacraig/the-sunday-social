const router = require('express').Router();
const { Post, Comment, User } = require('../models');


router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Comment,
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

router.get('/getSinglePost/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'createdAt'], 
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
        console.log(post)
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
