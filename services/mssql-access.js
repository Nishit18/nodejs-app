const sql = require('mssql');

exports.execute = function (databaseConfig, storedProcedureName, parameters, callback) {
    try {
        sql.connect(databaseConfig, function (error) {
            if (error) {
                console.log(error);
                return callback();
            }
            var request = new sql.Request();
            if (parameters != null) {
                for (i = 0; i < parameters.length; i++) {
                    request.input(parameters[i].key, parameters[i].value);
                }
            }
            request.execute(storedProcedureName, function (err, recordset) {
                if (err) {
                    console.log(err);
                    return callback();
                }

                // let resultObj = {};
                // for (i = 0; i < recordset.recordsets.length; i++) {
                //     var newNum = i == 0 ? 'table' : 'table' + String(i);
                //     var newVal = recordset.recordsets[i];
                //     resultObj[newNum] = newVal;
                // }
                // return callback(resultObj);

                callback(recordset.recordsets);
            });
        });
    }
    catch (exception) {
        console.log(exception);
        return callback();
    }
};
