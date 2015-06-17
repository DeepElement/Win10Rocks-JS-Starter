var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    mocha = require("gulp-mocha"),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    baseBuildFile = require('../gulpfile');


gulp.task("win10-build", 
    function(cb){
       runSequence( "clean", "win10-version", "win10-package", "win10-deploy", cb); 
    });

gulp.task("win10-version", function () {
    var args = baseBuildFile.parseEnv();
    var buildNum = args.version.major + "."
        + args.version.minor + "."
        + args.version.revision + "."
        + args.version.build;
    return gulp.src('./src/**/package.appxmanifest', { base: './' })
        .pipe(replace(/\sVersion=\"[^\"]+\"\s/, ' Version=\"' + buildNum + '\" '))
        .pipe(gulp.dest('./'));
});

gulp.task("win10-package", function () {
    return gulp.src("./Win10Rocks-JS-Starter-Win10.sln")
        .pipe(msbuild({
        targets: ['Clean', 'Build'],
        toolsVersion: 14.0,
        properties: {
            AppxBundle: 'Always'
        }
    }));
});

gulp.task("win10-deploy", function () {
   gulp.src('./src/app-universal/AppPackages/**/*')
   .pipe(gulp.dest('./publish/win10'));
});
