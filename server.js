
/*	DECLARE		variables globales */
var port = process.env.PORT || 8080;


//  INCLUDE módulos necesarios
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var sql = require('mssql');
var cs = require("./js/getJsonFile.js");	/*	módulo Edu Mazzu */
var colors = require('colors');


/*	INSTANCE módulo express	*/
var app = express();


/*	CHECK 	si se ejecuta con argumentos
			argumento 0: node
            argumento 1: server.js
            argumento > 1: analizar
*/

/*  SET     ambiente predeterminado: DESARROLLO */
var __ENVIRONMENT = "DEV";
var message = "Trabajando en ambiente: DEV...".green;

/*  CHECK   si debe correr ambiente PRODUCTIVO */
if (process.argv.indexOf("-PROD") > -1)  {
	__ENVIRONMENT = "PROD";
    message = "Trabajando en ambiente: PROD...".red;
}

/*  CHECK   si debe correr ambiente TESTING */
if (process.argv.indexOf("-TEST") > -1)  {
	__ENVIRONMENT = "TEST";
    message = "Trabajando en ambiente: TEST...".yellow;
}

/*  SEND info a syslog */
console.log(message);
console.log();


/*	BUILD	nombre del string de conexión según ambiente */
connectionStringName = "./config/connection-string-" + __ENVIRONMENT + ".json";

/*	GET		json con string de conexión */
config = cs.getConnectionString(connectionStringName);


/*	CONNECT	con la base que corresponda */
var cn = new sql.Connection(config);

/*
, function(err) {

	//	SEND info a syslog 
	console.log(err);

});
*/


// CONFIG   middleware bodyParser()
//          me permite parsear los POST, sean json o no, 
//          devuelve el resultado accesible vía variable req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// INSTANCE router
var router = express.Router();


//	Localización de los ficheros estáticos
app.use(express.static(__dirname + "/public"));



//  CONFIG  Middleware para que todas las solicitudes, pasan por aca,
//          luego continuan, para entrar en el Ruteo que corresponda
app.use(function(req, res, next) {

    // DEFINE   website
    // ADD      metidos que permito 
    // SET      true si mi sitio requiere cookies
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //console.log(req.get('user-agent'));
    console.log(req.method + " " + req.path);

    // continua
    next();
});



// CALL módulos con los ruteos
test   = require('./routes/sequelize.js')(app);



//  CONNECT     connection pool y levanto server
cn.connect().then(function() {

	//	SEND info a syslog 
    console.log("Pool de conexión OK");

    var server = app.listen(port, function() {

        var host = server.address().address;
        var port = server.address().port;

       	//	SEND info a syslog 
        console.log("Escuchando en http://%s:%s.", host, port);
        console.log("Listo para hacer peticiones.");
        
    });

}).catch(function(err) {

  	//	SEND info a syslog 
    console.error("Error Pool de conexión", err);

});
