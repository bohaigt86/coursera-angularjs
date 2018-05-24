(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/");

  function FoundItems() {
    var ddo = {
      templateUrl: 'refinedmenu.html',
      scope: {
        items: '<',
        onRemove: '&',
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {}

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var refine = this;

    refine.searchTerm ="";
    refine.found = [];

    refine.showRefine = function () {
      MenuSearchService.getMatchedMenuItems(refine.searchTerm)
      .then(function (foundItems) {
        refine.found = foundItems;
        console.log(refine.found);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }

    refine.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];


    service.getMatchedMenuItems = function (searchTerm) {
      foundItems = [];

      return $http({
        method: "GET",
        url: (ApiBasePath + "menu_items.json")
      })
      .then(function (response) {
        var itemsInMenu = response.data.menu_items;

        for(var i = 0; i < itemsInMenu.length; i++) {
          if (itemsInMenu[i].description.match(searchTerm)) {
            foundItems.push(itemsInMenu[i]);
          }
        }

        return foundItems;
      });
    };

    service.removeItem = function (itemIndex) {
      console.log(itemIndex);
      foundItems.splice(itemIndex, 1);
    };

  }

})();
