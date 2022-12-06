(function () {
  // 配置
  require.config({
    // 基本路径 为下面地址映射做配置
    baseUrl: './',
    // 模块名与地址映射
    paths: {
      'module1': './modules/module1', // 配置之后可以用require导入模块
      'module2': './modules/module2',
      'jquery': './libs/jquery.min',
      
      'angular': './libs/angular',
      'app': './services/app-service',
      'myCtrl': './services/myctrl-controller',
      'sayService': './services/say-service'
    },
    /*
      配置不兼容AMD的模块
      exports : 指定导出的模块名
      deps  : 指定所有依赖的模块的数组
    */
    shim: {
      'angular': {
        exports: 'angular'
      }
    }
  })

  require(['module1'], function (module1) {
    console.log(module1);
  })

  require(['module2'], function (module2) {
    module2.setColor();
  })

  // require(['angular'], function (angular) {
  //   // console.log(angular)
  //   const app = angular.module('myApp', []);
  //   app.service('sayService', function () {
  //     this.say = function () {
  //       console.log('好久不见，angularjs');
  //     }
  //   })
  //   app.controller('myCtrl', function ($rootScope, $scope, sayService) {
  //     // 全局作用域，任何控制器中都可使用
  //     $rootScope.aa = "aa";
  //     $rootScope.bb = "bb";
  //     // 局部作用域，只能作用于当前控制器
  //     $scope.cc = "cc";
  //     $scope.dd = "dd";
  //     // 调用服务
  //     sayService.say();
  //   });
  // })

  require(['myCtrl'], function () { })
})()