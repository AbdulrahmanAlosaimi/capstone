const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: ["regenerator-runtime/runtime.js", './src/client/index.js'],
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    node: {
        fs: "empty"
    },
    devServer: {
        port: process.env.PORT || 8082,
        setup(app) {
            let coordinatesObject = {},
                weatherbitObject = {},
                pixabayObject = {};


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

            const geoNamesUsernameObject = {
                username: process.env.geoNamesAPI_USERNAME
            }

            const weatherbitApiKeyObject = {
                apiKey: process.env.weatherbitAPI_KEY
            }

            const pixabayApiKeyObject = {
                apiKey: process.env.pixabayAPI_KEY
            }

            app.get('/geoNamesUsername', function(req, res) {
                res.send(geoNamesUsernameObject);
            })

            app.get('/weatherbitKey', function(req, res) {
                res.send(weatherbitApiKeyObject);
            })

            app.get('/pixabayKey', function(req, res) {
                res.send(pixabayApiKeyObject);
            })

            app.post('/addCoordinates', function(req, res) {
                coordinatesObject = req.body;
                res.end(JSON.stringify({ status: 200, message: "success", coordinatesObject: coordinatesObject }));
            })

            app.get('/getCoordinates', function(req, res) {
                res.send(coordinatesObject);
            })

            app.post('/addWeatherbitObject', function(req, res) {
                weatherbitObject = req.body;
                res.end(JSON.stringify({ status: 200, message: "success", weatherbitObject: weatherbitObject }));
            })

            app.get('/getWeatherbitObject', function(req, res) {
                res.send(weatherbitObject);
            })

            app.post('/addPixabayObject', function(req, res) {
                pixabayObject = req.body;
                res.end(JSON.stringify({ status: 200, message: "success", pixabayObject: pixabayObject }));
            })

            app.get('/getPixabayObject', function(req, res) {
                res.send(pixabayObject);
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
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
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