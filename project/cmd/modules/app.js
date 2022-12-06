seajs.config({
  base: './', // 后续引用基于此路径
  alias: {  // 别名，可以用一个名称 替代路径（基于base路径）
    module1: './modules/module1.js',
    module2: './modules/module2.js',
    module3: './modules/module3.js',
    jquery: './libs/jquery.min.js'
  },
});

// 使用
seajs.use(['module1', 'module2'], function (module1, module2) {
  'use strict';

  console.log(module1.msg);
  module2.say();
});

// seajs.use(['module3', 'jquery'], function (module3, $) {
//   'use strict';

//   console.log(module3);
//   module3.setCss();
// });