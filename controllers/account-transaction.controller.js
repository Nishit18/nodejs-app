const fileAction = require('../services/file-action.service');
const path = require('path');
const sqlAccess = require('../services/sqlite-access');

exports.insert = function (req, res) {
    var sqlPath = path.join(__dirname, '..', 'assets', 'sqlite-query', 'InsertAccountTransaction.sql');
    fileAction.readFile(sqlPath, response => {
        sqlAccess.executeQuery('', response, (data) => {
            res.json(data);
        });
    });
    // res.json("Test string");
};
