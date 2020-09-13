const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    mode: 'development',
    entry: './src/content.ts',

    output: {
        path: path.join(__dirname, "dist"),
        filename: "content.js"
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }]
    },
    resolve: {
        modules: [
            "node_modules",
        ],
        extensions: [
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' },
                { from: 'src/icons', to: 'icons' },

            ],
        }),
    ],
};
