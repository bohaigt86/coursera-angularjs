(function () {
  'use strict';

  angular.module('public')
  .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['UserInfoService'];
  function UserInfoController(UserInfoService) {
    var $ctrl = this;
    $ctrl.signUpDone = UserInfoService.signUpDone;
    $ctrl.userinfo = UserInfoService.showItems();
    $ctrl.apiPath = UserInfoService.ApiPath;

    console.log("userinfo: ");
    console.log($ctrl.userinfo);

    // if userinfo is not empty, then...
    if (!angular.equals($ctrl.userinfo, {})) { //this line is too angularJS 1 dependent
      var promise = UserInfoService.getItem($ctrl.userinfo.menu_num);
      promise.then(function (response) {
        $ctrl.favItem = response.data;
      });
    }


    console.log("userInfoCtrl has got the data:");
    console.log($ctrl.userinfo);
    console.log("favItem is: ");
    console.log($ctrl.favItem);
  }

})();
