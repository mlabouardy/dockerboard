angular.module('dockerboard')
  .controller('DockerComposeCtrl',function($scope){
    $scope.ports=[];
    $scope.newPort=function(){
      $scope.ports.push('p');
    }

    $scope.deletePort=function(index){
      $scope.ports.splice(index,1);
    }

    $scope.envs=[];
    $scope.newEnv=function(){
      $scope.envs.push('e');
    }

    $scope.deleteEnv=function(index){
      $scope.envs.splice(index,1);
    }

    $scope.volumes=[];
    $scope.newVolume=function(){
      $scope.volumes.push('v');
    }

    $scope.deleteVolume=function(index){
      $scope.volumes.splice(index,1);
    }
  });
