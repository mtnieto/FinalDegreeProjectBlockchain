'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('NetworkCtrl', function($scope, $state, $http, $window) {
    $scope.$state = $state;

      $http({
        method: 'GET',
        url: 'http://localhost:46657/genesis'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.validators = response.data;


    }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

        $http({
          method: 'GET',
          url: 'http://localhost:46657/list_validators'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.myvariable = response.data
      }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

          $http({
            method: 'GET',
            url: 'http://localhost:46657/list_accounts'
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available

              $scope.contract = response.data
          

        }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });




});
