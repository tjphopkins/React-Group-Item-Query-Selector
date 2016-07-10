const path = require('path');

const PATHS = {
    app: path.resolve('app'),
    build: path.resolve('../src/static')
};

module.exports = {
    context: __dirname,
    // the '' resolve extension is needed to allow imports without an extension.
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default.
                loader: 'babel-loader',
                query: {cacheDirectory: true, presets: ['es2015', 'react']},
                // Parse only app files! Without this it will transpile
                // entire project including node_modules.
                include: PATHS.app
            }
        ]
    }
};
