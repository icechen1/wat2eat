// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','angular.filter'])

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
  
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
  
   .state('app.foodmenu', {
      url: "/foodmenu",
      views: {
        'menuContent' :{
          templateUrl: "templates/foodmenu.html"
        }
      }
    })

    .state('app.locations', {
      url: "/locations",
      views: {
        'menuContent' :{
          templateUrl: "templates/locations.html"
        }
      }
    })
  
    .state('app.watcard', {
      url: "/watcard",
      views: {
        'menuContent' :{
          templateUrl: "templates/watcard.html"
        }
      }
    })
    .state('app.checkbalances', {
      url: "/checkbalances",
      views: {
        'menuContent' :{
          templateUrl: "templates/checkbalances.html"
        }
      }
    })
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

