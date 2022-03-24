var fs = require('fs'); // 引入fs模块

const directory = 'doc';
const directoryList = [];

function walkSync(currentDirPath, callback) {
  const fs = require('fs');
  const path = require('path');
  fs.readdirSync(currentDirPath).forEach((name) => {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    const menu = filePath.replace(`${directory}\\`, '');
    if (stat.isFile()) {
      if (menu !== 'README.md' && menu !== 'SUMMARY.md') {
        const i = directoryList.findIndex((item) => item.title === menu.split('\\')[0]);
        if (i > -1) {
          directoryList[i].children.push({ title: menu, path: menu.replace(`${directory}\\`), '') })
        }
      }
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      if (menu !== 'README.md' && menu !== 'SUMMARY.md') {
        directoryList.push({ title: menu, children: [] });
      }
      walkSync(filePath, callback);
    }
  });
}


walkSync(`./${directory}`, (filePath, stat) => {

});


setTimeout(() => {
  directoryList.forEach(item => {
    console.log(item);
    fs.writeFile('./test.md', `* [${item.title}]()\r\n`, { 'flag': 'a' }, function (err) {
      if (err) {
        throw err;
      }

      //   fs.readFile('./test.md', 'utf-8', function (err, data) {
      //     if (err) {
      //       throw err;
      //     }
      //     console.log(data);
      //   });
    });
    item.children.forEach((item2) => {
      fs.writeFile('./test.md', `  * [${item.title}](${item2.title})\r\n`, { 'flag': 'a' }, function (err) {
        if (err) {
          throw err;
        }

        //   fs.readFile('./test.md', 'utf-8', function (err, data) {
        //     if (err) {
        //       throw err;
        //     }
        //     console.log(data);
        //   });
      });
    });
  });
}, 1000);

