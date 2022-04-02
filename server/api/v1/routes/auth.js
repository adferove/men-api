const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth.js');
const { register, login, getMe } = require('../controllers/auth.js');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protectRoute, getMe);

module.exports = router;
