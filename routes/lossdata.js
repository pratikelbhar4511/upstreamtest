var express = require('express');
var router = express.Router();
//var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");
//var Connection = require('tedious').Connection;

var connectionString =DBconfig.connectionString;

//#region get loss data

router.get('/getlossesdatabasedonSetSpeed', function (req, res, next) {

	console.log("getlossesdatabasedonSetSpeed Log Data-->  ");
	console.log("req.query.sDate-->  " + req.query.sDate);
	console.log("req.query.eDate-->  " + req.query.eDate);

	if(req.query.shift=="Previous")
	{
	var query = "with Mint_lossfound as (select sum([speedlossinsec]) as speedlosssec,LossCode,"+
				" case when sum([speedlossinsec])!=0 then sum([speedlossinsec])/60 else 0 end as cascadespeedlossmin"+
				" from UDT_Upstream_SpeedLosscalculatedData "+
				" where starttime between '" + req.query.sDate + "' and '" +  req.query.eDate + "'"+
				" and (line='Line 1' OR line='Line 2' OR line='Line 3' OR line='Line 4')"+
				" group by losscode )"+
				" select speedlosssec,cascadespeedlossmin,Mint_lossfound.LossCode ,LossDescription,Action,LossDescriptionHindi,ActionHindi from Mint_lossfound "+
				" Left JOIN Mint_Upstream_LossRegister "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode"+
				" order by speedlosssec desc";
	}
	else {
		var query = "with Mint_lossfound as (select sum([speedlossinsec]) as speedlosssec,LossCode,"+
		" case when sum([speedlossinsec])!=0 then sum([speedlossinsec])/60 else 0 end as cascadespeedlossmin"+
		" from UDT_Upstream_SpeedLosscalculatedData "+
		" where starttime between '" + req.query.sDate + "' and '" +  req.query.eDate + "'"+
		" and (line='Line 1' OR line='Line 2' OR line='Line 3' OR line='Line 4')"+
		" group by losscode )"+
		" select speedlosssec,cascadespeedlossmin,Mint_lossfound.LossCode ,LossDescription,Action,LossDescriptionHindi,ActionHindi from Mint_lossfound "+
		" Left JOIN Mint_Upstream_LossRegister "+
		" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode";
		//" order by speedlosssec desc";
	}
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

router.get('/getlossesdata', function (req, res, next) {

	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "'"+
				" and (WorkcellDesc='Line 1' OR WorkcellDesc='Line 2' OR WorkcellDesc='Line 3' OR WorkcellDesc='Line 4'))" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription,Action "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime";
		
	// var query="Select RowInsertTime,WorkcellDesc,Losscode,LossDescription,Action  From Mint_vUpstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "' order by RowInsertTime desc";
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
	

	// new sqlclient.ConnectionPool(connectionString).connect().then(pool => {
	// 	return pool.request().query(query)
	// }).then(result => {
	// 	let rows = result.recordset
	// 	//res.setHeader('Access-Control-Allow-Origin', '*')
	// 	//res.status(200).json(result);

	// 	res.send(result);

	// 	sqlclient.close();
	// }).catch(err => {
	// 	res.status(500).send({ message: "${err}" })
	// 	sqlclient.close();
	// });

});

router.get('/getlast8hrslossesdata', function (req, res, next) {

	console.log("getlast8hrslossesdata Log Data-->  ");
	console.log("req.query.eDate-->  " + req.query.eDate);

	// with Mint_lossfound as (Select * 
	// 	From UDT_Upstream_SpeedLosscalculatedData where starttime  between  dateadd(hour, -8, cast('2021-01-30 18:25:00' as datetime2)) and cast('2021-01-30 18:25:00' as datetime2))
	// 	Select Mint_lossfound.losscode,starttime as lossstarttime,endtime as lossendtime,speedlossinsec as lossduration, line as WorkcellDesc,LossDescription as lossdesc,LossDescriptionHindi,ActionHindi 
	// 	From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  
	// 	ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by starttime;
		
				// var query = "with Mint_lossfound as (Select * "+
				// " From UDT_Upstream_SpeedLosscalculatedData where starttime between dateadd(hour, -8, '" +  req.query.eDate + "') and '" +  req.query.eDate + "')" +
				// " Select Mint_lossfound.losscode,starttime as lossstarttime,endtime as lossendtime,speedlossinsec as lossduration, line as WorkcellDesc,LossDescription as lossdesc,LossDescriptionHindi,ActionHindi "+
				// " From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				// " ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by starttime";

				var query = "with Mint_lossfound as (Select * "+
				" From UDT_Upstream_SpeedLosscalculatedData where starttime between dateadd(hour, -8, cast('" +  req.query.eDate + "' as datetime2)) and cast('" +  req.query.eDate + "' as datetime2)"+
				" and (line='Line 1' OR line='Line 2' OR line='Line 3' OR line='Line 4'))" +
				" Select Mint_lossfound.losscode,starttime as lossstarttime,endtime as lossendtime,speedlossinsec as lossduration, line as WorkcellDesc,LossDescription as lossdesc,LossDescriptionHindi,ActionHindi "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by starttime";

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

router.get('/getPreviousLossdata', function (req, res, next) {

	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream where RowInsertTime between '" + req.query.sDate1 + "' and '" +  req.query.eDate1 + "'" +
				" and (WorkcellDesc='Line 1' OR WorkcellDesc='Line 2' OR WorkcellDesc='Line 3' OR WorkcellDesc='Line 4'))" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription,Action "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime";
		
	// var query="Select RowInsertTime,WorkcellDesc,Losscode,LossDescription,Action From Mint_vUpstream where RowInsertTime between '" + req.query.sDate1 + "' and '" +  req.query.eDate1 + "'";
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

router.get('/getCurrentLossdata', function (req, res, next) {

	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "'" +
				" and (WorkcellDesc='Line 1' OR WorkcellDesc='Line 2' OR WorkcellDesc='Line 3' OR WorkcellDesc='Line 4'))" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription,Action "+
				" From Mint_lossfound JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode "+
				"and Mint_lossfound.[Losscode] !=0 order by RowInsertTime desc";
		
				
	// var query="Select RowInsertTime,WorkcellDesc,Losscode,LossDescription,Action From Mint_vUpstream where RowInsertTime between '" + req.query.sDate1 + "' and '" +  req.query.eDate1 + "'";
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

//#region get loss Duration

router.get('/getlossDuration', function (req, res, next) {
	
	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "')" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime";
				
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
//speed upstrem table for 5 min data
router.get('/getlossesdataSpeed', function (req, res, next) {

	var query = "with Mint_lossfound as (Select RowInsertTime,WorkcellDesc,Losscode "+
				" From Mint_Upstream_Speed where RowInsertTime between '" + req.query.sDate + "' and '" +  req.query.eDate + "')" +
				" Select RowInsertTime,WorkcellDesc,Mint_lossfound.Losscode ,LossDescription,Action "+
				" From Mint_lossfound Left JOIN Mint_Upstream_LossRegister  "+
				" ON Mint_lossfound.Losscode=Mint_Upstream_LossRegister.LossCode order by RowInsertTime";

				
	
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
//getActualSpeed
router.get('/getActualSpeed', function (req, res, next) {
	
	var query="select * FROM Mint_Speed_Upstream "+
	" where Rowinsertime between '" + req.query.sDate + "' and '" +  req.query.eDate + "' "+ 
	" order by Rowid asc";	
	
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
//#region get distinct loss data

router.get('/getdistinctloss', function (req, res, next) {
	
	var query = "select distinct LossCode,LossDescription  FROM Mint_Upstream_LossRegister order by LossCode asc";
				
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


//sppv 

router.get('/getDistNames', function (req, res, next) {

	var query = "  select distinct Name,Name_Index from UDT_UpstreamLive order by Name_Index asc";

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

router.get('/getSPPVdata', function (req, res, next) {

	var query = "Select TOP 1 *  From UDT_UpstreamLive where Rowinsertime between '" + req.query.Sdate + "' and '" +  req.query.enddate + "' and Name='"+req.query.name+"'" +
				"  order by Rowinsertime desc";
		
				
	// var query="Select RowInsertTime,WorkcellDesc,Losscode,LossDescription,Action From Mint_vUpstream where RowInsertTime between '" + req.query.sDate1 + "' and '" +  req.query.eDate1 + "'";
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
//

router.get('/speedlossstatus', function (req, res, next) {
	
	var query = "select * FROM [Mint_Upstream_Speed] where [RowInsertTime] between '"+req.query.Sdate+"' and '"+req.query.Edate+"' and Losscode!=0 order by [RowInsertTime] desc";
			
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

router.get('/lineSpeedStatus', function (req, res, next) {
	
	console.log("lineSpeedStatus Log Data-->  ");
	console.log("req.query.sDate-->  " + req.query.sDate);
	console.log("req.query.eDate-->  " + req.query.eDate);

	//var query = "select * FROM UDT_Upstreamdata where rowinsertime between '"+req.query.sDate+"' and '"+req.query.eDate+"' order by rowinsertime";
	var query = "select * FROM UDT_Upstream_SpeedLosscalculatedData where starttime between '"+req.query.sDate+"' and '"+req.query.eDate+"' order by starttime";
	
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

router.get('/getCas2OEE', function (req, res, next) {

	console.log("getCas2OEE Log Data-->  ");
	console.log("req.query.sDate-->  " + req.query.Sdate);
	console.log("req.query.eDate-->  " + req.query.Edate);

	var query = "select sum(OEE)/4 as Cas2OEE from UDTM_CurrentData where "+
	"(LineName='Line 1' OR LineName='Line 2' OR LineName='Line 3' OR LineName='Line 4')"+
	" AND RowInsertTime between '"+req.query.Sdate+"' and '"+req.query.Edate+"'";

// 	connect to your database
//   connect to your database
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
	
	// result= {"recordsets":[[{"Cas2OEE":71.36597321855572}]],"recordset":[{"Cas2OEE":71.36597321855572}],"output":{},"rowsAffected":[1]};
	// res.send(result);
	

});

module.exports = router;