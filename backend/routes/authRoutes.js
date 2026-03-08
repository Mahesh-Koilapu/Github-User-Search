const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router(); // Express Router allows us to organize routes separately.

router.post('/register', register);
router.post('/login', login);

module.exports = router;
