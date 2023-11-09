const jwt = require('jsonwebtoken');


const secret = 'jaeiowfjaeiow;mnanafhpewfjawi';
const expirtion = '7d';

module.exports = {
    signToken: function (res, { email, password, username}) {
        const payload = { email, password, username}

        const token = jwt.sign({ data: payload }, secret, { expiresIn: expirtion});

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

    }
}
