(function () {
'use strict';

angular.module('myFirstApp', [])
.controller('MyFirstController', MyFirstController);

MyFirstController.$inject = ['$scope'];

function MyFirstController($scope) {

  // Add a property 'num' to the scope
  $scope.num = $scope.num || 0;
  // Add a function that can manipulate the value of 'num'
  $scope.addOne = function () {
    $scope.num++;
  }
  // Set up a watcher on 'num', once its value changes, the listener function gets excuted
  $scope.$watch('num', function (newValue, oldValue) {
    console.log('oldValue: ' + oldValue);
    console.log('newValue: ' + newValue);
  });
  // Once addOne() is called to change the value of 'num', console will output:
  // oldValue: 0
  // newValue: 1

}

})();
