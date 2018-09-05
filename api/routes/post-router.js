const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const postController = require('../controllers/post-controller');

router.get('/', authCheck, postController.getAll);

router.post('/', authCheck, postController.create);

router.get('/:id', authCheck, postController.getOne);

router.put('/:id', authCheck, postController.update);

router.delete('/:id', authCheck, postController.remove);

module.exports = router;