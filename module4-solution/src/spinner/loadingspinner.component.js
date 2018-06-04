(function () {
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner', {
    templateUrl: 'src/spinner/templates/loadingspinner.template.js',
    controller: SpinnerController
  });

  SpinnerController.$inject = ['$rootScope']
  function SpinnerController($rootScope) {
    var $spinCtrl = this;
    var cancellers = [];

    $spinCtrl.$onInit = function () {
      var cancel = $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, formState, formParams, options) {
        $spinCtrl.showSpinner = true;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, formState, formParams) {
        $spinCtrl.showSpinner = false;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, formState, formParams, error) {
        $spinCtrl.showSpinner = false;
      });
      cancellers.push(cancel);
    };

    $spinCtrl.$onDestroy = function () {
      cancellers.forEach(function (item) {
        item();
      });
    };

  };
  
})();
