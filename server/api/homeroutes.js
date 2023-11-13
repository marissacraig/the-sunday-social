const router = require('express').Router();
const { User, Post } = require('../models');


router.get('/', async(req, res) => {
    try {
         const posts = await Post.findAll({});
         res.status(200).json(posts)
    } catch(err) {
        console.log(err)
    }
})

module.exports = router;
