const router = require('express').Router();
const { User, Post } = require('../models');


router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (!posts) {
            return res.status(400).json({ error: 'could not retrieve posts'})
        }
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
