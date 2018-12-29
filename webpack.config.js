const { resolve: resolvePath } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    mode: "development",
    entry: {
        main: resolvePath("src", "index"),
    },
    output: {
        path: resolvePath("dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "WebGL test",
        }),
    ],
};

module.exports = config;
