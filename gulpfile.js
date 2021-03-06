'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: '../1077409-kekstagram-20/',
    }
  });

  gulp.watch('*.html').on('change', reload);
  gulp.watch('js/*.js').on('change', reload);
});
