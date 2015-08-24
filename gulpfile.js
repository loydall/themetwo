"use strict";

var gulp        = require('gulp'); 
var mbf         = require('main-bower-files');
var concat      = require('gulp-concat');
var swig        = require('gulp-swig');
var sass        = require('gulp-sass');
var minifycss   = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

gulp.task('bower', function () {  
  gulp.src(mbf({includeDev: true}).filter(function (f) { return f.substr(-2) === 'js'; }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js/'));
});


 
gulp.task('templates', function() {
  gulp.src('./src/templates/*.html')
    .pipe(swig())
    .pipe(gulp.dest('./dist/'));
});

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

/* Vendor CSS */
gulp.task('vendorcss', function(){
    gulp.src('./bower_components/foundation/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css/vendor'));
});