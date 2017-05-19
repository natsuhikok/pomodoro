const gulp = require('gulp');
const electron = require('electron-connect').server.create({ path: 'dist' });

gulp.task('server', () => {
  electron.start();
  gulp.watch('dist/main.js', electron.restart);
  gulp.watch(['dist/renderer/**'], electron.reload);
});
