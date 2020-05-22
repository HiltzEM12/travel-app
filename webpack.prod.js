const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
// We need Nodes fs module to read directory contents
// const fs = require('fs');

//Taken from https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
// Our function that generates our html plugins
// function generateHtmlPlugins(templateDir) {
//     // Read files in template directory
//     const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
//     return templateFiles.map(item => {
//         // Split names and extension
//         const parts = item.split('.')
//         const name = parts[0]
//         const extension = parts[1]
//         // Create new HTMLWebpackPlugin with options
//         return new HTMLWebpackPlugin({
//             filename: `${name}.html`,
//             template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
//         })
//     })
// }

// Call our function on our views directory.
// const htmlPlugins = generateHtmlPlugins('./src/client/views')

module.exports = {
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader', ],
            }
        ]
    },
    plugins: [
            new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
            }),
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),
            new HtmlWebPackPlugin({
                template: "./src/client/views/test-page.html",
                filename: "./test-page.html",
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new WorkboxPlugin.GenerateSW(),
        ] // We join our htmlPlugin array to the end
        // of our webpack plugins array.
        // .concat(htmlPlugins)
}