(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {

  $scope.onceCounter = 0;

  $scope.showWatchers = function () {
    console.log("# of watchers: " + $scope.$$watchersCount);
  };

  $scope.countOnce = function () {
    $scope.onceCounter = 1;
    // console.log($scope.onceCounter);
  };

  $scope.$watch('onceCounter', function (newValue, oldValue) {
    console.log("old value: " + oldValue);
    console.log("new value: " + newValue);
  })

});

})();
