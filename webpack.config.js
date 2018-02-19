var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtendedDefinePlugin = require('extended-define-webpack-plugin');
var appConfig = require('./app.config.jsx');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=scss&includePaths[]=' + path.resolve(__dirname, './src/styles')
];

const config = {
    entry: {
        app: ['./src/js/app.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015', 'react', 'stage-0'
                    ]
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
                loaders: ['url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]']
            },
            {
                test: /\.(woff|woff2|eot|ttf)($|\?)/,
                loaders: ['url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]']
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 100,
        poll: 200
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './assets'),
        publicPath: '/assets/',
      sourceMapFilename: '[file].map',
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([
            {from: 'node_modules/jquery/dist/jquery.js'},
            {from: 'node_modules/jquery-modal/jquery.modal.min.js'},
            {from: 'node_modules/jquery-modal/jquery.modal.min.css'},
            {from: 'node_modules/datatables.net', to: 'datatables.net'},
            {from: 'node_modules/bootstrap', to: 'bootstrap'},
            {from: 'node_modules/datatables-bootstrap', to: 'datatables-bootstrap'},
            {from: 'public/prototypes.js'},
            {from: 'public/localizations', to: 'localizations'},
            {from: 'public/jquery.colorfy.js'},
        ]),
        new ExtendedDefinePlugin({
            'process.env': appConfig,
        })
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.sass', '.less', '.css'],
        root: [path.join(__dirname, './src')]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        outputPath: path.join(__dirname, './assets')
    }
}


module.exports = config;
