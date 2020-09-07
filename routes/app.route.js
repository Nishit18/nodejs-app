const express = require('express');
const useRoute = express();

useRoute.use('/account-transaction', require('./account-transaction.route'));
useRoute.use('/authentication', require('./authentication.route'));

module.exports = useRoute;
