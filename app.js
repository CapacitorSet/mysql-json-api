// Mostra tutta la stack trace
Error.stackTraceLimit = Infinity;

util = require("util");
config = JSON.parse(require("fs").readFileSync("config.json", "utf8"));
util.log("Configuration loaded");

fs = require("fs");

require("./lib/db");
require("./lib/express");
Https   = require("./lib/https");
Http    = require("./lib/http");
Query   = require("./lib/query");

if (config.auth) {
	var auth;

	if (config.auth.https) {
		auth = require("./lib/auth")(config.auth.https);
		app.https.use(auth);	
	}
	if (config.auth.http) {
		auth = require("./lib/auth")(config.auth.http);
		app.http.use(auth);	
	}
}

/* Uncomment this if you need to support POST

var bodyParser = require("body-parser");
// Support url-encoded POST data
app.https.use(bodyParser.urlencoded({ extended: true }));

*/

["http", "https"].forEach(
	protocol => app[protocol].use(
		"/app/:nomeApp",
		(req, res, next) => {
			req.nomeApp = req.params.nomeApp;
			next();
		}
	)
);

require("./lib/endpoints");

var errHandler = require("./lib/errors");

["http", "https"].forEach(
	protocol => {
		app[protocol].use(errHandler);
		app[protocol].use(
			"*",
			(req, res) => {
				util.log(`404: ${req.method} ${req.originalUrl}`);
				res.status(404).json({err:{code:404}});
			}
		);
	}
);

if (config.ports.https)
	Https.createServer(app.https);
else
	delete app.https;

if (config.ports.http)
	Http.createServer(app.http);
else
	delete app.http;