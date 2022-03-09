const http = require('http');
var express = require('express');
var router = express.Router();
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n'
  res.end(msg);
});


router.get('/getCas2OEE', function (req, res, next) {

	
	result= {"recordsets":[[{"Cas2OEE":71.36597321855572}]],"recordset":[{"Cas2OEE":71.36597321855572}],"output":{},"rowsAffected":[1]};
	res.send(result);
	

});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
