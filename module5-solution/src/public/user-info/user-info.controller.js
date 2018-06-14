(function () {
  'use strict';

  angular.module('public')
  .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['userInfo', 'favItem', 'ApiPath'];
  function UserInfoController(userInfo, favItem, ApiPath) {
    var $ctrl = this;
    $ctrl.userinfo = userInfo;
    $ctrl.apiPath = ApiPath;
    $ctrl.favItem = favItem.data;

    console.log("userInfoCtrl has got the data:");
    console.log($ctrl.userinfo);
    console.log("favItem is: ");
    console.log($ctrl.favItem);
  }

})();
