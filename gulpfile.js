const gulp = require('gulp');
const electron = require('electron-connect').server.create({ path: 'dist' });
const fs = require('fs');

gulp.task('server', () => {
  electron.start();
  gulp.watch('dist/main.js', electron.restart);
  gulp.watch(['dist/renderer/**/*'], electron.reload);
});

gulp.task('create:packageJson', () => {
  const packages = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }));
  const propList = ['dependencies', 'version', 'main', 'name'];
  Object.keys(packages).map((key) => {
    if (!propList.some(prop => prop === key)) {
      delete packages[key];
    }
    return key;
  });
  fs.writeFileSync('./dist/package.json', JSON.stringify(packages));
});
