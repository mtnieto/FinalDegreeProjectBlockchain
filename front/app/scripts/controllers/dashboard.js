'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $http) {

    $scope.$state = $state;


  $http({
    method: 'GET',
    url: 'http://localhost:3000'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response)
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

});
