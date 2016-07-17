var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./from_scratch/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./from_scratch/assets/css/'));
});

gulp.task('watch',function() {
    gulp.watch('./from_scratch/assets/sass/**/*.scss',['sass']);
});
// Default Task
gulp.task('default', ['watch']);