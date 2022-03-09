

function generategraph(srecid) {
    debugger;
    'use strict';
  
    $.ajax({
  
      type: "GET",
      url: "/reportdata",
     data: {
        recipieid : srecid
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    
    success: function (result) {
      debugger;
      var k = 0;
     
      var response =JSON.parse(JSON.stringify(result.recordset));
         
      $.each(response, function(i, d) 
      {
        var row='<tr>';
   
    
        var doc=[];
        $.each(d, function(j, e) {
        
          var index = Object.keys(d).indexOf(j);
         
          var _dvalue = e == null ? '0': e.toString();
          doc[index]=_dvalue;
          
          });
        
  
        row+='<td>'+sHank+'</td>';  
        row+='<td>'+doc[0].toString() +'</td>';
        row+='<td>'+(doc[5].toString()  == null ? 0:doc[5].toString() ) +":"+(doc[6].toString()  == null ? 0:doc[6].toString() )+'</td>';
        row+='<td>'+(doc[1].toString()   == null ? 0:doc[1].toString()  )+":"+(doc[2].toString()  == null ? 0:doc[2].toString() )+'</td>';
        row+='<td>'+(doc[7].toString()   == null ? 0:doc[7].toString()  )+'</td>';
        row+='<td>'+(doc[3].toString()   == null ? 0:doc[3].toString()  )+'</td>';
  
        row+='</tr>';
        $('#tblData tbody').append(row);
     });
  
   }
  
   })
  };
  