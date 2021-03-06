const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/client/index.js',

    module: {
        rules: [
                {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                }
        ]
},

plugins: [
    new HtmlWebPackPlugin({
        template: "./src/Client/View/index.html",
        filename: "./index.html",
    })
]


}