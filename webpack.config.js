/* eslint-disable no-undef */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [

        // eslint-disable-next-line new-cap
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
};
