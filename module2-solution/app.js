(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buy = this;

    buy.items = ShoppingListCheckOffService.printToBuyItems();
    buy.swapItem = function(itemIndex) {
      ShoppingListCheckOffService.swapItem(itemIndex);
    };
    buy.msg = "Everything is bought!";
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.printBoughtItems();
    bought.msg = "Nothing is bought."
  }

  function ShoppingListCheckOffService() {
    var service = this;
    // pre-populated list
    var toBuyList = [
      {
        name: "Chips",
        quantity: "3"
      }, {
        name: "Donuts",
        quantity: "2"
      }, {
        name: "Orange Juices",
        quantity: "5"
      }, {
        name: "Apples",
        quantity: "5"
      }, {
        name: "Watermelon",
        quantity: "1"
      }
    ];

    var boughtList = [];

    service.swapItem = function(itemIndex) {
      var item = toBuyList[itemIndex];
      boughtList.push(item);
      toBuyList.splice(itemIndex, 1);
    }

    service.printToBuyItems = function() {
      return toBuyList;
    };

    service.printBoughtItems = function() {
      return boughtList;
    };

  }
})();
