const express = require('express');
var router = express.Router();

const userDetail = require('../controllers/user-detail.controller');

router.get('/all', userDetail.getUserDetailUsingProcedure);

module.exports = router;
