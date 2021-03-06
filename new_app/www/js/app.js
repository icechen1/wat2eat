// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.watcard', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/watcard.html"
        }
      }
    })
    .state('app.menus', {
      url: "/menu/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/menu_details.html",
          controller: 'MenuDetailCtrl'
        }
      }
    })
    .state('app.menus_listing', {
      url: "/menus",
      views: {
        'menuContent' :{
          templateUrl: "templates/menu_listing.html",
          controller: 'MenuCtrl'
        }
      }
    })
    .state('app.products', {
      url: "/product/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/product.html",
          controller: 'NutritionCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menu/0');
});

