"use strict";

let gulp = require("gulp");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");
let streamify = require("gulp-streamify");
let uglify = require("gulp-uglify");
let logger = require("gulp-logger");

let libs = [
    "react",
    "react-dom",
    "axios",
    "radium",
    "axios-cancel",
    "react-modal",
    "react-redux",
    "redux-thunk",
];

gulp.task("build", function() {
    let pages = [
        "signup",
        "login",
        "void",
        "home",
        "user",
        "calendar",
        "chat",
        "team",
    ];
    let remaining = pages.length;
    for (let page of pages) {
        let bundler = browserify({
            entries: ["./src/" + page + "/components/" + page.capitalize() + ".js"],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true // TODO: I think this should be false
        });
        for (let lib of libs) {
            bundler.external(lib);
        }
        let stream = bundler
            .transform(babelify, {
                presets: ["es2015", "react"],
                plugins: [
                    "syntax-async-functions",
                    "transform-regenerator",
                    "transform-decorators-legacy",
                    "transform-class-properties",
                    "transform-object-rest-spread",
                    ["babel-root-import", { rootPathSuffix: "src" }],
                    ["transform-runtime", { polyfill: false, regenerator: true }],
                ]
            })
            .bundle()
            .on("error", function(err) {
                console.log(err.toString());
                console.log(err.codeFrame);
            })
            .pipe(source(page.capitalize() + ".js"))
//            .pipe(streamify(uglify()))
            .pipe(gulp.dest("./build/"));
        stream.on("end", () => {
            if (!--remaining) {
                console.log("done");
            }
        });
    }
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.js", ["build"]);
});

gulp.task("vendor", function() {
    let bundler = browserify({
        debug: true,
        cache: {},
        packageCache: {},
    });
    for (let lib of libs) {
        bundler.require(lib);
    }
    bundler
        .bundle()
        .pipe(source("vendor.js"))
        .pipe(gulp.dest("./build/"));
});

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};
