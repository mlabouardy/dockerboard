angular.module('dockerboard')
  .controller('NavbarCtrl',function($scope, $location){
    $scope.isActive=function(path){
      return $location.path()==path;
    }
  });
