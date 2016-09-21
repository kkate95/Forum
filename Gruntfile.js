module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks("grunt-webpack");
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            options: webpackConfig,
            build: {
              output: {
                path: "./client/js",
                filename: "build.js"
              },
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                      "NODE_ENV": JSON.stringify("production"),
                      "NODE_URL": JSON.stringify("https://tranquil-hollows-87892.herokuapp.com")
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({sourceMap: false})
                )
            },
            "build-dev": {
              output: {
                path: "./client/js",
                filename: "build.js"
              },
              devtool: "cheap-inline-module-source-map",
              debug: true,
              plugins: [new webpack.DefinePlugin({
                "NODE_ENV": JSON.stringify("development"),
                "NODE_URL": JSON.stringify("http://localhost:3000")
              })]
            }
        },
        "webpack-dev-server": {
            options: {
                webpack: webpackConfig,
                publicPath: "/" + webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "eval",
                    debug: true
                }
            }
        },
        watch: {
            app: {
                files: ["app/**/*", "web_modules/**/*"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false
                }
            }
        }
    });

    // The development server (the recommended option for development)
    grunt.registerTask("default", ["webpack:build-dev"]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);

};
