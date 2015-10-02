var gulp = require('gulp'),
    ngTemplate = require('gulp-ng-template'),
    concat = require('gulp-concat'),
    merge = require('gulp-merge'),
    karma = require('karma').server,
    less = require('gulp-less'),
    pkg = require('./package.json');

gulp.task('test', function () {
    karma.start({
        configFile: __dirname + '/karma.conf.ci.js'
    });
});

gulp.task('less', function() {
   gulp.src('./src/less/toasts.less')
      .pipe(less())
      .pipe(gulp.dest('./css'))
});

gulp.task('copy', function() {
   gulp.src('./src/less/toasts.less')
   .pipe(gulp.dest('./dist/less'));
});

gulp.task('buildjs', function () {

    var templates = gulp.src('./src/templates/**/*.html')
        .pipe(ngTemplate({
            moduleName: pkg.name
        }));

    return merge(gulp.src('./src/scripts/toastie.js'), templates)
        .pipe(concat(pkg.name + ".js"))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['less', 'buildjs', 'copy']);