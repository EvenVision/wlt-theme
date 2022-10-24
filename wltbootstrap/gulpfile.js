'use strict';

var gulp = require('gulp');
var plumber          = require('gulp-plumber');
var sass             = require('gulp-sass');
var sassGlob         = require('gulp-sass-glob');
var sourcemaps       = require("gulp-sourcemaps");
var stripCssComments = require('gulp-strip-css-comments');
var notify           = require("gulp-notify");
var autoprefixer     = require('gulp-autoprefixer');
var browserSync      = require('browser-sync').create();
var concat           = require('gulp-concat');


var $icons = [
  './node_modules/slick-carousel/slick/ajax-loader.gif'
];

var $fonts = [
  './node_modules/slick-carousel/slick/fonts/slick.woff'
];

/* Fonts */
gulp.task('fonts', function () {
  return  gulp.src($fonts)
    .pipe(gulp.dest('./dist/fonts'));
});

/* Icons */
gulp.task('icons', function () {
  return  gulp.src($icons)
    .pipe(gulp.dest('./dist'));
});

/* Main SASS task */
gulp.task('css', function () {
  return gulp.src([
    './node_modules/slick-carousel/slick/slick-theme.scss',
    './node_modules/slick-carousel/slick/slick.scss',
    './node_modules/select2/dist/css/select2.css',
    './sass/*.s*ss'
  ])
    .pipe(plumber(({
      errorHandler: notify.onError('SASS error: <%= error.message %>')
    })))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }))
    .pipe(sass.sync())
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

/* Task for Js concat */
gulp.task('js', function() {
  return gulp.src([
    './node_modules/slick-carousel/slick/slick.js',
    './node_modules/select2/dist/js/select2.full.js',
    './node_modules/jquery.nicescroll/dist/jquery.nicescroll.js',
    './js/custom.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'));
});

/* Task for watch */
gulp.task('watch', function() {
  gulp.watch('./sass/*.s*ss', gulp.series('css')),
    gulp.watch('./js/custom.js', gulp.series('js'));
  return;
});
