var express = require('express');
var router = express.Router();
var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

var connectionString =DBconfig.connectionString;

//#region get loss data

//#region get loss Duration

router.get('/getlossDurationpareto', function (req, res, next) {
	
	// var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
	// 			" From Mint_Upstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "' and WorkcellDesc='" +  req.query.line + "')" +
	// 			" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription "+
	// 			" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
	// 			" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime";
				
	var query = "with Mint_lossfound as (select sum([speedlossinsec]) as speedlosssec,LossCode,"+
	" case when sum([speedlossinsec])!=0 then sum([speedlossinsec])/60 else 0 end as cascadespeedlossmin"+
	" from UDT_Upstream_SpeedLosscalculatedData "+
	" where starttime between '" + req.query.sDate + "' and '" +  req.query.eDate + "'"+
	" and (line in("+req.query.line+"))"+
	" group by losscode ) "+
	" select speedlosssec,cascadespeedlossmin,Mint_lossfound.LossCode ,LossDescription,Action,LossDescriptionHindi,ActionHindi from Mint_lossfound "+
	" Left JOIN Mint_Upstream_LossRegister "+
	" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode";
	
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


//#region get distinct loss data

router.get('/getdistinctline', function (req, res, next) {
	
	var query = "select distinct WorkcellDesc  FROM Mint_Upstream order by WorkcellDesc asc";
				
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