'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/frauds'}).
  success(function(data, status, headers, config) {
    $scope.names = data;
  }).
  error(function(data, status, headers, config) {
    $scope.names = "ERROR :("
  });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
