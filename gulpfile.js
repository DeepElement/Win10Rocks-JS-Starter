var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence');

require('./build/gulp.universal');
require('./build/gulp.win8.1');

var parseEnv = function () {
    return {
        version:
        {
            major: process.env.Version_Major || 0,
            minor:  process.env.Version_Minor || 0,
            revision:  process.env.Version_Revision || 0,
            build:  process.env.Version_Build || 1,
        }
    };
};

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("build-windows-version", function () {
    var args = parseEnv();
    var buildNum = args.version.major + "." 
            + args.version.minor + "." 
            + args.version.revision + "."
            + args.version.build;
    return gulp.src('./src/**/package.appxmanifest', { base: './' })
        .pipe(replace(/\sVersion=\"[^\"]+\"\s/, ' Version=\"' + buildNum + '\" '))
        .pipe(gulp.dest('./'));
});

gulp.task("clean", function (cb) {
    rimraf('./publish', cb);
});

gulp.task("test", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task("test-ci", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});