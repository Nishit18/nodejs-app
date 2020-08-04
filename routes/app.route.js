const express = require('express');
const useRoute = express();

useRoute.use('/user', require('./user.route'));
useRoute.use('/user-detail', require('./user-detail.route'));

module.exports = useRoute;
