var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    path = require("path"),
    glob = require("glob"),
    MetroNode = require('metronode');

gulp.task("web-build",
    function (cb) {
        runSequence("clean", "web-deploy", "web-metronode-compile", "web-browserify-compile", cb);
    });


gulp.task("web-metronode-compile", function (cb) {
    var that = this;
    var sourcePath = path.join(__dirname, '..', 'src', 'common');
    glob(path.join(sourcePath + "/**/*.js"), function (err, files) {
        if (err)
            return cb(err);
            
        var instance = new MetroNode({
            sourceRoot: path.join(__dirname, '..', 'src', 'common'),
            env: process.env,
            packageRoot: path.join(__dirname, '..'),
            sourceFiles: files,
        });
        instance.exportToFile(path.join(__dirname, '..', 'publish', 'web', '.metro.node.cache.js'), cb);
    });
});


gulp.task("web-browserify-compile", function () {
    return gulp.src('./publish/web/.metro.node.cache.js')
        .pipe(browserify({
        standalone: "MetroNode"
    }))
        .pipe(rename('.metro.node.js'))
        .pipe(gulp.dest('./publish/web'));
});

gulp.task("web-deploy", function () {
    return gulp.src(['./src/app-web/**/*', './src/ui-winjs/**/*'])
        .pipe(gulp.dest('./publish/web'));
});

gulp.task("web-host", function () {
    return connect.server({
        root: './publish/web',
        livereload: true
    });
});
