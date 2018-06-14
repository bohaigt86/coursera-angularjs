(function () {
  'use strict';

  angular.module('common')
  .service('UserInfoService', UserInfoService);

  UserInfoService.$inject = ['$http', 'ApiPath'];
  function UserInfoService($http, ApiPath) {
    var service = this;
    service.userInfo = {};
    service.signUpDone = false;
    service.ApiPath = ApiPath;


    service.getItem = function (short_name) {

      if (short_name === undefined) {
        return;
      }

      var promise = $http({
        method: "GET",
        url: (ApiPath + "/menu_items/" + short_name.toUpperCase() + ".json")
      });

      // service.signUpDone = true;

      return promise;
    };

    service.showItems = function () {
      return service.userInfo;
    };

    service.submit = function(user) {
        service.userInfo = user;
        service.signUpDone = true;
        console.log("Sign Up Done?");
        console.log(service.signUpDone);
        console.log("User Info:");
        console.log(service.userInfo);
    };
  }
})();
