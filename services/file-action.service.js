const fs = require('fs');

exports.readFile = function (filePath, callback) {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        return callback(data);
    });
};
