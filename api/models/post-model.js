const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    author: String,
    authorId: {type: mongoose.Schema.Types.ObjectId, required: true},
    created: Date
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;