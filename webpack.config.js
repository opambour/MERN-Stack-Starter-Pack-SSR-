const Webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const backend = {
	mode: 'development', // change it during production
	target: 'node',
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	node: {
		console: true,
		global: true,
		process: true,
		__filename: false,
		__dirname: 'mock',
		Buffer: true,
		setImmediate: true

		// See "Other node core libraries" for additional options.
	},
	performance: {
		hints: 'warning',
		maxAssetSize: 4000000, // int (in bytes),
		maxEntrypointSize: 4000000, // int (in bytes)
		assetFilter(assetFilename) {
			// Function predicate that provides asset filenames
			return assetFilename.endsWith('.js');
		}
	},
	devtool: 'cheap-eval-source-map', // source-map | eval-source-map | cheap-eval-source-map
	resolve: {
		// Add `.ts`, `.jsx`, '.js' and '.es6' as a resolvable extension.
		extensions: ['.js', '.jsx', '.es6']
	},
	entry: {
		server: ['core-js/modules/es6.promise', 'core-js/modules/es6.array.iterator', './src/backend/Server.js']
	},
	output: {
		filename: '[name].build.js',
		path: path.resolve(__dirname, 'dist/backend'),
		publicPath: './'
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true,
		compress: true,
		port: 4200,
		watchOptions: {
			poll: true
		},
		stats: 'errors-only'
	},
	plugins: [
		new CleanWebpackPlugin(['dist/backend'], {
			// options
			verbose: true,
			dry: false
		}),
		/**
		 * MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS
		 * file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
		 */
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),

		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__isBrowser__: false
		}),
		new NodemonPlugin({
			args: ['development'],
			// What to watch.
			watch: path.resolve(__dirname, 'dist'),
			// ouput file
			script: './dist/backend/server.build.js',
			// Extensions to watch
			ext: 'js',
			// Detailed log.
			verbose: true
		}),

		/** HMR allows all kinds of modules to be updated at runtime without the need for a full
		 * refresh.
		 ** HMR is not intended for use in production.
		 */
		new Webpack.HotModuleReplacementPlugin({
			// Options...
			title: 'server: Hot Module Replacement...'
		})
	],
	module: {
		rules: [
			// .js and .jsx rule
			{
				test: /\.(js|jsx)?$/,
				use: [
					'cache-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
							plugins: [
								'@babel/plugin-transform-runtime',
								[
									'@babel/plugin-proposal-class-properties',
									{
										loose: true
									}
								],
								'react-hot-loader/babel'
							]
						}
					},
					'eslint-loader'
				],
				exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'dist')],
				enforce: 'pre'
			},
			// css loader: This enables you to import './style.css' into the file that depends on that styling.
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// scss/sass
			{
				test: /\.scss$/,
				use: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
					// compiles Sass to CSS, using Node Sass by default
					{
						loader: 'sass-loader',
						options: {
							// You can also pass options directly to Node Sass
							includePaths: ['./node_modules/node-sass'],
							implementation: require('node-sass')
						}
					}
				]
			},
			// url loader: A loader for webpack which transforms files into base64 URIs.
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8000,
					fallback: 'file-loader'
				}
			}
		]
	}
};

const frontend = {
	mode: 'development', // change it during production
	target: 'web',
	performance: {
		hints: 'warning',
		maxAssetSize: 4000000, // int (in bytes),
		maxEntrypointSize: 4000000, // int (in bytes)
		assetFilter(assetFilename) {
			// Function predicate that provides asset filenames
			return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
		}
	},
	devtool: 'cheap-eval-source-map', // source-map | eval-source-map | cheap-eval-source-map
	resolve: {
		// Add `.ts`, `.jsx`, '.js' and '.es6' as a resolvable extension.
		extensions: ['.js', '.jsx']
	},
	entry: {
		client: ['core-js/modules/es6.promise', 'core-js/modules/es6.array.iterator', './src/frontend/Client.js']
	},
	output: {
		filename: '[name].build.js',
		path: path.resolve(__dirname, 'dist/frontend'),
		publicPath: '/'
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true,
		compress: true,
		port: 4200,
		watchOptions: {
			poll: true
		},
		stats: 'errors-only'
	},
	// stats normal is standard output
	// stats minimal will output when errors or new compilation happen
	// verbose Output everything
	// "errors-only" Only output when errors happen
	stats: 'errors-only',
	plugins: [
		new CleanWebpackPlugin(['dist/frontend'], {
			// options
			verbose: true,
			dry: false
		}),
		/**
		 * MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS
		 * file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
		 */
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__isBrowser__: true
		}),
		new NodemonPlugin({
			args: ['development'],
			// What to watch.
			watch: path.resolve(__dirname, 'dist'),
			// Extensions to watch
			ext: 'js',
			// Detailed log.
			verbose: true
		}),
		/** HMR allows all kinds of modules to be updated at runtime without the need for a full
		 * refresh.
		 ** HMR is not intended for use in production.
		 */
		new Webpack.HotModuleReplacementPlugin({
			// Options...
			title: 'Dev: Hot Module Replacement...'
		})
	],
	module: {
		rules: [
			// .js and .jsx rule
			{
				test: /\.(js|jsx)?$/,
				use: [
					'cache-loader',
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-flow', '@babel/preset-react'],
							plugins: [
								'@babel/plugin-transform-runtime',
								[
									'@babel/plugin-proposal-class-properties',
									{
										loose: true
									}
								],
								'react-hot-loader/babel'
							]
						}
					},
					'eslint-loader'
				],
				exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'dist')],
				enforce: 'pre'
			},
			// css loader: This enables you to import './style.css' into the file that depends on that styling.
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// scss/sass
			{
				test: /\.scss$/,
				use: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
					// compiles Sass to CSS, using Node Sass by default
					{
						loader: 'sass-loader',
						options: {
							// You can also pass options directly to Node Sass
							includePaths: ['./node_modules/node-sass'],
							implementation: require('node-sass')
						}
					}
				]
			},
			// url loader: A loader for webpack which transforms files into base64 URIs.
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8000,
					fallback: 'file-loader'
				}
			}
		]
	}
};

module.exports = [backend, frontend];
