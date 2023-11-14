const express = require('express');
const authRouter = require('./auth')
const userRouter = require('./user');
const posts = require('./posts');


const app = express();

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/posts', posts)


module.exports = app;