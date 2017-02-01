// Libraries
import 'babel-polyfill';
import del from 'del';
import path from 'path';
// Configuration
import {
  baseDir,
  distDir,
  srcFiles,
} from './gulp/config';
// Gulp
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';


gulp.task('clean', () => del([
  `${distDir}`,
  `${baseDir}/index.js`,
  `${baseDir}/utils`,
  `${baseDir}/rules`
]));

gulp.task('babel', () => {
  return gulp.src(srcFiles)
             .pipe(babel())
             .pipe(gulp.dest(baseDir));
});

gulp.task('lint', () => {
  return gulp.src(srcFiles)
             .pipe(eslint())
             .pipe(eslint.format());
});


gulp.task('watch:build', () => {
  return gulp.watch(srcFiles).on('change', gulp.series('build'));
});

const buildTasks = ['clean', 'lint', 'babel'];
gulp.task('build', gulp.series.apply(gulp, buildTasks));
gulp.task('watch', gulp.series('build', 'watch:build'));
