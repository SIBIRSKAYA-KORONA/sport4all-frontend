const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Pages: path.resolve(__dirname, 'src/pages/'),
            Models: path.resolve(__dirname, 'src/models/'),
            Store: path.resolve(__dirname, 'src/store/'),
            Static: path.resolve(__dirname, 'static/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            Core: path.resolve(__dirname, 'src/core'),
            Constants$: path.resolve(__dirname, 'src/utils/constants.ts'),
            // Interfaces$: path.resolve(__dirname, 'src/utils/interfaces.js')
        }
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader',
                    // 'eslint-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: './static/images/favicon-32x32.png',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
