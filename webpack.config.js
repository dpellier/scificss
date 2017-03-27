'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './src/app.js',
        './src/app.scss'
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),
                exclude: ['node_modules']
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        noInfo: true
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new CopyWebpackPlugin([{
            from: './src/lib/**/*.html',
            to: './lib',
            flatten: true
        }]),
        new ExtractTextPlugin('app.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            files: {
                css: ['app.css']
            }
        })
    ]
};
