var express = require('express');
var router = express.Router();
var path = require('path');
var DBconfig = require('../config.json');

//MSSQL
var sqlclient = require("mssql");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Azure' });
  //res.sendFile(path.join(__dirname, '../', 'public', 'SpeedLossDashboard.html'));
});

router.get('/getCas2OEE', function (req, res, next) {

	
	result= {"recordsets":[[{"Cas2OEE":71.36597321855572}]],"recordset":[{"Cas2OEE":71.36597321855572}],"output":{},"rowsAffected":[1]};
	res.send(result);
	

});

router.get('/login', function (req, res, next) {
result={"recordsets":[[{"UserId":4,"Password":"demo","FName":"demo","LName":"user","Email":"demo@mintfdi.com","ContactNo":"12345","Role":"Super Admin","StatusFlag":null,"EmailFlag":null,"SMSFlag":null}]],"recordset":[{"UserId":4,"Password":"demo","FName":"demo","LName":"user","Email":"demo@mintfdi.com","ContactNo":"12345","Role":"Super Admin","StatusFlag":null,"EmailFlag":null,"SMSFlag":null}],"output":{},"rowsAffected":[1]}
res.send(result);

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
module.exports = router;
