const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const gulp = require('gulp');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('autoprefixer', function() {
	return gulp.src('./src/css/*.less')
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./assets/css'))
			.pipe(livereload());
})

gulp.task('babel', function() {
	return gulp.src('./src/js/*.js')
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./assets/js'))
			.pipe(livereload());
})

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/css/*.less', ['autoprefixer']);
	gulp.watch('./src/js/*.js', ['babel']);
})

gulp.task('default', ['autoprefixer', 'babel', 'watch']);