var auth = require("http-auth");

module.exports = c => auth.connect(auth.basic(
	{
		realm: "API server"
	}, (username, password, callback) =>
		callback(username == c.username && password == c.password)
));