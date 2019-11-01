const gulp = require ('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-cssmin');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');


gulp.task ('bundle', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(concat('storage.min.js'))
        // .pipe(minify({
        //     noSource: true,
        //     ext:{
        //         src:'.js',
        //         min:'.min.js'
        //     },
        // }))
        .pipe(gulp.dest('dist'));
});

gulp.task ('css', function () {
    return gulp.src('styles/*.css')
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task ('lint', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


gulp.task('run', gulp.series('lint', 'bundle', 'css'));

gulp.task('watch', function () {
    gulp.watch('./styles/*.css', gulp.series('css'));
    // eslint-disable-next-line max-len
    gulp.watch(['*.js', '!gulpfile.js'], gulp.series('bundle'));
});

gulp.task('default', gulp.series('run', 'watch'));

