const express = require('express');
const authRouter = require('./auth')
const userRouter = require('./user');
const homeRoutes = require('./homeroutes');


const app = express();

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/home', homeRoutes)


module.exports = app;