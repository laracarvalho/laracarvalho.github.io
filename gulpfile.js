//////////////////////////////
///////// Gulp File /////////
////////////////////////////

/* 			-- COMMON GULP FUNCTIONS --
	
	gulp.task -- Define tasks Gulp should operate.
	gulp.src -- Direct Gulp to files it should use.
	gulp.dest -- Folder it outputs.
	gulp.watch -- Watch files and folders for changes.
*/


///// MODULES /////

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

///// TASKS /////

// Compiling SCSS to CSS

gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(cssnano())
    	.pipe(gulp.dest('dist/css'));
});

// Minifying JavaScript

gulp.task('minify', function() {
	gulp.src('src/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('scripts'));
});

// Image Minifying and Optimization

gulp.task('imagemin', function() {
	gulp.src('imgs/*')
		.pipe(imagemin())
		.pipe(gulp.dest('imgs'))
});


gulp.task('cssnano', function() {
	return gulp.src('styles/normalize.css')
		.pipe(cssnano())
		.pipe(gulp.dest('styles'))
});

// Browser Sync & Live Reload

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

///// WATCH FILES /////
 
gulp.task('watch', function() {
	gulp.watch('styles/*.sass', ['sass']);
	gulp.watch('scripts/*.js', ['minify']);
	gulp.watch('imgs/*', ['imagemin']);
});

///// DEFAULT /////

gulp.task('default', ['browserSync'], function() {
	gulp.watch('styles/*.sass', ['sass']);
	gulp.watch('scripts/*.js', ['minify']);
	gulp.watch('imgs/*', ['imagemin']);
});
