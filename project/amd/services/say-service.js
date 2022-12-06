require(['app'], function (app) {
  'use strict';
  
  app.service('sayService', function () {
    this.say = function () {
      console.log('好久不见，angularjs');
    }
  })
});