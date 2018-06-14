(function () {
  'use strict';

  angular.module('common')
  .service('UserInfoService', UserInfoService);

  UserInfoService.$inject = ['$http', 'ApiPath'];
  function UserInfoService($http, ApiPath) {
    var service = this;
    var userInfo = {};

    service.getItem = function (short_name) {

      var promise = $http({
        method: "GET",
        url: (ApiPath + "/menu_items/" + short_name.toUpperCase() + ".json")
      });

      return promise;
    };

    service.showItems = function () {
      if (userInfo === {}) {
        console.log("Nothing is found.")
        return false
      } else {
        return userInfo;
      }
    }

    service.submit = function(user) {
        userInfo = user;
        console.log(userInfo);
    };
  }
})();
