var express = require('express');
var router = express.Router();
var path = require('path');

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
module.exports = router;
