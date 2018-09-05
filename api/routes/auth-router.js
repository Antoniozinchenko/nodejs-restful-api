const express = require('express');
const authController = require('../controllers/auth-controller');
const router = new express.Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

module.exports = router;