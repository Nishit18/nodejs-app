const sql = require('mssql');

// config for your database
const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
}

exports.getUserDetail = function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select top 11 * from UserDetail', function (err, recordset) {

            if (err) console.log(err);

            //send records as a response
            res.send(recordset.recordsets);

        });
    });

    //res.json("Test string");
}

exports.getUserDetailUsingProcedure = function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request
            .input('Id', 1)
            .input('IdOther', 3)
            .execute('GetUserDetailIdWiseTemp', function (err, recordset) {
                if (err) console.log(err);

                //send records as a response
                res.send(recordset.recordsets);
            });
    });

    //res.json("Test string");
}

