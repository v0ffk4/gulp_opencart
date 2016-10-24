//define components


var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),

	//html processing
	htmlmin = require('gulp-html-minifier'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	precss = require('precss'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),

	//define directories
	themeDirectory = 'opencart/catalog/view/theme/YOUR_THEME_NAME',
	dev = 'dev/',
	devCSS = 'dev/css/',
	devJS = 'dev/js/'


//copy & minify php

/*
gulp.task('php', function() {

	gulp.src(dev + '*.php')
		.pipe(htmlmin({
			collapseWhitespace: false,
			includeAutoGeneratedTags: false, //prevents autoclosing tags
			minifyCSS: true,
			minifyJS: true
		}))
		.pipe(gulp.dest(themeDirectory))
		.pipe(livereload());

});
*/

gulp.task('tpl', function () {
	gulp.src(dev + '/template/**/*.tpl')
	.pipe(gulp.dest(themeDirectory + '/template'));
	.pipe(livereload());
});


//compile SASS synthax / minify
gulp.task('cssPrep', function() {

	gulp.src(devCSS + 'stylesheet.css')
		.pipe(postcss([
			precss(),
			autoprefixer(),
			cssnano()
	]))

	.on('error', gutil.log)
		.pipe(gulp.dest(themeDirectory + '/stylesheet'))
		.pipe(livereload());

});


//concatinate & minify & rename javascript
gulp.task('jsConcat', function(){

	gulp.src(devJS + '*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(themeDirectory + '/js'))
		.pipe(livereload());

});


//watch & process
gulp.task('watch', function() {

	livereload.listen();
	gulp.watch(devCSS + '**/*.css', ['cssPrep']);
	gulp.watch(dev + '**/*.tpl', ['tpl']);
	gulp.watch(devJS + '*.js', ['jsConcat']);

});


gulp.task( 'default', [ 'tpl', 'cssPrep', 'jsConcat', 'watch' ] );