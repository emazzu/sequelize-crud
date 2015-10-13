var fs = require('fs');

module.exports.getConnectionString = function(connectionStringName) {

	/*	TRY 	Se puede producir un error, entonces lo capturo
		CATCH	antes de que la app se rompa, envía ERROR
				Abro string de configuracón en forma asíncrona
				ya que si no hace esto bien, no tiene sentido seguir
	*/
	try {

		/*	OPEN	string de conexión */
		config = fs.readFileSync(connectionStringName, 'utf8');

		/*	CONVERT	json */
		config = JSON.parse(config);

		/*  SEND info a syslog */
		//console.log(config);

		return config;

	} catch(e) {

		/*  SEND info a syslog */
		console.log("error");
	}

}
