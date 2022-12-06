require(['app', 'sayService'], function (app) {
  'use strict';

  app.controller('myCtrl', function ($rootScope, $scope, sayService) {
    $rootScope.aa = '111';
    $rootScope.bb = '222';
    $scope.cc = '333';
    $scope.dd = '444';
    sayService.say();
  })
});