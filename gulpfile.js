const gulp = require('gulp');
const sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
const browsersync = require('browser-sync').create();
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Task to minify css using package cleanCSs
function minifyCss() {
    return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(cleanCSS())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./css'));

};

async function minifyJs() {
    gulp.src(['./js/**/*.js', '!./js/**/*.min.js', '!./js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./js'));
}

function minify() {
    minifyCss();
    minifyJs();
}

//compile sass into css

function style() {
    //Find css
    return gulp.src('./scss/**/*.scss')
        //Pass through sass compiler file
        .pipe(sass().on('error', sass.logError))
        //Save the compiled css
        .pipe(gulp.dest('./css'))
        //Stream changes to all browser
        .pipe(browsersync.stream());
}


function watch() {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./js/**/*.js').on('change', browsersync.reload);
    gulp.watch('./**/*.html').on('change', browsersync.reload);
}

exports.style = style;
exports.watch = watch;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;