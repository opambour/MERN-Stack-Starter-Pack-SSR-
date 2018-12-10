const Logger = () => {
	return (req, res, next) => {
		const timestamp = new Date();
		const ms = timestamp.getMilliseconds();

		console.log(`Logs:: ${req.protocol} ${req.method} - '${req.originalUrl}' | statusCode: ${res.statusCode} | ${ms} ms -- ${timestamp.toLocaleTimeString()}`);
		next();
	};
};

const ErrorHandler = () => {
	if (process.env.NODE_ENV === 'production') {
		return (error, req, res, next) => {
			if (res.headersSent) {
				return next(error);
			}
			res.status(500).send(error.message); // error.message outputs a specific error
		};
	}

	if (process.env.NODE_ENV === 'development') {
		return (error, req, res, next) => {
			// error.message outputs a specific error &  error.stack is used for more details in error
			// statusCode 500 is Server Error
			if (res.headersSent) {
				return next(error);
			}
			res.status(500).send(`${error.message}\n${error.stack}`);
			console.error(`PATH: ${req.originalUrl} Error: ${error.message}`);
		};
	}
};

const NormalizePort = port => {
	if (typeof port !== 'number') {
		return parseInt(port, 10);
	} else {
		return port;
	}
};

const asyncWrapper = fn => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

export { Logger, ErrorHandler, NormalizePort, asyncWrapper };
