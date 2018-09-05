var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

async function signUp(req, res) {
    if (!req.body.email || !req.body.password) return res.status(422).json({message: 'email and password are required'});
    try {
        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(422).json({message: 'User with this email is already exist'});
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        const response = await user.save()
        res.status(201).json({message: 'user created', response});
    } catch(err) {
        errorCatch(err, res)
    }  
};

async function signIn(req, res) {
    if (!req.body.email || !req.body.password) return res.status(422).json({message: 'email and password are required'});
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).json({message: 'User with this email not found'});
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            jwt.sign({email: user.email, id: user.id}, process.env.JWT_KEY, { expiresIn: '2d' }, (err, token) => {
                if (err) return res.sendStatus(500);
                res.status(200).json({message: 'user signed in', user: {
                    email: user.email, username: user.username, id: user.id, token
                }});
            });
        } else {
            res.status(401).json({message: 'Not Authorized', error: err})
        }
    } catch(err) {
        res.status(401).json({message: 'Not Authorized', error: err});
    }
}

function errorCatch(error, res) {
    console.log(error);
    res.status(500).json(error);
}

module.exports = {signUp, signIn};