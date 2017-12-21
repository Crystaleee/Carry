const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const scripts = require("./scripts");
const styles = require("./styles");

var depMode = false;

gulp.task('css', function(){
   gulp.src(styles)
       .pipe(concat('main.css'))
       .pipe(gulp.dest('./css/'))
       .pipe(browserSync.reload({
         stream: true
       }));
});

gulp.task('js', function(){
  gulp.src(scripts)
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./js/'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('html', function(){
  gulp.src("./html/**/*.html")
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('build', function(){
  gulp.start(['css','js','html']);
});

gulp.task('browserSync', function(){
  browserSync.init(null,{
    open:false,
    server:{
      baseDir:'.',
      directory: true,
      index: "./html/index.html",
      routes: {
        "/dva-mvn": "."
      }
    }
  });
});

gulp.task('start',function(){
  depMode = true;
  gulp.start(['build', 'browserSync']);
  gulp.watch(['./css/custom/**/*.css'],['css']);
  gulp.watch(['./js/custom/**/*.js'],['js']);
  gulp.watch(['./html/**/*.html'],['html']);
});
