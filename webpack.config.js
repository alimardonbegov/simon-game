const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./index.html" }),
        new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/sounds"),
                    to: path.resolve(__dirname, "dist/sounds"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.mp3$/,
                loader: "file-loader",
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
};
