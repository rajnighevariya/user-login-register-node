const express = require('express');
let router = express.Router();
let userController = require('../controller/userController');


router.post('/signin', userController.userSignin);
router.post('/login', userController.userLogin);


module.exports = router;