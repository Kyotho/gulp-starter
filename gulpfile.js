const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer');

function style() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(plumber())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(['./js/**/*.js', '!./js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({ stream: true }));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', scripts);
}

exports.style = style;
exports.scripts = scripts;
exports.watch = watch;
