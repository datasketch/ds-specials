const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const gulp = require('gulp');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const pug = require('gulp-pug');
const pump = require('pump');
const uglifycss = require('gulp-uglifycss');
const uglifyjs = require('gulp-uglify');

gulp.task('css', function(cb) {
	pump([
			gulp.src('./src/css/*.less'),
			less(),
			autoprefixer(),
			uglifycss(),
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

gulp.task('views', function(cb) {
	pump([
			gulp.src('./src/views/*.pug'),
			pug(),
			gulp.dest('./dist'),
			livereload()
		],
		cb
	);
})

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/css/*.less', ['css']);
	gulp.watch('./src/js/*.js', ['js']);
	gulp.watch('./src/views/**/*.pug', ['views'])
})

gulp.task('default', ['css', 'js', 'views', 'watch']);