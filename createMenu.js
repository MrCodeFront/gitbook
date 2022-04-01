/**
 * 生成菜单目录
 */

var fs = require('fs'); // 引入fs模块
const { basename } = require('path');

const option = {
  directory: 'doc',               // 查询的文件夹
  createPath: './doc/SUMMARY.md', // 生成文件路径
  hiddenDirectoryList: ['日常工作'],  // 隐藏目录
  hiddenFileList: ['README.md', 'SUMMARY.md'] // 隐藏文件
}

const directoryList = [];

function walkSync(currentDirPath, callback) {
  const fs = require('fs');
  const path = require('path');
  fs.readdirSync(currentDirPath).forEach((name) => {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    const menu = filePath.replace(`${option.directory}\\`, '');
    let tab = '';
    if (stat.isFile()) {  // 文件处理
      if (!option.hiddenFileList.includes(menu)) {
        for (let i = 0; i < filePath.split('\\').length - 1; i++) {
          tab += ' ';
        }
        const i = directoryList.findIndex((item) => item.title === menu.split('\\')[0]);
        if (i > -1) {
          directoryList[i].children.push({ title: menu, path: menu.replace(`${option.directory}\\`, '') });
          fs.writeFileSync(option.createPath, `${tab}* [${name.split('\.')[0]}](${menu.replace(`${option.directory}\\`, '')})\r\n`, { 'flag': 'a' }, function (err) {
            if (err) {
              throw err;
            }
          });
        }
      }
      callback(filePath, stat);
    } else if (stat.isDirectory()) {  // 目录处理
      if (!option.hiddenDirectoryList.includes(menu)) {
        for (let i = 0; i < filePath.split('\\').length - 2; i++) {
          tab += ' ';
        }
        directoryList.push({ title: menu, children: [] });
        fs.writeFileSync(option.createPath, `${tab}* [${menu}]()\r\n`, { 'flag': 'a+' }, function (err) {
          if (err) {
            throw err;
          }
        });
      }
      walkSync(filePath, callback);
    }
  });
}

fs.unlink(option.createPath, (err) => {
  fs.writeFileSync(option.createPath, `* [前言](README.md)\r\n`, { 'flag': 'a+' }, function (err) {
    if (err) {
      throw err;
    }
  });
  walkSync(`./${option.directory}`, (filePath, stat) => { });
  fs.readFile(option.createPath, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  });
});