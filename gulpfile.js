var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webpack = require('webpack-stream');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var sass = require('gulp-sass');

gulp.task('webpack', function() {
    gulp.src('src/js/main.ts')
        .pipe(plumber())
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    // Support for SASS
                    {
                        test: /\.scss$/,
                        loaders: ['style', 'css', 'sass', 'resolve-url']
                    },
                    // Support for .ts files.
                    { test: /\.ts$/, loader: 'ts-loader' },

                    //file loader
                    {
                        test: /\.(jpg|png)$/,
                        loader: "file?name=[path][name].[ext]"
                    }
                ]
            },
            plugins: [
                //new UglifyJsPlugin(),

                // This needs to be removed on prod
                new LiveReloadPlugin()
            ]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(plumber(sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['webpack', 'sass', 'watch']);