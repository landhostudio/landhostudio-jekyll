'use strict';

var jekyll        = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    childprocess  = require('child_process');

var sass          = require('gulp-sass'),
    combineMq     = require('gulp-combine-mq'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    shorthand     = require('gulp-shorthand'),
    bourbon       = require('node-bourbon').includePaths,
    neat          = require('node-neat').includePaths;

var webPackStream = require('webpack-stream');

var browserSync   = require('browser-sync');

// Paths -----------------------------------------------------------------------

var source = './src';
var destination = './dist';

// Build -----------------------------------------------------------------------

gulp.task('jekyll-build', function (done) {
  return childprocess.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild ---------------------------------------------------------------------

gulp.task('jekyll-rebuild', ['jekyll-build'] ,function () {
  browserSync.reload();
});

// BrowserSync -----------------------------------------------------------------

gulp.task('browser-sync', ['jekyll-build'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: destination
    }
  });
});

// Sass ------------------------------------------------------------------------

gulp.task('stylesheets', function () {
  return gulp.src(source + '/_stylesheets/**/*.{scss,sass}')
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat,
      precision: 6
    }).on('error', sass.logError))
    .pipe(combineMq())
    .pipe(shorthand())
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(source + '/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(destination + '/css'));
});

// Scripts ---------------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src(source + '/_scripts/**/*.js')
    .pipe(webPackStream(
      require('./webpack.config.js')
    ))
    .pipe(gulp.dest(source + '/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(destination + '/js'));
});

// Watch -----------------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch(source + '/_stylesheets/**/*.{scss,sass}', ['stylesheets']);
  gulp.watch(source + '/_scripts/**/*.js', ['scripts']);
  gulp.watch(source + '/**/*.{html,md}', ['jekyll-rebuild']);
})

// Default ---------------------------------------------------------------------

gulp.task('default', function() {
  gulp.start('stylesheets', 'scripts', 'browser-sync', 'watch');
});
