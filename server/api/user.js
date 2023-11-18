const router = require('express').Router();
const { verifyToken } = require('../utils/auth');
const { Op } = require('sequelize');
const { Post, Comment, Likes, User, Friendship, FriendRequest } = require('../models');

// this route is just to check if user is logged in. Used in Navigation
// and other components. no database query
// the 'verifyToken' sets the req.user to have user information
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.data.id, {
            attributes: ['profilePic', 'username', 'id']
        });

        if (!user) {
            res.status(400).json({ error: 'you must log in' })
        }

        res.status(200).json(user)
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
                },
            ]
        });
        if (!user) {
            return res.status(400).json({ error: 'no user found' })
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
    } catch (err) {
        console.log('could not delete post ', err)
    }
})

router.put('/updateUserInfo', verifyToken, async (req, res) => {
    try {

        const data = req.body;
        const updateUser = await User.findByPk(req.user.data.id);
        if (!updateUser) {
            return res.status(400).json({ error: 'no user found' })
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
    } catch (err) {
        console.log(err)
    }
})

router.put('/updateProfilePic', verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByPk(req.user.data.id);

        if (!updatedUser) {
            return res.status(400).json({ error: 'image not loaded' })
        }
        updatedUser.profilePic = req.body.profilePicURL
        await updatedUser.save();
        res.status(200).json(updatedUser)

    } catch (err) {
        console.log(err)
    }
})

router.get('/searchNewFriends/:searchBy', verifyToken, async (req, res) => {
    try {
        // first find all friends of current user
        const userFriends = await User.findByPk(req.user.data.id, {
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'friends',
                    through: Friendship,
                    attributes: ['id', 'username'],
                }
            ],
            plain: true
        })
        // retrieve all the ids from current friends to filter search 
        // to only show users that have not been befriended
        const friendIds = userFriends.dataValues.friends.map((friend) => friend.id);

        const foundUsers = await User.findAll({
            attributes: ['id', 'profilePic', 'username'],
            where: {
                [Op.and]: [
                    // this filters through everything
                    {
                        [Op.or]: {
                            username: { [Op.like]: `%${req.params.searchBy}%` },
                            email: { [Op.like]: `%${req.params.searchBy}%` },
                            relationshipStatus: { [Op.like]: `%${req.params.searchBy}%` },
                            school: { [Op.like]: `%${req.params.searchBy}%` },
                            work: { [Op.like]: `%${req.params.searchBy}%` },
                            currentlyLearning: { [Op.like]: `%${req.params.searchBy}%` },
                            petPeeve: { [Op.like]: `%${req.params.searchBy}%` },
                            hobbies: { [Op.like]: `%${req.params.searchBy}%` }
                        },
                    },
                    // this does not allow the self-user to show up
                    {
                        id: { [Op.not]: req.user.data.id }
                    },
                    // don't show users that are already friends with this user
                    {
                        id: { [Op.notIn]: [...friendIds] }
                    }
                ]
            },
        })

        res.status(200).json(foundUsers)
    } catch (err) {
        console.log(err)
    }
})


router.post('/addFriend', verifyToken, async (req, res) => {
    try {
        const newFriendShip = await Friendship.create({
            user_id: req.user.data.id,
            friend_id: req.body.friendId
        })
        if (!newFriendShip) {
            return res.status(400).json({ error: 'friendship not made' })
        }

        await FriendRequest.destroy({ where: { id: req.body.requestId}})

        res.status(200).json(newFriendShip)
    } catch (err) {
        res.status(500).json({ error: 'internal server error', err })
    }
});

router.post('/sendFriendRequest', verifyToken, async (req, res) => {
    try {
        const newFriendShip = await FriendRequest.create({
            requesterId: req.user.data.id,
            requesteeId: req.body.friendId
        })
        if (!newFriendShip) {
            return res.status(400).json({ error: 'friendship not made' })
        }
        res.status(200).json(newFriendShip)
    } catch (err) {
        res.status(500).json({ error: 'internal server error', err })
    }
})

router.get('/getUserFriends/:searchBy?', verifyToken, async (req, res) => {
    try {
        // search by optional parameter if it's there, Else:
        if (req.params.searchBy) {
            const user = await User.findByPk(req.user.data.id, {
                attributes: ['id', 'username'],
                include: [
                    {
                        model: User,
                        as: 'friends',
                        through: Friendship,
                        attributes: ['id', 'username', 'profilePic'],
                        where: {
                            [Op.or]: {
                                username: { [Op.like]: `%${req.params.searchBy}%` },
                                email: { [Op.like]: `%${req.params.searchBy}%` },
                                relationshipStatus: { [Op.like]: `%${req.params.searchBy}%` },
                                school: { [Op.like]: `%${req.params.searchBy}%` },
                                work: { [Op.like]: `%${req.params.searchBy}%` },
                                currentlyLearning: { [Op.like]: `%${req.params.searchBy}%` },
                                petPeeve: { [Op.like]: `%${req.params.searchBy}%` },
                                hobbies: { [Op.like]: `%${req.params.searchBy}%` }
                            }
                        },
                    }
                ]
            });
            if (!user) {
                return res.status(400).json({ error: 'no user found' })
            }
            res.status(200).json(user)
            // Else get all friends
        } else {
            const user = await User.findByPk(req.user.data.id, {
                attributes: ['id', 'username'],
                include: [
                    {
                        model: User,
                        as: 'friends',
                        through: Friendship,
                        attributes: ['id', 'username', 'profilePic'],
                    }
                ]
            });
            if (!user) {
                return res.status(400).json({ error: 'no user found' })
            }
            res.status(200).json(user)

        }
    } catch (err) {
        console.log('no user with that id found', err)
    }
})

router.get('/getIncomingFriendRequests', verifyToken, async(req, res) => {
    try {
        const incomingRequests = await User.findByPk(req.user.data.id, {
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'Requesters',
                    though: FriendRequest,
                    attributes: ['id', 'username', 'profilePic', 'createdAt']
                }
            ]
        })

        if (!incomingRequests) {
            return res.status(400).json({ error: 'could not get incoming friend requests' })
        }

        res.status(200).json(incomingRequests)

    } catch(err) {
        console.log('error getting friend request ', err)
    }
});
router.get('/getOutgoingFriendRequests', verifyToken, async(req, res) => {
    try {
        const outgoingRequests = await User.findByPk(req.user.data.id, {
            attributes: ['id'],
            include: [
                {
                    model: User,
                    as: 'Requestees',
                    through: FriendRequest,
                    attributes: ['id', 'username', 'profilePic', 'createdAt']
                }
            ]
        })

        if (!outgoingRequests) {
            return res.status(400).json({ error: 'could not get outgoing friend requests'})
        }
        res.status(200).json(outgoingRequests)

    } catch(err) {
        console.log('error getting friend request ', err)
    }
});

module.exports = router;