(function () {
    'use strict';

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserInfoService'];

    function SignUpController(UserInfoService) {
      var signUpCtrl = this;
      signUpCtrl.user = null;
      signUpCtrl.invalidItem = null;


      signUpCtrl.validateMenuNum = function () {
        var promise = UserInfoService.getItem(signUpCtrl.user.menu_num);
        promise.then(function (response) {
          console.log("So you like " + response.data.name + "?");
          signUpCtrl.invalidItem = false;
          // console.log(signUpCtrl.invalidItem);
          return true;
        })
        .catch(function (error) {
          // console.log("Nothing is found.");
          signUpCtrl.invalidItem = true;
          // console.log(signUpCtrl.invalidItem);
          return false;
        });
      };

      signUpCtrl.submit = function () {
        UserInfoService.submit(signUpCtrl.user);
        signUpCtrl.completed = true;
      };
    }
  }
)();
