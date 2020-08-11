const express = require('express');
const useRoute = express();

useRoute.use('/user', require('./user.route'));
useRoute.use('/user-detail', require('./user-detail.route'));
useRoute.use('/account-transaction', require('./account-transaction.route'));

module.exports = useRoute;
