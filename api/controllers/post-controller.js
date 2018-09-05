const Post = require('../models/post-model');
const User = require('../models/user-model');

async function getAll(req, res) {
    try {
        const docs = await Post.find({'authorId': req.userData.id})
        const posts = docs.map(doc => {
            return {
                id: doc.id, 
                author: doc.author.username,
                title: doc.title,
                content: doc.content,
                created: doc.created,
                updated: doc.updated
            }
        })
        res.status(200).json(posts);
    } catch(err) {
        res.json(err);
    }
};


async function create(req, res) {
    try {
        const user = await User.findById(req.userData.id)
        if (!user) return res.sendStatus(403);
        const newPost = new Post({
            author: user.username,
            authorId: user.id,
            title: req.body.title,
            content: req.body.content,
            created: Date.now()
        })
        const post = await newPost.save()
        res.status(201).json(post);    
    } catch(err) {
        res.status(500).json(err);
    }
};

async function getOne(req, res) {
    try {
        const doc = await Post.findById(req.params.id)
        if (!doc) return res.sendStatus(404);
        const post = {
            id: doc.id,
            author: doc.author,
            title: doc.title,
            content: doc.content,
            created: doc.created,
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
};

async function update(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) res.sendStatus(404);
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.updated = Date.now();
        await post.save();
        res.status(200).json({message: 'Post updated'});
    }catch(err) {
        res.sendStatus(500).json(err);
    }
}

async function remove(req, res) {
    try {    
        const succeded = await Post.findByIdAndRemove(req.params.id)
        if (succeded) {
            res.status(200).json({message: `Deleted Post ID: ${req.params.id}`});
        } else res.sendStatus(404);
    } catch (err) {
        res.sendStatus(404);
    }
};

module.exports = {getAll, getOne, create, update, remove};