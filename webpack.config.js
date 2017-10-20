
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'local';
const isLocal = ENV === 'local';

module.exports = function webpackConfig() {
    const config = {};
    const outputPath = __dirname + '/dist';

    config.entry = [
        'react-hot-loader/patch',
        './src/index.jsx'
    ];

    config.output = {
        path: outputPath,
        publicPath: isLocal ? 'http://localhost:8080/' : '/',
        filename: isLocal ? '[name].bundle.js' : '[name].[hash].js',
        chunkFilename: isLocal ? '[name].bundle.js' : '[name].[hash].js'
    };

    if (isLocal) {
        config.devtool = 'eval-source-map';
    } else {
        config.devtool = 'source-map';
    }

    config.module = {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded!postcss-loader'
            }),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    {loader: 'css-loader', query: {sourceMap: true}},
                    {loader: 'postcss-loader'}
                ]
            })
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            test: /\.cur$/,
            loader: 'file-loader?name=assets/cursors/[name].[ext]'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };

    config.plugins = [
        new CleanWebpackPlugin(['dist']),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: isLocal,
            allChunks: true
        })
    ];

    if (!isLocal) {
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        );
    }

    config.devServer = {
        contentBase: './src',
        stats: 'minimal',
        port: 8080,
        historyApiFallback:{
            index: 'http://localhost:8080/'
        }
    };

    return config;
}();
