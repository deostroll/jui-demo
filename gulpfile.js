var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var rm = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function(){
  gulp.src(['node_modules/jquery/dist/jquery.js'])
    .pipe(gulp.dest('web/js'));

  gulp.src('src/index.html')
    .pipe(gulp.dest('web/'));

  gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/js'));

  gulp.src('node_modules/jquery-ui/themes/base/images/*')
    .pipe(gulp.dest('web/css/images'));

  gulp.src([
    'core.css',
    'datepicker.css',
    'theme.css'
  ], {
    cwd: 'node_modules/jquery-ui/themes/base'
  })
  .pipe(gulp.dest('web/css'));

  var opts = {
    cwd: 'jquery-timepicker'
  }
  gulp.src([
    'jquery.ui.timepicker.css'
  ], opts)
  .pipe(gulp.dest('web/css'));

  gulp.src([
    'jquery.ui.timepicker.js'
  ], opts)
  .pipe(gulp.dest('web/js'));

  gulp.src([
    'version.js',
    '*.js',
    '!core.js',
    'widgets/datepicker.js'
  ], {
    cwd: 'node_modules/jquery-ui/ui'
  })
  .pipe(sourcemaps.init())
  .pipe(concat('jquery-ui.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('web/js'));
});

gulp.task('clean', function(done){
  rm('web', function(err){
    if(!err) {
      done();
      return;
    }
    console.error(err);
  })
});
