'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {
/*Angular controller LOGIN*/
    $scope.submit = function() {
      window.alert('jejeje')
      $location.path('/dashboard');

      return false;
    }

  });
