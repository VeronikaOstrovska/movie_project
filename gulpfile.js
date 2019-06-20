const gulp = require('gulp'),
      webserver = require('gulp-webserver'),
      less = require('gulp-less'),
      imagemin = require('gulp-imagemin'); // Сжатие изображений
      livereload = require('gulp-livereload');
      connect = require('gulp-connect');
      watch = require('gulp-watch');

//Запуск вебсервера
gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: false,
      port:8002,
      open: true
    }));
});

// Копирование HTML-файлов в папку build
gulp.task("html", function() { 
    return gulp.src("html/*.html")
    .pipe(gulp.dest("build"));
    .pipe(connect.reload());
});

//Компиляция Less в Css
gulp.task('less', function () {
    return gulp.src('html/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'));
        .pipe(connect.reload());
});

// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src("html/images/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("build/images"));
        .pipe(connect.reload());
});


// Задача слежения за измененными файлами
gulp.task("watch", function() {
    gulp.watch("html/*.html", ["html"]);
    gulp.watch("html/less/*.less", ["less"]);
    gulp.watch("html/images/*.+(jpg|jpeg|png|gif)", ["imgs"]);
});

gulp.task(
  'default',
  gulp.series([
  
    'html', 'less', 'imgs', 'webserver', 'watch'
  ])
);
