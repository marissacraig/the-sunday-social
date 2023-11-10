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
        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: data.password
        })
        if (newUser) {
            // create JWT and save it to HTTP cookie
            signToken(newUser, res)
            // return res.status(200).json({ message: 'User Created'})
            return res.status(200).json(newUser)
        }

        // return res.status(200).json({ message: 'User Created'})
        return res.status(400).json({ data })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;