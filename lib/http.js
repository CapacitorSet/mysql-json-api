module.exports.createServer = app => {
	app.listen(config.ports.http, err => {
		if (err) {
			util.log("Couldn't start the HTTP server!");
			util.log(err);
			return;
		}
		util.log("HTTP server active");
	});
};
