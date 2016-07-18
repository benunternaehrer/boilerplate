'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    combineMq = require('gulp-combine-mq'),
    concat = require('gulp-concat'),
    htmlreplace = require('gulp-html-replace'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    yaml = require('gulp-yaml'),
    modernizr = require('gulp-modernizr'),
    notifier = require('node-notifier');

// SASS DEV
gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 10'))
        .pipe(gulp.dest('./web/css'));
});

// SASS BUILD
gulp.task('sassmin', ['sass'], function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(combineMq({beautify: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./web/css'));
});

// JS DEV
gulp.task('scripts', function() {
    return gulp.src(['./js/plugins/*.js','./js/_main.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./web/js/'));
});

// JS BUILD
gulp.task('scriptsmin', ['scripts'], function() {
    return gulp.src('./web/js/scripts.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./web/js/'));
});

// MODERNIZR
gulp.task('modernizr', function() {
    return gulp.src('./js/_main.js')
        .pipe(modernizr({
            excludeTests: [''],
                options: ['setClasses'],
                // tests: ['csstransforms3d', 'flexbox', 'flexboxlegacy', 'flexwrap', 'touchevents', 'pointerevents']
        }))
        .pipe(rename('./modernizr.js'))
        .pipe(gulp.dest('./js/plugins/'));
});

// YAML TO JSON
gulp.task('yaml', function() {
    return gulp.src('./data/*.yml')
        .pipe(yaml({ space: 4 }))
        .pipe(gulp.dest('./data/'));
});


// CREATE A RANDOM VERSION NUMBER
function makeid()
{
    var text = '';
    var possible = '0123456789';

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// CHANGE CSS AND JS SRC BETWEEN DEV AND PRODUCTION, ADD/REMOVE LIVERELOAD
var liveReloadString = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>";

gulp.task('cssJsProduction', function() {
    gulp.src('./views/base.html.twig')
        .pipe(htmlreplace({
            css: {
                src: 'css/main.min.css?' + makeid(),
                tpl: '<link rel="stylesheet" href="%s">'
            },
            js: {
                src: 'js/scripts.min.js?' + makeid(),
                tpl: '<script src="%s"></script>'
            },
            liveReload: {
                src: '',
                tpl: '%s'
            }
        }, {keepBlockTags: true}))
        .pipe(gulp.dest('./views/'));
});

gulp.task('cssJsProductionWatch', function() {
    gulp.src('./views/base.html.twig')
        .pipe(htmlreplace({
            css: {
                src: 'css/main.min.css?' + makeid(),
                tpl: '<link rel="stylesheet" href="%s">'
            },
            js: {
                src: 'js/scripts.min.js?' + makeid(),
                tpl: '<script src="%s"></script>'
            },
            liveReload: {
                src: liveReloadString,
                tpl: '%s'
            }
        }, {keepBlockTags: true}))
        .pipe(gulp.dest('./views/'));
});

gulp.task('cssJsDevelopment', function() {
    gulp.src('./views/base.html.twig')
        .pipe(htmlreplace({
            css: {
                src: 'css/main.css',
                tpl: '<link rel="stylesheet" href="%s">'
            },
            js: {
                src: 'js/scripts.js',
                tpl: '<script src="%s"></script>'
            },
            liveReload: {
                src: liveReloadString,
                tpl: '%s'
            }
        }, {keepBlockTags: true}))
        .pipe(gulp.dest('./views/'));
});



// TASKS
gulp.task('default', ['sassmin', 'modernizr', 'scriptsmin', 'yaml', 'cssJsProduction'], function() {
    notifier.notify({ title: 'Production Build', message: 'Done' });
});
gulp.task('build', ['sassmin', 'modernizr', 'scriptsmin', 'yaml', 'cssJsProduction'], function() {
    notifier.notify({ title: 'Production Build', message: 'Done' });
});
gulp.task('dev', ['sass', 'scripts', 'yaml', 'cssJsDevelopment'], function() {
    notifier.notify({ title: 'Development Build', message: 'Done' });
});


// WATCH DEV + LIVERELOAD
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('./scss/**', ['sass']);

    // Watch .js files
    gulp.watch('./js/_main.js', ['scripts']);

    // Watch Yaml files
    gulp.watch('./data/**', ['yaml']);

    // Create LiveReload server
    livereload.listen();

    // Watch any changed files, reload on change
    gulp.watch(['./web/css/*','./web/js/*','./data/**','./views/**']).on('change', livereload.changed);
});


// WATCH BUILD + LIVERELOAD
gulp.task('watchbuild', function() {

    // Watch .scss files
    gulp.watch('./scss/**', ['sassmin', 'cssJsProductionWatch']);

    // Watch .js files
    gulp.watch('./js/_main.js', ['scriptsmin', 'cssJsProductionWatch']);

    // Watch Yaml files
    gulp.watch('./data/**', ['yaml']);

    // Create LiveReload server
    livereload.listen();

    // Watch any changed files, reload on change
    gulp.watch(['./web/css/*','./web/js/*','./data/**','./views/**']).on('change', livereload.changed);
});
