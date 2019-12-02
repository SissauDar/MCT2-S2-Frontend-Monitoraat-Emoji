const gulp = require('gulp');
const browsersync = require('browser-sync').create();

const htmlmin = require('gulp-htmlmin');

const concat = require('gulp-concat')



function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


function htmlMin() {
  return gulp
    .src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/'));
}

function scripts() {
  return gulp
    .src(['./src/script/lib/*.js', './src/script/app.js'])
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('./dist/script/'));
};


function watchFiles() {
  gulp.watch(['./src/script/**/*.js'], gulp.series(scripts, browserSyncReload));
  gulp.watch(['./src/*.html'], gulp.series(htmlMin, browserSyncReload));
}

const serve = gulp.parallel(watchFiles, browserSync); // Complexere combinatie van tasks.

exports.serve = serve;
exports.htmlMin = htmlMin;