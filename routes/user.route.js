const express = require('express');
var router = express.Router();

const book = require('../controllers/user.controller');

router.get('/get-user', book.getUserList);

module.exports = router;
