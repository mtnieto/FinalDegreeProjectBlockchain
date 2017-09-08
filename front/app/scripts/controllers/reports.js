'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ReportsCtrl', function($scope, $state, $http, $window) {

    $scope.$state = $state;


    $scope.insert = function(){
      console.log($scope.selectedPerson.originalObject.code + " " + $scope.selectedPerson.originalObject.short)
      $scope.data.desease = $scope.data.desease + "; " + $scope.selectedPerson.originalObject.code + " " + $scope.selectedPerson.originalObject.short
      console.log($scope.data.desease)
      $scope.selectedPerson = "";


      $http({
        method: 'POST',
        url: 'http://localhost:3000/user/modify',
        data: { name: "medicalRecord", data: $scope.data}
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available

          $scope.data = JSON.parse(response.data)
        //  console.log(response.data)

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
          $window.alert("Illness added")
    }

    $scope.localSearch = function(str) {
      var matches = [];
      $scope.people.forEach(function(person) {
        var fullName = person.code + ' ' + person.short;
        console.log(fullName)
        if ((person.code.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (person.short.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
            (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
          matches.push(person);
        }
      });
      return matches;
    };
    $scope.people = [
      {
      "code": "A001",
      "short": "Cholera due to Vibrio cholerae 01, biovar eltor",
      "long": "Cholera due to Vibrio cholerae 01, biovar eltor"
    },
    {
      "code": "A009",
      "short": "Cholera, unspecified",
      "long": "Cholera, unspecified"
    },
    {
      "code": "A0100",
      "short": "Typhoid fever, unspecified",
      "long": "Typhoid fever, unspecified"
    },
    {
      "code": "A0101",
      "short": "Typhoid meningitis",
      "long": "Typhoid meningitis"
    },
    {
      "code": "A0102",
      "short": "Typhoid fever with heart involvement",
      "long": "Typhoid fever with heart involvement"
    },
    {
     "code": "A011",
     "short": "Paratyphoid fever A",
     "long": "Paratyphoid fever A"
   },
   {
     "code": "A012",
     "short": "Paratyphoid fever B",
     "long": "Paratyphoid fever B"
   },
   {
     "code": "A0221",
     "short": "Salmonella meningitis",
     "long": "Salmonella meningitis"
   },
   {
     "code": "A0222",
     "short": "Salmonella pneumonia",
     "long": "Salmonella pneumonia"
   },
   {
     "code": "A0223",
     "short": "Salmonella arthritis",
     "long": "Salmonella arthritis"
   },
   {
     "code": "A170",
     "short": "Tuberculous meningitis",
     "long": "Tuberculous meningitis"
   },
   {
     "code": "A171",
     "short": "Meningeal tuberculoma",
     "long": "Meningeal tuberculoma"
   },
   {
     "code": "A1781",
     "short": "Tuberculoma of brain and spinal cord",
     "long": "Tuberculoma of brain and spinal cord"
   },
   {
    "code": "Q122",
    "short": "Coloboma of lens",
    "long": "Coloboma of lens"
  },
  {
    "code": "Q123",
    "short": "Congenital aphakia",
    "long": "Congenital aphakia"
  },
  {
    "code": "Q124",
    "short": "Spherophakia",
    "long": "Spherophakia"
  }
   ];

});
