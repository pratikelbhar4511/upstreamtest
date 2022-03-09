 function addSerialNumber(tblid) {
    var tblobj='#'+tblid+ ' tbody tr';
    $(tblobj).each(function (index) {
        $(this).find('td:nth-child(1)').html(index);
    });
};

function addSerialNumberLoss(tblid) {
    var tblobj='#'+tblid+ ' tbody tr';
    $(tblobj).each(function (index) {
        $(this).find('td:nth-child(1)').html(index+1);
    });
};
 //#region DateFunctions

 function toDate(date) {
    if (date === void 0) {
        return new Date(0);
    }
    if (isDate(date)) {
        return date;
    } else {
        return new Date(parseFloat(date.toString()));
    }
}

function isDate(date) {
    return (date instanceof Date);
}

function format(date, format) {
    var d = toDate(date);
    return format
        .replace(/Y/gm, d.getFullYear().toString())
        .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
        .replace(/d/gm, ('0' + (d.getDate() + 0)).substr(-2))
        .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
        .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
        .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
        .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
}
//#endregion

		/**
		* function to convert date format and last 8 hour time to be used in UI calender
		* @param {Date} inDate the date to use
		* @parm {Num} hrs hours selected from dropdown
		* @author : varun_cbt
		getFromTime
		*/
		var getFromTime = function(inFDate,hrs) {
			var inFDate = inFDate;
			var h = hrs;
			var minush = new Date(inFDate);
			minush = minush.getTime() - (h * 3600000);
			var oFDate = new Date(minush);
			var fhour = oFDate.getHours()
			var fmin = oFDate.getMinutes()
			var fodd = oFDate.getDate();
			var fomm = oFDate.getMonth() + 1;
			var foyyyy = oFDate.getFullYear();
			if (fodd < 10) {
				fodd = '0' + fodd;
			}
			if (fomm < 10) {
				fomm = '0' + fomm;
			}
			if (fmin < 10) {
				fmin = '0' + fmin;
			}
			if (fhour < 10) {
				fhour = '0' + fhour;
			}
			var outFDate = foyyyy + '-' + fomm + '-' + fodd + 'T' + fhour + ':' + fmin;
			return outFDate;
		}
		/**
		 * function to convert date format to be used in UI calender
		 * @param {Date} inDate the date to use
		 * @author :  varun_cbt
		 */
		var getToTime = function(inDate) {
			var inDate = inDate;
			// console.log("ingetStarttime ",inDate )
			var oDate = new Date(inDate)
			var hour = oDate.getHours()
			var min = oDate.getMinutes()
			var odd = oDate.getDate();
			var omm = oDate.getMonth() + 1;
			var oyyyy = oDate.getFullYear();
			if (odd < 10) {
				odd = '0' + odd;
			}
			if (omm < 10) {
				omm = '0' + omm;
			}
			if (min < 10) {
				min = '0' + min;
			}
			if (hour < 10) {
				hour = '0' + hour;
			}
			var outDate = oyyyy + '-' + omm + '-' + odd + 'T' + hour + ':' + min;
			return outDate;
		}
	