var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence');


gulp.task("build-win10", 
    function(cb){
       runSequence( "clean", "build-windows-version", "build-win10-package", "build-win10-deploy", cb); 
    });
    

gulp.task("build-win10-package", function () {
    return gulp.src("./Win10Rocks-JS-Starter-Win10.sln")
        .pipe(msbuild({
        targets: ['Clean', 'Build'],
        toolsVersion: 14.0,
        properties: {
            AppxBundle: 'Always'
        }
    }));
});

gulp.task("build-win10-deploy", function () {
   gulp.src('./src/app-universal/AppPackages/**/*')
   .pipe(gulp.dest('./publish/win10'));
});
