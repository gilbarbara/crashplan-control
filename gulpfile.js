/* jshint ignore:start */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var name = 'CrashPlanControl.alfredworkflow';

gulp.on('err', function (e) {
	$.util.log('Build failed: ', $.util.colors.red(e.err.message));
	process.exit(1);
});

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

gulp.task('build', ['info', 'scripts', 'images'], function () {
	return gulp.src('dist/*')
		.pipe($.zip(name))
		.pipe(gulp.dest('./'));
});

gulp.task('clean', function (cb) {
	return del(['dist/*', 'CrashPlanControl.alfredworkflow'], cb);
});

gulp.task('hooks', function () {
	del('.git/hooks/pre-commit');
	return gulp.src('.pre-commit')
		.pipe($.symlink('.git/hooks/pre-commit', { log: false }))

});

gulp.task('default', ['hooks', 'clean', 'build']);
