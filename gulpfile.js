var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();

// gulp task template 
// gulp.task('$taskName', function () {
//     return gulp.src('$filename.ext')    // Get source files with gulp.src
//         .pipe($plugin())                        // Sends it through a gulp plugin
//         .pipe(gulp.dest('$destinationFolder'))          // Outputs the file in the destination folder
// })

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        files: [ // filetypes to watch for:
            '**/*.css',
            '**/*.js',
            '**/*.svg',
            '**/*.xml',
            '**/*.html'
            // etc...
        ]
    });
});

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// tasks to watch:
gulp.task('watch', gulp.series('browserSync', 'sass'), function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
})

// build tasks
gulp.task(
    'build', 
    gulp.series( 'sass' )
    );
