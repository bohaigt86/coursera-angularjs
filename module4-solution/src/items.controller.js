(function () {
  'use strict';

  angular.module('data')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items']
  function ItemsController(items) {
    var itemCtrl = this;

    // console.log(items);

    itemCtrl.items = items.data.menu_items;

    console.log(itemCtrl.items);

  }

})();
