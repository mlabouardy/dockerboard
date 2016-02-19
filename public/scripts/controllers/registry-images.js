angular.module('dockerboard')
  .controller('RegistryImagesCtrl',function($scope,$routeParams, RegistryFactory){
    $scope.api=$routeParams.api;
    if($routeParams.api=='v1'){
      RegistryFactory.searchV1($routeParams.id).then(function(data){
          $scope.repositories=data.data;
      },function(){
        toastr.error('Registry is not responding !', 'Dockerboard');
      });
    }else{
      RegistryFactory.searchV2($routeParams.id).then(function(data){
          $scope.repositories=data.data;
      },function(){
        toastr.error('Registry is not responding !', 'Dockerboard');
      });
    }
  });
