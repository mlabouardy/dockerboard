angular.module('dockerboard')
  .controller('RegistryImagesCtrl',function($scope,$routeParams, RegistryFactory){
    RegistryFactory.search($routeParams.id).then(function(data){
        $scope.repositories=data.data;
    });
  });
