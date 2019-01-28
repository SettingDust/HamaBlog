const gulp = require('gulp'),
    prettier = require('gulp-prettier'),
    postcss = require('gulp-postcss'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify');
const paths = {
    stylus: {
        main: './source/style/*.styl',
        all: './source/style/**/*.styl'
    },
    js: {
        client: './source/script/**/!(*.min).js',
        server: './scripts/**/*.js'
    }
};

gulp.task('format:styl', () =>
    gulp
        .src(paths.stylus.all)
        // TODO Add format code
        .pipe(gulp.dest(file => file.base))
);

gulp.task('format:js', () =>
    gulp
        .src([paths.js.server, paths.js.client, './*.js'])
        .pipe(prettier())
        .pipe(gulp.dest(file => file.base))
);

gulp.task('build:styl', () =>
    gulp
        .src(paths.stylus.main)
        .pipe(
            stylus({
                compress: true
            })
        )
        .pipe(postcss())
        .pipe(gulp.dest(file => file.base))
);

gulp.task('build:js', () =>
    gulp
        .src(paths.js.client)
        .pipe(
            minify({
                ext: {
                    src: '.js',
                    min: '.min.js'
                }
            })
        )
        .pipe(gulp.dest(file => file.base))
);
gulp.task('format', gulp.series(gulp.parallel('format:styl', 'format:js')));

gulp.task('build', gulp.series('build:styl', 'build:js'));

gulp.task(
    'dev',
    gulp.series('build', () => {
        gulp.watch(paths.stylus.all).on('change', gulp.series('build:styl'));
        // gulp.watch(paths.js.client).on('change', gulp.series('build:js'));
    })
);

gulp.task('default', gulp.series('build'));
