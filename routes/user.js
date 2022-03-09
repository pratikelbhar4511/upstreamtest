var express = require('express');
var router = express.Router();
var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

// {
// 	"connectionString" :
// {
//    "server": "192.168.2.80", 
//    "database": "MintFDI_Upstreams",
//    "user": "sa",
//    "password": "1234",
//    "port": 1433,
//    "options": {
// 	   "encrypt": false
//    }
// }
// }

var connectionString =DBconfig.connectionString;

//#region user data


router.get('/getsiteusers', function (req, res, next) {
	
	var query = "Select * from MINT_Upstream_Users";

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

router.post('/createuser', function (req, res, next) {
	
	var query = "INSERT INTO MINT_Upstream_Users (Password,FName,LName,Email,ContactNo,Role)" +//StatusFlag,EmailFlag,SMSFlag
                " VALUES ('"+ req.body.password +"','" + req.body.fname + "','"+ req.body.lName +"','"+ req.body.email +"',"+ req.body.phone +",'"+ req.body.role +"')";

	// connect to your database
    sqlclient.connect(connectionString, function (connectionerr) {
	
		if (connectionerr) 
		{
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

router.post('/updateUser', function (req, res, next) {

	userid=req.body.userid;
	fname= req.body.fname;
	lname= req.body.lname;
	email= req.body.email;
	role= req.body.role;
	phone= req.body.phone;
	password= req.body.password;

    var query = "Update MINT_Upstream_Users set Password='"+ password +"',FName='"+fname+"',LName='"+lname+"',Email='"+email+"',ContactNo='"+phone+"',Role='"+role+"'"+
                " where  UserId =" + userid +"";
    
	// connect to your database
    sqlclient.connect(connectionString, function (connectionerr) {
	
		if (connectionerr) 
		{
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

router.post('/deleteUser', function (req, res, next) {
	
	var query = "DELETE FROM MINT_Upstream_Users where UserId ="+req.body.userid+"";
	
	// connect to your database
    sqlclient.connect(connectionString, function (connectionerr) {
	
		if (connectionerr) 
		{
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
//#endregion

module.exports = router;