var fs              = require('fs');

var gulp            = require('gulp');
var data            = require('gulp-data');
var gutil           = require('gulp-util');
var jsonminify      = require('gulp-json-minify');
var gulpFilter      = require('gulp-filter');
var concat          = require('gulp-concat');
var merge           = require('merge2');
var uglify          = require('gulp-uglify');
var sass            = require('gulp-sass');
var jade            = require('gulp-jade');
var ts              = require('gulp-typescript');
var mainBowerFiles  = require('gulp-main-bower-files');
var imagemin        = require('gulp-imagemin');
var cache           = require('gulp-cache');

var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');
var debug           = require('gulp-debug');
var plumber         = require('gulp-plumber');
var bourbon         = require('node-bourbon');

var connect         = require('gulp-connect');
var del             = require('del');
var runSequence     = require('run-sequence');
var open            = require('gulp-open');

var path = {
    styles  : {
        src  : 'app/styles/**/*.scss',
        dest : 'public/css/',
    },
    views   : {
        src  : 'app/views/**/*.jade',
        dest : 'public/',
        filter: ['*', '**/*', '!_*.*', '!*/_*.*']
    },
    images  : {
        src  :'app/assets/images/**/*.+(png|jpg|gif|svg)',
        dest : 'public/images'
    },
    fonts   : {
        src  : 'app/assets/fonts/**/*',
        dest : 'public/fonts'
    },
    jsons   : {
        src  : 'app/assets/jsons/**/*.json',
        dest : 'public/jsons'
    },
    scripts : {
        src  : 'app/typescripts/**/*.ts',
        out  : 'main.js',
        dest : 'public/js/',
        filter: ['*', '_*.*'],
        vendorConcat: 'vendor.js',
        vendorSrc : 'app/assets/vendor/*.js',
        bowerSrc : './bower.json',
    },
};

gulp.task('webserver', function() {
    connect.server({
        root: 'public',
        livereload: true,
        directoryListing: true
    });
});

gulp.task('uri', function() {
    gulp
    .src(__filename)
    .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('clean:public', function() {
    
    return del.sync('public');
});

gulp.task('fonts', function() {
    
    return gulp
        .src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.dest))
        .pipe(connect.reload());
});

gulp.task('jsons', function() {
    
    return gulp
        .src(path.jsons.src)
        .pipe(plumber())
        .pipe(jsonminify())
        .pipe(gulp.dest(path.jsons.dest))
        .on('error', gutil.log)
        .pipe(connect.reload());
});

gulp.task('imagemin', function() {
    return gulp
        .src(path.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.images.dest))
        .pipe(connect.reload());
} );

gulp.task('images', function() {
  return gulp
      .src(path.images.src)
      // Caching images that ran through imagemin
      .pipe(cache(imagemin({interlaced: true}) ))
      .pipe(gulp.dest(path.images.dest))
});

gulp.task('vendor-scripts', function() {

    var vendorJs = gulp
        .src(path.scripts.vendorSrc)
        .pipe(concat(path.scripts.vendorConcat));

    var bowerJs = gulp
        .src(path.scripts.bowerSrc)
        .pipe(mainBowerFiles( ))
        .pipe(concat(path.scripts.vendorConcat));

    return merge(bowerJs, vendorJs)
        .pipe(concat(path.scripts.vendorConcat))
        .pipe(uglify())
        .pipe(gulp.dest(path.scripts.dest));
});

gulp.task('scripts', function () {
    return gulp
        .src(path.scripts.src)
        .pipe(gulpFilter(path.scripts.filter))
        .pipe(sourcemaps.init())
        .pipe(ts({
                target: "ES5",
        	noImplicitAny: true,
        	out: path.scripts.out
    	    }
        ))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    return gulp
        .src(path.styles.src)
        .pipe(plumber())
        .pipe(gulpFilter(['*', '_*.*']))
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            includePaths: require('node-bourbon').includePaths,
            outputStyle: 'compressed'
        }))
        .on("error", sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(connect.reload());
});

gulp.task( 'views', function() {
    return gulp
        .src( path.views.src )
        .pipe(data( function(file) {
            return JSON.parse(
                fs.readFileSync('app/assets/jsons/page.json')
            );
        } ))
        .pipe( jade( {pretty: false } ))
        .pipe( gulpFilter( path.views.filter ))
        .pipe( gulp.dest( path.views.dest ))
        .pipe( connect.reload() );
});

gulp.task('watch', function () {

    gulp.watch(path.views.src, ['views']);
    gulp.watch(path.styles.src, ['styles']);
    gulp.watch(path.scripts.src, ['scripts']);
    gulp.watch(path.images.src, ['imagemin']);
    gulp.watch(path.images.src, ['images']);
    //gulp.watch(path.images.src, ['jsons']);
    gulp.watch(path.images.src, ['fonts']);
});

//TODO:
//https://github.com/addyosmani/critical-path-css-demo
gulp.task('default', function(callback) {
  runSequence(
    'clean:public', [
        'vendor-scripts', 
        'scripts', 
        'styles', 
        'imagemin', 
        'images',
        //'jsons',
        'fonts',
        'views'], 
    'webserver',
    'uri', 
    'watch',
    callback);
});