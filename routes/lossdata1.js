var express = require('express');
var router = express.Router();
var sortJsonArray = require('sort-json-array');
var path = require('path');
//Database configuration file

//MSSQL
var sqlclient = require("mssql");
var Connection = require('tedious').Connection;  
    var config = {  
        server: '192.168.2.80',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'sa', //update me
                password: 'Admin@123'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'MintFDIDapada'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
        executeStatement();  
    });
    
    connection.connect();

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement() {  
       var request = new Request("select sum(OEE)/4 as Cas2OEE from UDTM_CurrentData where "+
        "(LineName='Line 1' OR LineName='Line 2' OR LineName='Line 3' OR LineName='Line 4')"+
        " AND RowInsertTime between '2021-09-30 15:00:00' and '2021-09-30 23:00:00' ", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }  
    module.exports = router;