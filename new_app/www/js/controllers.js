var app = angular.module('starter.controllers', [])
app.factory('menu', function() {
    var items = {};
    var itemsService = {};

    itemsService.add = function(item) {
        items = item;
    };
    itemsService.retrieve = function() {
        return items;
    };

    return itemsService;
});

app.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http, menu) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    var url = 'https://api.uwaterloo.ca/v2/foodservices/menu.json?key=a84456bafc8bb0eb83ca3c989634ef68';
    $scope.data = {};
    //console.log(url);
    $http.get(url).
    success(function(data, status, headers, config) {
        menu.add(data.data);
        $scope.data = menu.retrieve();
    }).
    error(function(data, status, headers, config) {
      // log error
    });

})

.controller('MenuCtrl', function($scope) {

})
.controller('NutritionCtrl', function($scope, $stateParams,$http, menu) {
    $scope.id = $stateParams.id;

    var url = 'https://api.uwaterloo.ca/v2/foodservices/products/'+ $scope.id +'.json?key=a84456bafc8bb0eb83ca3c989634ef68';
    $scope.data = {};
    $scope.item = {};
    //console.log(url);
    $http.get(url).
    success(function(data, status, headers, config) {
          $scope.item = data.data;
          console.log($scope.item);
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})
.controller('MenuDetailCtrl', function($scope, $stateParams,$http, menu) {
    $scope.id = $stateParams.id;
    $scope.data = menu.retrieve();
    console.log($scope.data);
    $scope.menus = $scope.data.outlets[$scope.id].menu;
    console.log($scope.menus);
});
