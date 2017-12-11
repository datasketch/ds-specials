const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const gulp = require('gulp');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const pump = require('pump');
const sourcemaps = require('gulp-sourcemaps');
const uglifycss = require('gulp-uglifycss');
const uglifyjs = require('gulp-uglify');

gulp.task('css', function(cb) {
	pump([
			gulp.src('./src/css/*.less'),
			sourcemaps.init(),
			less(),
			autoprefixer(),
			uglifycss(),
			sourcemaps.write('.'),
			gulp.dest('./dist/assets/css'),
			livereload()
		],
		cb
	);
});

gulp.task('js', function(cb) {
	pump([
			gulp.src('./src/js/*.js'),
			babel(),
			uglifyjs(),
			gulp.dest('./dist/assets/js'),
			livereload()
		],
		cb
	);
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/css/*.less', ['css']);
	gulp.watch('./src/js/*.js', ['js']);
})

gulp.task('default', ['css', 'js', 'watch']);