'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};
    config.entry = isTest ? void 0 : {
        app: path.resolve(__dirname, '..', 'src', 'app', 'chara.js'),
        vendor: ['angular', "angular-animate", "angular-aria",
            "angular-material", "angular-messages", "angular-resource",
            "angular-sanitize", 'angular-ui-router', "ui-router-extras"]
    };

    config.output = isTest ? {} : {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    }
    else if (isProd) {
        config.devtool = 'source-map';
    }
    else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: path.resolve(__dirname, '..', 'node_modules'),
                use: [
                    {loader: 'source-map-loader'},
                ]
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '..', 'node_modules'),
                query: {
                    presets: [ 'es2015', 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                    babelrc: false
                }
            }, {
                test: /\.css$/,

                loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {loader: 'css-loader', query: {sourceMap: true}},
                        {loader: 'postcss-loader'}
                    ],
                })
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }]
    };

    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                path.resolve(__dirname, '..', 'node_modules'),
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '..', 'src', 'public', 'index.html'),
                inject: 'head',
                minify: isProd && {
                    removeComments: false,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                },
            }),

            new ExtractTextPlugin({
                filename: path.resolve(__dirname, '..', 'src', 'css', '[name].css'),
                disable: !isProd,
                allChunks: true
            })
        )
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                mangle: {
                    screw_ie8: true
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            }),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '..', 'src', 'public')
            }])
        )
    }

    config.devServer = {
        contentBase: path.resolve(__dirname, '..', 'src', 'public'),
        stats: 'minimal',
        compress: false
    };

    return config;
}();
