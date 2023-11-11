const router = require('express').Router();
const { signToken, verifyToken } = require('../utils/auth');
const { User } = require('../models/User');


router.get('/', verifyToken, async(req, res) => {
    try {
        // const userData = await User.findByPk(res.cookie.token.id)
        // res.json(userData)
        res.json(req.user)
    } catch(err) {
        console.log('no user with that id found', err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        // check if username or email is already taken
        const isEmailTaken = await User.findOne({ where: { email: data.email}})
        const isUsernameTaken = await User.findOne({ where: { username: data.username}})

        if (isEmailTaken || isUsernameTaken) {
            return res.status(400).json({ error: 'Email or Username taken' })
        }

        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: data.password
        })
        if (!newUser) {
            return res.status(400).json({ error: 'invalid inputs' })
        } else {
            // create JWT and save it to HTTP cookie
            signToken(newUser, res)
            return res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(400).json({ err })
    }
})

module.exports = router;