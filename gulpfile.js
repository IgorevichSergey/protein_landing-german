var gulp = require('gulp');
var connect = require("gulp-connect");
var concat = require('gulp-concat');
var cssconcat = require('gulp-concat-css');
var runSequence = require('run-sequence');
var uncss = require('gulp-uncss');

var config = {
    BOWER_SCRIPTS: [
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/bootstrap/dist/js/bootstrap.min.js"
    ],
    BOWER_CSS: [
        "./bower_components/bootstrap/dist/css/bootstrap.min.css"
    ],
    CSS: [
        "./app/**/*.css"
    ]
};

gulp.task('bower_css_min', function () {
    gulp.src(config.BOWER_CSS)
        .pipe(cssconcat('bower.css'))
        .pipe(gulp.dest('./production/css'));
});


gulp.task('css_min', function () {
    gulp.src(config.CSS)
        .pipe(cssconcat('app.css'))
        .pipe(gulp.dest('./production/css'));
});

gulp.task('copy_html', function(){
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./production'))
        .pipe(connect.reload())
});
gulp.task('bower_scripts_min',function () {
    gulp.src(config.BOWER_SCRIPTS)
        .pipe(concat('bower-components.min.js'))
        .pipe(gulp.dest('./production/js'))
});
gulp.task('copy_other', function () {
    gulp.src('./fonts/**')
        .pipe(gulp.dest('./production/fonts'));
    gulp.src('./images/**')
        .pipe(gulp.dest('./production/images'));
});

gulp.task('build', function(){
    runSequence('bower_css_min', 'css_min', 'bower_scripts_min', 'copy_other', 'copy_html',function() {
    });

});

gulp.task('watch', function () {
    gulp.watch([
        './app/*.html',
        './app/style.css'
    ], ['build']);
});
gulp.task('connect', function(){
    connect.server({
        root: 'production',
        livereload: true,
        port: 8000
    })
});
//, 'watch',
gulp.task('default', [ 'connect', 'build', 'watch']);
gulp.task('build_project', ['build']);
