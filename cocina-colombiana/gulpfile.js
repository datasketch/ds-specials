const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const livereload = require('gulp-livereload');

gulp.task('autoprefixer', function() {
	return gulp.src('./src/css/*.css')
			.pipe(sourcemaps.init())
			.pipe(postcss([autoprefixer()]))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./assets/css'))
			.pipe(livereload());
})

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/css/*.css', ['autoprefixer']);
})

gulp.task('default', ['autoprefixer']);