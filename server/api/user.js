const router = require('express').Router();
const { verifyToken } = require('../utils/auth');
const { Post, Comment, Likes, User } = require('../models');

// this route is just to check if user is logged in. Used in Navigation
// and other components. no database query
// the 'verifyToken' sets the req.user to have user information
router.get('/', verifyToken, async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        console.log('no user with that id found', err)
    }
})

router.get('/getUserInfo', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.data.id, {
            include: [
                {
                    model: Post,
                    order: [['createdAt', 'DESC']]
                }
            ]
        });
        if (!user) {
            return res.status(400).json({ error: 'no user found'})
        }
        res.status(200).json(user)
    } catch (err) {
        console.log('no user with that id found', err)
    }
})



router.post('/addPost', verifyToken, async (req, res) => {
    try {
        const data = req.body;
        const newPost = await Post.create({
            postText: data.postText.trim(),
            userId: req.user.data.id,
            author: req.user.data.username
        })
        if (!newPost) {
            return res.status(400).json({ error: 'invalid input' })
        }
        res.status(200).json(newPost)
    } catch (err) {
        console.log('error adding posts', err)
    }
})

router.post('/addComment', verifyToken, async (req, res) => {
    try {
        const post = await Post.findByPk(req.body.postId);
        if (!post) {
            return res.status(400).json({ error: 'post is no long available' })
        }
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            userId: req.user.data.id,
            postId: post.id
        })

        if (!newComment) {
            return res.status(400).json({ error: 'comment not added' })
        }

        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json({ error: 'comment not added' })
    }
})

router.post('/addLike', verifyToken, async (req, res) => {
    try {
        const post = await Post.findByPk(req.body.postId, {
            include: [
                {
                    model: Likes,
                    attributes: ['id'],
                }
            ]
        });
        if (!post) {
            return res.status(400).json({ error: 'post is no long available' })
        }
        const hasUserAlreadyLiked = await Likes.findOne({
            where: {
                postId: req.body.postId,
                userId: req.user.data.id
            }
        })

        if (hasUserAlreadyLiked) {
            return res.status(400).json({ error: 'You can only like a post once' })
        }

        const newLike = await Likes.create({
            userId: req.user.data.id,
            postId: req.body.postId
        })

        if (!newLike) {
            return res.status(400).json({ error: 'comment not added' })
        }

        res.status(200).json(newLike)
    } catch (err) {
        res.status(500).json({ error: 'comment not added' })
    }
})

router.put('/updatePost', verifyToken, async (req, res) => {
    try {
        const newText = req.body.updatedPostText;
        const postId = req.body.postId;

        const updatedPost = await Post.findByPk(postId)

        if (!updatedPost) {
            res.status(400).json({ error: 'Post not available to update' })
        }
        updatedPost.postText = newText;
        await updatedPost.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log('error updating post ', err)
    }
})

router.delete('/deletePost', verifyToken, async (req, res) => {
    try {
        const deletedPost = await Post.findByPk(req.body.postId);
        if (!deletedPost) {
            console.log('Post was not able to delete')
        }
        await deletedPost.destroy();
        res.status(200).json(deletedPost)
    } catch(err) {
        console.log('could not delete post ', err)
    }
})

router.put('/updateUserInfo', verifyToken, async(req,res) => {
    try{    

        const data = req.body;
        const updateUser = await User.findByPk(req.user.data.id);
        if (!updateUser) {
            return res.status(400).json({ error: 'no user found'})
        }
        updateUser.relationshipStatus = data.relationshipStatus;
        updateUser.school = data.school;
        updateUser.work = data.work;
        updateUser.currentlyLearning = data.currentlyLearning;
        updateUser.headline = data.headline;
        updateUser.petPeeve = data.petPeeve;
        updateUser.website = data.website;
        updateUser.hobbies = data.hobbies;

        await updateUser.save();

        res.status(200).json(updateUser)
    } catch(err) {
        console.log(err)
    }
})

router.put('/updateProfilePic', verifyToken, async(req, res) => {
    try {   
        console.log('hitting route ', req.body)
        const updatedUser = await User.findByPk(req.user.data.id);

        if(!updatedUser) {
            return res.status(400).json({ error: 'image not loaded'})
        }
        updatedUser.profilePic = req.body.profilePicURL
        await updatedUser.save();
        res.status(200).json(updatedUser)

    } catch(err) {
        console.log(err)
    }
})


module.exports = router;