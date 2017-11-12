const gulp = require('gulp');
const electron = require('electron-connect').server.create({ path: 'dist' });
const fs = require('fs');
const copydir = require('copy-dir');

gulp.task('server', () => {
  electron.start();
  gulp.watch(['dist/main.js', 'dist/renderer/**/*'], electron.restart);
  // cant restart when it restart and reload in same time.
  // gulp.watch(['dist/renderer/**/*'], electron.reload);
});
gulp.task('copy:modules', () => {
  return copydir('./node_modules', './dist/node_modules', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('ok');
    }
  });
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
