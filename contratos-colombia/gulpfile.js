const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const path = require('path')
const pug = require('gulp-pug')
const pump = require('pump')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const uglifyjs = require('gulp-uglify')
const webserver = require('gulp-webserver')

const vendors = path.join(__dirname, 'dist/vendors/')

gulp.task('vendors', function () {
  gulp.src('./node_modules/vue/dist/vue.min.js')
    .pipe(gulp.dest(vendors))

  gulp.src('./node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js')
    .pipe(rename('scrollmagic.min.js'))
    .pipe(gulp.dest(vendors))

  gulp.src('./node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
    .pipe(rename('debug.min.js'))
    .pipe(gulp.dest(vendors))
})

gulp.task('css', function (cb) {
  pump([
    gulp.src('./src/css/*.scss'),
    sass(),
    autoprefixer(),
    uglifycss(),
    gulp.dest('./dist/assets/css')
  ], cb)
})

gulp.task('js', function (cb) {
  pump([
    gulp.src('./src/js/*.js'),
    babel(),
    uglifyjs(),
    gulp.dest('./dist/assets/js')
  ], cb)
})

gulp.task('views', function (cb) {
  pump([
    gulp.src('./src/views/*.pug'),
    pug(),
    gulp.dest('./dist')
  ], cb)
})

gulp.task('webserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true,
      port: 5000
    }))
})

gulp.task('watch', function () {
  gulp.watch('./src/css/**/*.scss', ['css'])
  gulp.watch('./src/js/*.js', ['js'])
  gulp.watch('./src/views/**/*.pug', ['views'])
})

gulp.task('development', ['webserver', 'watch'])

gulp.task('default', ['vendors', 'css', 'js', 'views'])