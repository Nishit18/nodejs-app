const { Statement } = require('sqlite3');
const { rows } = require('mssql');

const sqlite = require('sqlite3').verbose();

exports.executeQuery = function (databasePath, queryText, callback) {
    let db = new sqlite.Database(databasePath, error => {
        if (error) {
            console.log(error);
            return;
        }
        db.all(queryText, (error, data) => {
            if (error) {
                console.log(error);
                db.close();
                return;
            }
            // console.log(data);
            db.close();
            return callback(data);
        });
    });
};
