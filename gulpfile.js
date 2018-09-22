var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();

// gulp task template 
// gulp.task('$taskName', function () {
//     return gulp.src('$filename.ext')    // Get source files with gulp.src
//         .pipe($plugin())                        // Sends it through a gulp plugin
//         .pipe(gulp.dest('$destinationFolder'))          // Outputs the file in the destination folder
// })

var paths = {
    dirs: {
        dist: {
            css: 'app/dist/css',
            html: 'app/dist/'
        },
        src: {
            allFiles: 'app/src/**/*',
            scss: 'app/src/scss',
            html: 'app/src/*.html'
        },
    },
    sass: 'app/src/scss/**/*.scss'
}

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app/dist'
        },
        port: 8080,
        open: false,
        notify: false,
    });
});

// build app files
gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(paths.dirs.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('html', function() {
    return gulp.src(paths.dirs.src.html)
        .pipe(gulp.dest(paths.dirs.dist.html))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('app', gulp.parallel('sass', 'html'));

gulp.task('build', gulp.series('app', 'browserSync'));

gulp.task('refresh', function(refreshed) {
    browserSync.reload()
    refreshed();
})

gulp.task('watch', function () {
    gulp.watch(paths.dirs.src.allFiles, gulp.series('app', 'refresh'));
})

gulp.task('start', gulp.parallel('build', 'watch'));