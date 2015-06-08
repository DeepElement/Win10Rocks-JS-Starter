var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace');

var parseEnv = function () {
    return {
        version:
        {
            major: 0,
            minor: 0,
            revision: 0,
            build: 1
        }
    };
};

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("build-windows-10", ["build-windows-version"], function () {
    return gulp.src("./Win10Rocks-JS-Starter.sln")
        .pipe(msbuild({
        targets: ['Clean', 'Build'],
        toolsVersion: 14.0,
        properties: {
            AppxBundle: 'Always'
        }
    }));
});

gulp.task("build-windows-version", function () {
    var args = parseEnv();
    var buildNum = args.version.major + "." 
            + args.version.minor + "." 
            + args.version.revision + "."
            + args.version.build;
    return gulp.src('./src/app-universal/package.appxmanifest', { base: './' })
        .pipe(replace(/\sVersion=\"[^\"]+\"\s/, ' Version=\"' + buildNum + '\" '))
        .pipe(gulp.dest('./'));
});

gulp.task("test", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task("test-ci", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});