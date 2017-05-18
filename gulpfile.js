const gulp = require('gulp');
const electron = require('electron-connect').server.create({ path: 'app' });

gulp.task('server', () => {
  electron.start();
  gulp.watch('app/main.js', electron.restart);
  gulp.watch(['app/renderer/**'], electron.reload);
});
