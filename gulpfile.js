const gulp            = require('gulp');
const browserSync     = require('browser-sync').create();
const sass            = require('gulp-sass');
const watch           = require('gulp-watch');
const autoprefixer    = require('gulp-autoprefixer');
const sourcemaps      = require('gulp-sourcemaps');
const plumber         = require('gulp-plumber');
const concat          = require('gulp-concat');
const uglify          = require('gulp-uglify');
const rename          = require('gulp-rename');
const webpack         = require('webpack');
const gutil           = require('gulp-util');


const handleError = function(err) {
    console.log(gutil.colors.red(err.toString()));
    this.emit('end');
}


gulp.task('browseSync', function() {
    browserSync.init({
        server: "./dist",
        notify: false,
        host: '192.168.0.24',
        open: true
    });
});


gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ["> 1%"]
        }))
        .pipe(rename({
            suffix: '.min',
            basename: 'style'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream({match: '**/*.css'}));
});


gulp.task('es6', function(cb) {
    return webpack(require('./webpack.config.js'), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        cb();
    })
})


gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['es6']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});


gulp.task('default', function() {
    console.log(gutil.colors.yellow('======================= start ======================='));
    gulp.start(['sass', 'es6', 'browseSync', 'watch']);
});
