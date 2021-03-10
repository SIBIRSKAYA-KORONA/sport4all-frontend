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
        extensions: ['.js', '.jsx'],
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Pages: path.resolve(__dirname, 'src/pages/'),
            Models: path.resolve(__dirname, 'src/models/'),
            Actions: path.resolve(__dirname, 'src/store/actions/'),
            Reducers: path.resolve(__dirname, 'src/store/reducers/'),
            Static: path.resolve(__dirname, 'static/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            Constants$: path.resolve(__dirname, 'src/utils/constants.js'),
            Interfaces$: path.resolve(__dirname, 'src/utils/interfaces.js')
        }
    },

    module: {
        rules: [
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
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    'file-loader'
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
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
