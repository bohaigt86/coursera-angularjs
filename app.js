(function () {
  'use strict';

  angular.module('myFirstApp', [])
  .controller('MyFirstController', function ($scope) {
    $scope.name = 'bohai';
    $scope.sayHello = function () {
      return "Hello world!";
    };
  })
})();
