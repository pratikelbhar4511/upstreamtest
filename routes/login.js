var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

var connectionString =DBconfig.connectionString;

router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../', 'public', 'SpeedLossDashboard.html'));
});

//#region login

router.get('/login', function (req, res, next) {
	
	var query = "Select * from MINT_Upstream_Users where Password ='" + req.query.pass + "' and Email='"+req.query.emailId+"'";

	// connect to your database
    sqlclient.connect(connectionString, function (connectionerr) {
	
		if (connectionerr) 
		{
			console.log('error connecting:' + connectionerr.stack);
			res.send("DB_ERROR");
		}
        // create Request object
        var sqlrequest = new sqlclient.Request();
           
        // query to the database and get the records
        sqlrequest.query(query, function (err, result) {
            if (err) {
				console.log(err)
			}
			// send records as a response
			sqlclient.close();
			res.send(result);
            
		});
	});
});

//#endregion

router.post('/updatePassword', function (req, res, next) {

	var query = "Update MINT_Upstream_Users set Password='" + req.query.pass + "' where Email='" + req.query.emailId + "'";

	// connect to your database
	sqlclient.connect(connectionString, function (connectionerr) {

		if (connectionerr) {
			console.log('error connecting: ' + connectionerr.stack);
			res.send("DB_ERROR");
		}
		// create Request object
		var sqlrequest = new sqlclient.Request();

		// query to the database and get the records
		sqlrequest.query(query, function (err, result) {
			if (err) {
				console.log(err)
			}
			// send records as a response
			sqlclient.close();
			res.send(result);

		});
	});

});

router.get('/logout', function (req, res) {
	res.send("Logout");

	// req.session.destroy(function (err) {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	else {
	// 		res.send("Logout");

	// 	}
	// });

});

module.exports = router;
