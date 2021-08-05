'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		formatHtml  = require('gulp-format-html'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		cleanCSS = require('gulp-clean-css'),
		sourcemaps = require('gulp-sourcemaps'),
		clean = require('gulp-clean');

var path = {
	app: {
		pug: './app/pug/**/*.pug',
		html: './app/',
		sass: './app/sass/**/*.sass',
		css: './app/css/',
		gulpfile: './gulpfile.js',
		js: './app/js/',
		jsLibs: ['./app/libs/smartmenus/jquery.smartmenus.min.js', './app/libs/slick-carousel/slick/slick.min.js'],
		cssLibs: ['./app/libs/smartmenus/css/sm-core-css.css', './app/libs/smartmenus/css/sm-clean/sm-clean.css', './app/libs/slick-carousel/slick/slick.css'],
		deleteLibs: ['./app/js/libs.js', './app/css/libs.css']
	}
}

// Compile pug to html
gulp.task('pug', function() {
	return gulp.src(path.app.pug)
	.pipe(pug())
	.pipe(formatHtml())
	.pipe(gulp.dest(path.app.html))
	.pipe(browserSync.reload({stream: true}));

});


// Compile sass to css with autoprefixer
gulp.task('sass', function() {
	return gulp.src(path.app.sass)
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer ({
		overrideBrowserslist: ['last 2 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(path.app.css))
	.pipe(browserSync.reload({stream: true}))
});

// Task for browser-sync | auto-reload
gulp.task('browser-sync', function() { 
	browserSync({
		server: {
			baseDir: './app/'
		},
		notify: false
	});
});

// Auto reload browser on change js files
gulp.task('scripts', function() {
	return gulp.src(path.app.gulpfile)
	.pipe(browserSync.reload({ stream: true }))
});

// Delete libs files
gulp.task('clean-libs', function () {
	return gulp.src(path.app.deleteLibs)
			.pipe(clean());
});
gulp.task('prod', function () {
	return gulp.src(['./app/**'])
			.pipe(gulp.dest('./dist/'));
});
gulp.task('clean-prod', function () {
	return gulp.src(['./dist/libs/', './dist/sass/', './dist/pug/'])
		.pipe(clean());
});
gulp.task('clean-dist', function () {
	return gulp.src(['./dist/*'])
		.pipe(clean());
});

// Concat js libraries
gulp.task('concat-js', function() {
	return gulp.src(path.app.jsLibs)
	.pipe(concat('libs.js'), { allowEmpty: true })
	.pipe(gulp.dest(path.app.js))
	.pipe(browserSync.reload({stream: true}))
});

// Concat css libraries files
gulp.task('concat-css', function() {
	return gulp.src(path.app.cssLibs)
	.pipe(concat('libs.css'), { allowEmpty: true })
	.pipe(cleanCSS({compatibility: 'ie10'}))
	.pipe(gulp.dest(path.app.css))
	.pipe(browserSync.reload({stream: true}))
});

// Work without auto reload
gulp.task('watch', function () {
	gulp.watch(path.app.sass, gulp.series('sass'))
	gulp.watch(path.app.pug, gulp.series('pug'))
	gulp.watch([path.app.gulpfile, path.app.js], gulp.series('scripts'))
});
// Work with auto reload
gulp.task('start', gulp.parallel('browser-sync', 'watch'));