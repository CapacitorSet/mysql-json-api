var mysql = require("mysql");

connection = {};

function connect() {
	connection = mysql.createConnection(config.database);
	connection.on('error', err => {
		util.log("Couldn't connect to the database! Retrying.");
		util.log(JSON.stringify(err));
		setTimeout(connect, 5000);
	});
	connection.connect(err => {
		if (err) {
			util.log("Couldn't connect to the database! Retrying.");
			util.log(JSON.stringify(err));
			setTimeout(connect, 5000);
			return;
		}
		util.log("Connected to the database");
	});
};

connect();