const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const pug = require('gulp-pug')
const pump = require('pump')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const uglifyjs = require('gulp-uglify')
const webserver = require('gulp-webserver')

gulp.task('js', function (cb) {
  pump([
    gulp.src('./src/js/*.js'),
    babel(),
    uglifyjs(),
    gulp.dest('./dist/assets/js')
  ], cb)
})

gulp.task('scss', function (cb) {
  pump([
    gulp.src('./src/scss/*.scss'),
    sass(),
    uglifycss(),
    gulp.dest('./dist/assets/css')
  ], cb)
})

gulp.task('views', function (cb) {
  pump([
    gulp.src('./src/views/*.pug'),
    pug(),
    gulp.dest('./dist')
  ], cb)
})

gulp.task('media', function () {
  return gulp.src('./src/media/**/*.*')
    .pipe(gulp.dest('./dist/assets/media'))
})

gulp.task('webserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true,
      port: 8080
    }))
})

gulp.task('watch', function () {
  gulp.watch('./src/js/*.js', ['js'])
  gulp.watch('./src/scss/**/*.scss', ['scss'])
  gulp.watch('./src/views/**/*.pug', ['views'])
  gulp.watch('./src/media/**/*.*', ['media'])
})

gulp.task('development', ['webserver', 'watch'])
gulp.task('default', ['js', 'scss', 'views', 'media'])
