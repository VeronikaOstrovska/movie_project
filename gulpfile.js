const gulp = require('gulp');
const webserver = require('gulp-webserver');


gulp.task('webserver', function() {
  gulp.src('html/')
    .pipe(webserver({
      livereload: false,
      port:8002,
      open: true
    }));
});




gulp.task(
  'default',
  gulp.series([
  
    'webserver'
  ])
);
