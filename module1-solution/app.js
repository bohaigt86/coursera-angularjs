(function() {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter) {
    $scope.food = '';
    $scope.comment = '';
    $scope.showSuggestion = function() {
      var foodList = splitFoodList($scope.food, ',');
      var foodTotalAmount = countNum(foodList);
      
      return(foodTotalAmount == 0 ? $scope.comment = "Please enter data first." : (foodTotalAmount > 3 ? $scope.comment = "Too much!" : $scope.comment = "Enjoy!"));
    }

    function countNum(array) {
      var totalNum = 0
      for (var i = 0; i < array.length; i++) {
        if (array[i] != "") {
          totalNum++;
        }
      }
      console.log(totalNum);
      return totalNum;
    }

    function splitFoodList(stringToSplit, separator) {
      var arrayOfStrings = stringToSplit.split(separator);

      return arrayOfStrings;
    }
  }
})();
