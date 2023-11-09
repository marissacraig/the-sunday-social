const router = require('express').Router();
const { signToken } = require('../utils/auth')


router.post('/login', async (req, res) => {
    try {
        const data = req.body
        signToken(res, data)
        res.status(200).json({message:'logged in'})
    } catch(e) {
        console.log('error logging in ', e)
    }
})


module.exports = router;
