const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./api/routes/auth-router');
const postRouter = require('./api/routes/post-router');

mongoose.connect(`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ds241012.mlab.com:41012/mongo-test`, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to mongodb');
})
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/api/posts', postRouter);

module.exports = app;