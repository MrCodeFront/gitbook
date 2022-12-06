define(function (require, exports, module) {
  'use strict';

  // require.async(['jquery'], function (jquery) {
  //   console.log(jquery)
  // })
  const $ = require('jquery');
  exports.setCss = function () {
    $('body').css('background', 'lightblue');
  }
});