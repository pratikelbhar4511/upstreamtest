var express = require('express');
var router = express.Router();
var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

var connectionString =DBconfig.connectionString;

router.post('/updatelossdesc', function (req, res, next) {
	
    var query = "Update Mint_Upstream set Losscode=" + req.body.lossdesc + ""+
                " where  RowInsertTime ='" + req.body.StartDate + "' and WorkcellDesc='"+ req.body.workcell+"'";
    
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

//#region lossDate
router.get('/getlossdata', function (req, res, next) {
	
	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "' and Losscode!=0" +
				" and (WorkcellDesc='Line 1' OR WorkcellDesc='Line 2' OR WorkcellDesc='Line 3' OR WorkcellDesc='Line 4'))" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription,Action "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime desc";
				
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
			else{
			// send records as a response
			sqlclient.close();
			res.send(result);
			}
		});
	});
});
//#endregion
//#endregion

module.exports = router;