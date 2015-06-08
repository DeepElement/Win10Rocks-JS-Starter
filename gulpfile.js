var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha");

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("build-win10", function () {
    return gulp.src("./Win10Rocks-JS-Starter.sln")
        .pipe(msbuild({
        targets: ['Clean', 'Build'],
        toolsVersion: 14.0,
        properties: {
            AppxBundle: 'Always'
        }
    }));
});

gulp.task("test", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task("test-ci", function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});