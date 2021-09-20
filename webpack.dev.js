const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    node: {
        fs: "empty"
    },
    devServer: {
        port: process.env.PORT || 8082,
        setup(app) {
            let articleData = {};

            /* Middleware*/
            //Here we are configuring express to use body-parser as middle-ware.
            const bodyParser = require('body-parser');
            app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
            app.use(bodyParser.json({ limit: '50mb' }));

            // Cors for cross origin allowance
            const cors = require('cors');
            app.use(cors());

            // Environment Variables
            const dotenv = require('dotenv')
            dotenv.config()

            const api = {
                key: process.env.API_KEY
            }

            app.get('/apiKey', function(req, res) {
                res.send(api);
            })

            app.post('/add', function(req, res) {
                articleData = req.body;
                console.log(`Returning article data. ${articleData.confidence}`)
                res.end(JSON.stringify({ status: 200, message: "success", articleData: articleData }))
            })

            app.get('/data', function(req, res) {
                res.send(articleData);
            })
        }
    },
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}