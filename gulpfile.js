const gulp = require('gulp');
//编译less=>css
//gulp-less
const less = require('gulp-less');
//编译es6=>es5
//gulp-babel，babel-preset-es2015
const babel = require('gulp-babel');

//delete browser-sync

gulp.task('less', () => {
    gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('static/css/'))
});


gulp.task('babel', () => {
    gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('static/js/'))
});





gulp.task('default',['less', 'babel'], () => {
    gulp.watch(['src/css/*.less','src/js/*.js'], () => {
        gulp.run('less','babel')
    })
})