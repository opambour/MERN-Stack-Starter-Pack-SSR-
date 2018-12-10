import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';

import { Logger, NormalizePort, ErrorHandler } from './libs/helper';
import { MongooseConfiguration } from './libs/mongoose.config';

// import react renderToString, Provider and our store
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '../ReduxStateManagement/Store';
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router';

// import fronend App
import App from '../shared/App';
// import template view
import Template from './TemplateView';

// needed for hmr or hot reloading
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// import webpack.config.js
const config = require('../../webpack.config');

// current dir
const CURRENT_WORKING_DIR = process.cwd();

// dotenv
require('dotenv').config();

// express app
const app = express();

// mongoose here...
MongooseConfiguration(mongoose);

// webpack compiler
const compiler = webpack(config);

// set middleware
app.enable('trust proxy');
app.set('port', NormalizePort(process.env.PORT) || 3000);
app.set('static_files', path.join(CURRENT_WORKING_DIR, 'dist/frontend'));

// use middleware
app.use(helmet());
// body parser using express.urlencoded
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(cors());
// static files
app.use(express.static(app.get('static_files'))); // static files

// Env
const isProduction = JSON.stringify(process.env.NODE_ENV) === 'production';

if (isProduction) {
	app.use(compression());
	app.get('trust proxy');
	// app.use(
	// 	session({
	// 		secret: process.env.SECRET_KEY.toString(),
	// 		name: process.env.SESSION_NAME.toString(),
	// 		saveUninitialized: true, // create session until something stored
	// 		resave: false, // don't save session if unmodified
	// 		cookie: { maxAge: 300000 } // 60000 milliseconds = 1 minute, 300000 is 5 minutes
	// 	})
	// );
} else {
	// Hot Module Replacement
	app.use(
		webpackDevMiddleware(compiler, {
			serverSideRender: true,
			noInfo: true,
			publicPath: './'
		})
	);
	app.use(webpackHotMiddleware(compiler));

	// public directory

	// log requests
	app.use(Logger());
}

// routes
app.get('*', (req, res, next) => {
	const context = {};

	const html = renderToString(
		<Provider store={store()}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</Provider>
	);

	const templateOptions = {
		title: 'Mern Stack Starter Pack',
		html,
		store: store(),
		context,
		res
	};

	Promise.resolve()
		.then(() => {
			return res.status(context.statusCode || 200).send(Template(templateOptions));
		})
		.catch(err => next(err));
});

// error handling
app.use(ErrorHandler);

// server
const Server = http.createServer(app);

Loadable.preloadAll().then(() => {
	// listen to port
	Server.listen(app.get('port'), 'localhost', err => {
		if (err) {
			console.log(err.message); // you can output err.stack
			return;
		}

		const getHostAddress = Server.address();

		console.log(`Web server running at http://${getHostAddress.address}:${app.get('port')}`);

		// console.log('App Views Dir:', app.get('views'));
		// console.log('App Static Files Dir:', app.get('static files'));

		console.log('\npress Ctrl-C to terminate.');
	});
});

if (module.hot) {
	module.hot.accept();
}
