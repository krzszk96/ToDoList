const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const imagemin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');



gulp.task("clean", function(){

    return del("dist/");

});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('autoprefixer', function(){
    gulp.src('src/css/*.css').pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    })).pipe(gulp.dest('dist/css'))
});

gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task("copy", function(){
   return gulp.src(["src/fonts/*"], {
      base: "src/"
   }).pipe(gulp.dest("dist/"));
});

gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task("watch", function(){

    gulp.watch("src/scss/*.scss", ["sass"]);
    gulp.watch("src/css/*.css", ["autoprefixer"]);
    gulp.watch("src/*/*", browserSync.reload);
    gulp.watch("src/*", browserSync.reload);

});


gulp.task("build:server", function(){

    browserSync.init({
        server: "src/"
    });

});

gulp.task("build", function(){
    runSequence("clean", "sass", "autoprefixer", "useref", "copy", "imagemin");
});

gulp.task("server", function(){
    runSequence("watch", "build:server");
});
