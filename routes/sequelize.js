module.exports = function(app) {

	//	LOAD módulo
	var sequelize = require("sequelize");


	//	CONNECT
	var seq = new sequelize('xxxx', 'xxxx', 'xxxx', 
		{
		  host: 'xxxx-node-api.cloudapp.net',
		  dialect: 'mssql',
		  define: {
		  	timestamps: false,						// columnas create y update fila - deshabilitada
		  	freezeTableName: true					// convención de tabla default - deshabilitada
			}
		});


	//	OBJECT javascript, que representa la tabla
	var seqTest = seq.define("aSeqTest", 
	{
		Id: {
			primaryKey: true,
			type: sequelize.INTEGER,
			autoIncrement: true						//	defino autonumerico
		},
		Name: sequelize.TEXT,
		Address: sequelize.TEXT,
		Phone: sequelize.TEXT,
		Date: sequelize.DATE,
		Active: sequelize.BOOLEAN,
		Amount: sequelize.DECIMAL(10, 2)
	},
		//	SET nombre de tabla real
		{
		tableName: "aSequelizeTest"
		}
	);


    getData = function(req, res) 
    {

    	//	FIND en el módelo con ID = x
    	seqTest.findById(req.params.id).then(function(data)
    	{
    		res.send(data);
    	});

    };


    postData = function(req, res) 
    {

    	//	CREATE
      	seqTest
      	.create({
      			Name: "Carlitos",
      			Address: "Azara",
      			Phone: "154889",
//      			Date: Date.now(),
      			Active: false,
      			Amount: 2589
      		})
      	.then(function(data) {
    		res.send(data);
      	});

    };


    putData = function(req, res) 
    {

    	//	UPDATE
    	seqTest
    	.findById(req.params.id)
    	.then(function(data) {
    		if (data) {
			    data.update({
		      		Name: "Carlitos Gardel",
		      		Address: "Azara 13",
		      		Phone: "1548897845",
		//      	Date: Date.now(),
		      		Active: false,
		      		Amount: 2550
		      	})
		      	.then(function(data) {
		    		res.send(data);
		      	});
    		}
	    	else {
	    		res.send("NO");
    		}
    	});

    };


    deleteData = function(req, res) 
    {

    	//	DELETE
    	seqTest
    	.findById(req.params.id)
    	.then(function(data) {
    		if (data) {
	    		data.destroy().then(function() {
	    			res.send("OK");
	    		})
    		}
	    	else {
	    		res.send("NO");
    		}
    	});

    };


    app.get("/test/:id", getData);
    app.post("/test", postData);
    app.put("/test/:id", putData);
    app.delete("/test/:id", deleteData);

}
