const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	target: 'web',
	resolve: {
		// Add `.ts`, `.jsx`, '.js' and '.es6' as a resolvable extension.
		extensions: ['.js', '.jsx', '.es6']
	},
	entry: {
		index: ['react-hot-loader/patch', path.resolve(__dirname, 'src/frontend/Index.js')]
		// index: path.resolve(__dirname, 'src/frontend/Index.js')
	},
	output: {
		filename: '[name].build.js',
		path: path.resolve(__dirname, 'dist/frontend'),
		publicPath: '/'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist/frontend'),
		watchContentBase: true,
		watchOptions: {
			poll: true
		},
		compress: true,
		port: 4200,
		host: '127.0.0.1',
		historyApiFallback: true,
		overlay: true, // show compiler errors on screen
		stats: 'errors-only' // normal, errors-only, minimal, verbose, none
	},
	plugins: [
		/**
		 * If webpack or webpack-dev-server are launched with the --hot option, this plugin will be added automatically, so you may not need to add this to your webpack.config.js
		 */

		/**
		 * The plugin will generate an HTML5 file for you that includes
		 * all your webpack bundles in the body using script tags.
		 */
		new HtmlWebpackPlugin({
			title: 'MERN Stack Starter Pack',
			filename: 'index.html',
			template: './src/frontend/public/index.html',
			inject: true, // all javascript resources will be placed at the bottom of the body element
			hash: true
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
				include: [path.resolve(__dirname, 'src/frontend'), path.resolve(__dirname, 'src/shared')],
				exclude: [path.resolve(__dirname, 'node_modules')],
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
