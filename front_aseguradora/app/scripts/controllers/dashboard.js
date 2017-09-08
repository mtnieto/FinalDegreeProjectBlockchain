'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $http, $window) {

    $scope.$state = $state;
    $http({
      method: 'POST',
      url: 'http://localhost:3000/user',
      data: { name: "medicalRecord"}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.data = JSON.parse(response.data)
        console.log("contract" + response.data)
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });




});
