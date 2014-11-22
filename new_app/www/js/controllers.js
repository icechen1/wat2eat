angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {
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
          $scope.data = data.data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('MenuCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
