var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence');
    

gulp.task("build-win8.1", 
    function(cb){
       runSequence( "clean", "build-windows-version", "build-win8.1-package", "build-win8.1-deploy", cb); 
    });

gulp.task("build-win8.1-package", function () {
    return gulp.src("./Win10Rocks-JS-Starter-win8.1.sln")
        .pipe(msbuild({
        targets: ['Clean', 'Build'],
        toolsVersion: 14.0,
        properties: {
            AppxBundle: 'Always'
        }
    }));
});

gulp.task("build-win8.1-deploy", function () {
   gulp.src('./src/app-win8.1/AppPackages/**/*')
   .pipe(gulp.dest('./publish/win8.1'));
});
