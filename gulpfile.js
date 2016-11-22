'use strict';

var jekyll        = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    childprocess  = require('child_process'),
    runSequence   = require('run-sequence');

var sass          = require('gulp-sass'),
    combineMq     = require('gulp-combine-mq'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    shorthand     = require('gulp-shorthand'),
    bourbon       = require('node-bourbon').includePaths,
    neat          = require('node-neat').includePaths;

var cheerio       = require('gulp-cheerio'),
    svgstore      = require('gulp-svgstore'),
    svgmin        = require('gulp-svgmin'),
    path          = require('path');

var webPackStream = require('webpack-stream');

var browserSync   = require('browser-sync');

// Paths -----------------------------------------------------------------------

var source      = '.',
    destination = './_site';

// Build -----------------------------------------------------------------------

gulp.task('jekyll-build', function (done) {
  return childprocess.spawn( 'jekyll', ['build', '--config=_config_dev.yml'], {stdio: 'inherit'})
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
    },
    ghostMode: {
      clicks: false,
      scroll: false,
      forms: {
        submit: false,
        inputs: false,
        toggles: false
      }
    }
  });
});

// Sass ------------------------------------------------------------------------

gulp.task('stylesheets', function () {
  return gulp.src(source + '/src/stylesheets/**/*.{scss,sass}')
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat,
      precision: 6
    }).on('error', sass.logError))
    .pipe(combineMq())
    .pipe(shorthand())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(source + '/dist/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(destination + '/dist/css'));
});

// Scripts ---------------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src(source + '/src/scripts/**/*.js')
    .pipe(webPackStream(
      require('./webpack.config.js')
    ))
    .pipe(gulp.dest(source + '/dist/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(destination + '/dist/js'));
});

// Icons -----------------------------------------------------------------------

gulp.task('icons', function () {
  return gulp.src(source + '/src/icons/**/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          removeDoctype: true
        }, {
          removeComments: true
        }, {
          cleanupIDs: {
            prefix: prefix + '-',
            minify: false
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio(function ($) {
      $('[fill]').removeAttr('fill');
      $('svg').attr('display', 'none');
    }))
    .pipe(gulp.dest(source + '/_includes'));
});

// Fonts -----------------------------------------------------------------------

gulp.task('fonts', function() {
  return gulp.src(source + '/src/webfonts/**/*')
    .pipe(gulp.dest(source + '/dist/webfonts'))
    .pipe(gulp.dest(destination + '/dist/webfonts'));
});

// Watch -----------------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch(source + '/src/stylesheets/**/*.{scss,sass}', ['stylesheets']);
  gulp.watch(source + '/src/scripts/**/*.js', ['scripts']);
  gulp.watch(source + '/src/icons/**/*.svg', ['icons', 'jekyll-rebuild']);
  gulp.watch(source + '/**/*.{html,markdown,md}', ['jekyll-rebuild']);
})

// Default ---------------------------------------------------------------------

gulp.task('default', function(callback) {
  runSequence(['stylesheets', 'scripts', 'icons', 'fonts'], 'browser-sync', 'watch', callback);
});
