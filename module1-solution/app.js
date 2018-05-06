(function() {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.food = '';
    $scope.comment = '';
    $scope.showSuggestion = function() {
      var foodList = splitString($scope.food, ',');
      var foodTotalAmount = countItem(foodList);

      return (
        foodTotalAmount == 0
        ? $scope.comment = "Please enter data first."
        : (
          foodTotalAmount > 3
          ? $scope.comment = "Too much!"
          : $scope.comment = "Enjoy!"));
    }

    function countItem(array) {
      var totalNum = 0
      for (var i = 0; i < array.length; i++) {
        if (array[i] != "") {
          totalNum++;
        }
      }

      return totalNum;
    }

    function splitString(stringToSplit, separator) {
      var arrayOfStrings = stringToSplit.split(separator);

      return arrayOfStrings;
    }
  }
})();
