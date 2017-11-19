const webpack = require('webpack');

module.exports = {
	entry: './browser/react/index.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	devtool: 'source-map',

	module: {
		loaders:[
			{ test: /\.js$/,
			  exclude: /node_modules/,
			  loader: 'babel-loader',
			  query: { presets: ['es2015', 'react', 'stage-2'] }
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise',
		})
	]
}
