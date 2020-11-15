const crypto = require('crypto');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const config = require('../configurations/environment.configuration');
const mssqlAccess = require('../services/mssql-access');
const jsonDatabase = require('../services/json-database.service');
const sp = require('../models/stored-procedure.model');

const topSecretKeyForJwt = config.jwtTokenKey;
const sqlConfiguration = config.sqlConfiguration;

exports.register = (req, res, next) => {
    const ramdomSalt = crypto.randomBytes(64);
    const password = crypto.createHmac('sha512', ramdomSalt);
    password.update(req.body.password);
    const passwordHash = password.digest();

    const sqlParameters = [
        { key: 'FirstName', value: req.body.firstName },
        { key: 'LastName', value: req.body.lastName },
        { key: 'Email', value: req.body.email },
        { key: 'PasswordSalt', value: ramdomSalt },
        { key: 'PasswordHash', value: passwordHash },
        { key: 'Action', value: 'insert' },
    ];

    mssqlAccess.execute(sqlConfiguration, sp.Security_User_Detail_CRUD, sqlParameters, response => {
        if (response != null) {
            jsonDatabase.convert(response, (resultJson) => {
                res.status(200).json(resultJson);
            })
        }
        else {
            res.status(200).json({ "error": "Error occur please try again" });
        }
    });
}

exports.login = (req, res, next) => {
    const sqlParameters = [
        { key: 'Email', value: req.body.email },
        { key: 'Action', value: 'getbyid' }
    ];

    mssqlAccess.execute(sqlConfiguration, sp.Security_User_Detail_CRUD, sqlParameters, response => {
        if (response != null && response[0].length > 0) {
            const passwordSalt = response[0][0].PasswordSalt;
            const password = crypto.createHmac('sha512', passwordSalt);
            password.update(req.body.password);
            const passwordHash = password.digest();

            let isValidate = false;
            for (i = 0; i < passwordHash.length; i++) {
                if (passwordHash[i] != response[0][0].PasswordHash[i]) {
                    res.status(200).json({
                        "error": "Authentication failed! Email or password is invalid!"
                    });
                    return;
                }
            }

            const payload = {
                firstName: response[0][0].FirstName,
                lastName: response[0][0].LastName,
                email: response[0][0].Email
            }

            const token = jwt.sign(payload,
                topSecretKeyForJwt,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                'token': token
            });
        }
        else {
            res.status(200).json({ "error": "Error occur please try again" });
        }
    });
}

// exports.getUserApi = function (req, response) {
//     var options = {
//         host: 'localhost',
//         port: 3000,
//         path: '/WebApiCore/api/test/get',
//         method: 'GET'
//     };

//     http.request(options, function (res) {
//         console.log('STATUS: ' + res.statusCode);
//         console.log('HEADERS: ' + JSON.stringify(res.headers));
//         res.setEncoding('uft8');
//         res.on('data', function (chunk) {
//             console.log('BODY: ' + chunk);
//             response.json(JSON.parse(chunk));
//         })
//     }).end();
// }

// exports.getUserList = function (req, res) {
//     res.json("Test string");
// }

// exports.getUserDetail = function (req, res) {
//     // connect to your database
//     sql.connect(sqlConfiguration, function (err) {

//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query('select top 11 * from Test', function (err, recordset) {

//             if (err) console.log(err);

//             //send records as a response
//             res.send(recordset.recordsets);

//         });
//     });

//     //res.json("Test string");
// }