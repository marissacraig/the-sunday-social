const jwt = require('jsonwebtoken');


const secret = 'jaeiowfjaeiow;mnanafhpewfjawi';
const expirtion = '7d';

module.exports = {
    signToken: function ({ email, id, username}, res) {
        const payload = { email, id, username}

        const token = jwt.sign({ data: payload }, secret, { expiresIn: expirtion});

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

    },

    // Middleware to verify the JWT token
    verifyToken: async function (req, res, next) {
        const token = await req.cookies.token; // Replace with the actual cookie name
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, secret, (err, decoded) => {
            console.log('hi')
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // Token is valid
            req.user = decoded; // You can attach user information to the request if needed
            next();
        });
    }
}
