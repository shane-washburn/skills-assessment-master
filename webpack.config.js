const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
	const isReactEnv = env.DEV_ENV === 'react';

	return {
		devServer: {
			static: {
				directory: path.join(__dirname, 'public/'),
				publicPath: '/',
				watch: true,
			},
			hot: true,
			open: true,
			devMiddleware: {
				writeToDisk: true,
			}
		},
		devtool: false,
		entry: isReactEnv ? './src/index.react.js' : './src/index.vanilla.js',
		mode: 'development',
		output: {
			filename: 'index.js',
			path: path.resolve(__dirname, 'public/js'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: path.resolve('./public/index.html'),
				template: isReactEnv ? path.resolve('./src/index.react.html') : path.resolve('./src/index.vanilla.html'),
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'public/assets') },
				]
			}),
			new webpack.EvalSourceMapDevToolPlugin({
				test: /\.[jt]sx?($|\?)/,
			}),
		],
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					},
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				}
			],
		},
	};
};