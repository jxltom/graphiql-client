require('dotenv').config();

const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
    entry: "./src/scripts/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js"
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.flow$/, loader: 'ignore-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            GRAPHQL_API_URL: JSON.stringify(process.env.GRAPHQL_API_URL)
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: true
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
    ],
    node: {
        fs: 'empty'
    }
};
