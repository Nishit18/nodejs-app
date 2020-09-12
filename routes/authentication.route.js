const express = require('express');
var router = express.Router();

const authentication = require('../controllers/authentication.controller');

router.post('/register', authentication.register);
router.post('/login', authentication.login);

module.exports = router;
