const gulp = require('gulp'),
      webserver = require('gulp-webserver'),
      less = require('gulp-less'),
      imagemin = require('gulp-imagemin'); // Сжатие изображений
      livereload = require('gulp-livereload');
      connect = require('gulp-connect');
      watch = require('gulp-watch');


const path = {
  src: {
    html: 'html/*.html',
    less: 'html/less/*.less',
    imgs: 'html/images/*.+(jpg|jpeg|png|gif)'
  },
  build: {
    html: 'build/',
    css: 'build/css/',
    imgs: 'build/images/'
  }, 
  watch: {
    html: 'html/*.html',
    less: 'html/less/*.less',
    imgs: 'html/images/*.+(jpg|jpeg|png|gif)'
  }
};

path.src.less

//Запуск вебсервера
gulp.task('webserver', function() {
  gulp.src(path.build.html)
    .pipe(webserver({
      livereload: false,
      port:8002,
      open: true
    }));
});

// Копирование HTML-файлов в папку build
gulp.task("html", function() { 
    return gulp.src(path.src.html)
          .pipe(gulp.dest(path.build.html))
          .pipe(connect.reload());
});

//Компиляция Less в Css
gulp.task('less', function () {
    return gulp.src(path.src.less)
        .pipe(less())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src(path.src.imgs)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.imgs))
        .pipe(connect.reload());
});


// Задача слежения за измененными файлами
gulp.task("watch", function() {
    gulp.watch(path.watch.html, gulp.series([
    'html']));
    gulp.watch(path.watch.less, gulp.series(["less"]));
    gulp.watch(path.watch.imgs, gulp.series(["imgs"]))
});

gulp.task(
  'default',
  gulp.series([
  
    'html', 'less', 'imgs', 'watch'
  ])
);
