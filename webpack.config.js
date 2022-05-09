const path = require('path');
const HTMLWebpackPlugin  = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsLoaders = () =>{
    const loaders = [
        {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
                }
        }
    ];
    // loaders.push('eslint-loader');
    return loaders;
}
module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // publicPath: 'data/',
    },
    devServer: {
                // client:{
                //     overlay: true
                // }
                port: 4200
            },
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(woff|woff2)$/,
                use:['file-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use:[
                    {
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                    },
                },
                    'css-loader',
                    'sass-loader'
                ]
                
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}
