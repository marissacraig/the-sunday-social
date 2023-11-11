const router = require('express').Router();
const { User } = require('../models');
const { signToken } = require('../utils/auth');


router.post('/login', async (req, res) => {
    try {
        const data = req.body
        const user = await User.findOne({ 
            where: {
                email: data.email
            }
        });
        if (!user) {
            res.status(400).json({ error: 'Wrong credentials'})
        } else if (!user.checkPassword(data.password)) {
            res.status(400).json({ error: 'Wrong credentials'})
        } else {
            signToken(user, res)
            res.status(200).json(user)
        }
    } catch(e) {
        console.log('error logging in ', e)
    }
})

router.post('/logout', async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logged Out' })
})


module.exports = router;
