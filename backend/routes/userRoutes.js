const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getProfile} = require('../controllers/userControllers');
const checkLogin = require('../middlewares/checkLogin');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', checkLogin, getProfile)

module.exports = router;