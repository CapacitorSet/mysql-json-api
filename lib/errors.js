// An error handler.

module.exports = (err, req, res, next) => {
	util.log("Internal error on " + req.method + " " + req.originalUrl);
	util.log(err.stack);
	res.status(500).json({
		err: {
			code: 500,
			message: err.message,
		}
	});
};