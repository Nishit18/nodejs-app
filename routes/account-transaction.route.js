const express = require('express');
var router = express.Router();

const account = require('../controllers/account-transaction.controller');

router.get('/insert', account.insert);

module.exports = router;
