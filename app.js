(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Bohai";
  $scope.greeting = function () {
    return ("Hi " + $scope.name + "!");
  }
});

})();
