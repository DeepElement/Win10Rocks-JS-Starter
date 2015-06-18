var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    browserify = require('gulp-browserify'),
    docco = require("gulp-docco"),
    folderToc = require("folder-toc");

require('./build/gulp.universal');
require('./build/gulp.win8.1');
require('./build/gulp.web');

exports.parseEnv = function () {
    return {
        version:
        {
            major: process.env.Version_Major || 0,
            minor: process.env.Version_Minor || 0,
            revision: process.env.Version_Revision || 0,
            build: process.env.Version_Build || 1,
        }
    };
};

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("browserify-compile", function () {
    return gulp.src('src/common/sdk/main.node.js')
        .pipe(browserify());
});

gulp.task("docs",
    function (cb) {
        runSequence("clean", "docs-docco", "docs-index", cb);
    });

gulp.task("docs-index", function (cb) {
    folderToc("publish/docs",
        {
            name: 'index.html',
            layout: 'classic',
            filter: '*.html',
            title: 'Docco Docs'
        });
    return cb();
});

gulp.task("docs-docco", function () {
    return gulp.src(['src/common/**/*.js'])
        .pipe(docco())
        .pipe(gulp.dest('publish/docs'));
});

gulp.task("clean", function (cb) {
    rimraf('./publish', cb);
});

gulp.task("test", ["browserify-compile"], function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task("test-ci", ['browserify-compile'], function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});