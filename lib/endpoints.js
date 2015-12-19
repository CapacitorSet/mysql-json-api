var api_app = require("express")();

api_app.use((req, res, next) => {
	// Sends JSON headers and enables XHR
	res.set("Content-Type", "text/json");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

function processEndpoints(item, route) {
	for (index in item) {
		var endpoint = item[index];
		processEndpoint(route, endpoint);
	}
}

function codeGenerator(queryFile, parameters) {
	var query = Query.load(queryFile);
	if (parameters)
		return (req, res) =>
			connection.query(
				query,
				parameters.map(p => req.params[p]),
				(err, rows) => res.json({err,data:rows})
			);
	else
		return (req, res) =>
			connection.query(
				query,
				(err, rows) => res.json({err,data:rows})
			);
}

function processEndpoint(route, endpoint) {
	var code = codeGenerator(endpoint.query, endpoint.parameters);
	api_app.get(route, code);
}

var endpoints = JSON.parse(fs.readFileSync("endpoints.json", "utf8"));

for (var route in endpoints) {
	if (endpoints.hasOwnProperty(route))
		processEndpoints(endpoints[route], route);
}

util.log("API endpoints loaded");

app.http.use("/api", api_app);
app.https.use("/api", api_app);