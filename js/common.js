var sql = require('mssql');


// module.exports.execQuery = function (app, cn, query) {
var execQuery = function(app, cn, query) {

		var resJson = "ERROR";

		/* INSTANCE para poder usar una llamada a query del modulo mssql */
		var request = new sql.Request(cn);

		/* SET true o false, para manejo de streaming */
		request.stream = true;

		/*	EXEC query */
		request.query(query);


		/*	EVENT error */
		request.on('error', function(err) {

			/*	SEND error a syslog, veremos como se hace eso */
			//return "ERROR";
			return resJson;
		});

		/*	EVENT x cada fila */
		request.on('row', function(row) {

			/*	CONCATENATE en un string, cada fila del query */
			resJson += JSON.stringify(row) + ",";

		});

		/*	EVENT al finalizar query */
		request.on('done', function(returnValue) {

			//  BUILD   json final, agrego corchetes en principio y fin y DELETE última coma, que viene del evento row
			resJson = "[" + resJson.substring(0, resJson.length - 1) + "]";
			return resJson;

		});

}

exports.execQuery = execQuery;
