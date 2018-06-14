(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/sign-up/sign-up.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl'
    })
    .state('public.userinfo', {
      url: '/userinfo',
      templateUrl: 'src/public/user-info/user-info.html',
      controller: 'UserInfoController',
      controllerAs: 'userInfoCtrl',
      resolve: {
        userInfo: ['UserInfoService', function (UserInfoService) {
          return UserInfoService.showItems();
        }],
        favItem: ['UserInfoService', function (UserInfoService) {
          var userInfo = UserInfoService.showItems();
          return UserInfoService.getItem(userInfo.menu_num);
        }]
      }
    });
}
})();
