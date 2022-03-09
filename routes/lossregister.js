var express = require('express');
var router = express.Router();
var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

var connectionString =DBconfig.connectionString;

//#region loss register data

router.get('/getlosses', function (req, res, next) {
	
	var query = "Select * from MINT_Upstream_LossRegister";

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

router.post('/addloss', function (req, res, next) {
	
	var query = "INSERT INTO MINT_Upstream_LossRegister (LossCode,LossDescription,Action,LossDescriptionHindi,ActionHindi)" +
				" VALUES ("+ req.body.losscode +",'" + req.body.lossdesc + "','" + req.body.action + "'"+
				",N'" + req.body.lossdeschindi + "',N'" + req.body.hindi + "')";

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

router.post('/updateloss', function (req, res, next) {
	
	var query = "Update MINT_Upstream_LossRegister set LossDescription='" + req.body.lossdesc + "',Action='" + req.body.action + "',"+
				"LossDescriptionHindi=N'" + req.body.lossdeschindi + "',ActionHindi=N'" + req.body.actionhindi + "'"+
                " where  LossCode =" + req.body.losscode + "";
    
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

router.post('/deleteloss', function (req, res, next) {
	
	var query = "DELETE FROM MINT_Upstream_LossRegister where LossCode=" + req.body.losscode;
	
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