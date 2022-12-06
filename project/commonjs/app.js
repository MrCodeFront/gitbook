(function () {
  const module1 = require('./modules/module1.js');
  const module2 = require('./modules/module2.js');

  module1.showMsg();
  console.log(module2.msg);
})()