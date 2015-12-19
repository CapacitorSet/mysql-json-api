var https = require("https");

module.exports.createServer = app => {
	var credentials;
	try {
		credentials = {
			key: fs.readFileSync('./server.key', 'utf8'),
			cert: fs.readFileSync('./server.crt', 'utf8')
		};
	} catch (e) {
		console.log("Keyfiles (server.key and server.crt) not found! You can generate them with cert.sh.");
		process.exit(1);
	}
	https.createServer(credentials, app).listen(config.ports.https, err => {
		if (err) {
			util.log("Couldn't start the HTTPS server!");
			util.log(err);
			return;
		}
		util.log("HTTPS server active");
	});
};
