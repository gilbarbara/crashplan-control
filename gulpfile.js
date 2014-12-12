/* jshint ignore:start */
var gulp = require('gulp');
var zip = require('gulp-zip');
var clean = require('gulp-clean');

var name = 'CrashPlanControl.alfredworkflow'

gulp.task('info', function () {
	return gulp.src('info.plist')
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
	return gulp.src('scripts/*.sh')
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
	return gulp.src('images/*.png')
		.pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
	return gulp.src('dist/*')
		.pipe(zip(name))
		.pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
	return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('default', ['info', 'scripts', 'images', 'build']);
