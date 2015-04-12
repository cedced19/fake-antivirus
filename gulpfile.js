var builder = require('node-webkit-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var colors = require('colors');

gulp.task('install', function () {
    require('child_process').exec('npm install', {cwd: './app'}, function (err, stdout, stderr) {
        return true;
    });
});

gulp.task('nw', ['install'], function () {

    var nw = new builder({
        files: './app/**/**',
        platforms: ['win32']
    });

    nw.on('log', function (msg) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', msg);
    });

    return nw.build().catch(function (err) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', err);
    });
});

gulp.task('default', ['nw'], function () {
    return gulp.src('build/Antivirus/win32/**/**')
        .pipe(zip('Windows.zip'))
        .pipe(gulp.dest('dist/'));
});
