(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
      var response = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/categories.json")
      });

      // MenuDataService.getAllCategories(); will return a promise
      return response;
    }

    service.getItemsForCategory = function (shortName) {

      var response = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + shortName)
      });

      return response;
    }
  }
})();
