'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('default', function () {
    var c = {
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        green: '\x1b[32m',
        magenta: '\x1b[35m'
    };

    console.log('');
    console.log(c.green + c.bold + 'Main Commands' + c.reset);
    console.log(c.green + '-------------------------------------------' + c.reset);
    console.log(c.green + 'clean' + c.reset + ' - clean destination files');
    console.log(c.green + 'build' + c.reset + ' - build destination files.');
    console.log('');
    console.log(c.green + c.bold + 'All Commands' + c.reset);
    console.log(c.green + '-------------------------------------------' + c.reset);
    console.log(Object.keys(gulp.tasks).sort().join('\n'));
    console.log('');
    return;
});

gulp.task('build:styles', function () {
    return gulp.src([
            'src/css/*.less'
        ])
        .pipe($.plumber())
        .pipe($.concat('chara.css'))
        .pipe($.less())
        .pipe($.autoprefixer({ browsers: ['> 1%'] }))
        .pipe($.size({ title: 'CSS:' }))
        .pipe(gulp.dest('css'));
});

gulp.task('build:scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe($.plumber())
        .pipe($.concat('chara.js'))
        .pipe($.babel({presets: ['env']}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size({ title: 'JS:' }))
        .pipe(gulp.dest('js'));
});

gulp.task('build:scripts:min', ['build:scripts'], function () {
    return gulp.src('js/*.js')
        .pipe($.plumber())
        .pipe($.uglify({
            preserveComments: 'license'
        }))
        .pipe($.rename({extname: ".min.js"}))
        .pipe($.size({ title: 'JS min:' }))
        .pipe(gulp.dest('js'));
});

gulp.task('build', ['clean'], function (done) {
    return gulp.start(['build:styles', 'build:scripts:min']);
});

gulp.task('clean', function () {
    return del(['css/', 'js/']);
});