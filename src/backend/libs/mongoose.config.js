const MongooseConfiguration = mongoose => {
	const DB_URI = JSON.stringify(process.env.DB_URI);

	mongoose.Promise = global.Promise;

	const options = {
		autoIndex: false, // Don't build indexes
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		keepAlive: 120, // Without it, after some period of time you may start to see "connection closed"
		poolSize: 10, // Maintain up to 10 socket connections
		// If not connected, return errors immediately rather than waiting for reconnect
		bufferMaxEntries: 0,
		useNewUrlParser: true
	};

	// connect to mongodb database
	mongoose.connect(
		DB_URI,
		options
	);

	// check mongoose connection status
	mongoose.connection.on('connecting', () => {
		console.log('Mongoose connecting...');
	});

	mongoose.connection.on('connected', () => {
		console.log('Mongoose connected to', DB_URI);
	});

	mongoose.connection.on('disconnecting', () => {
		console.log('Mongoose disconnecting...');
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose disconnected:');
	});

	mongoose.connection.on('error', err => {
		console.log('An error occurred during connection:', err);
	});
};

export { MongooseConfiguration };
