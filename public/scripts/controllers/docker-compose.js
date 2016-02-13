angular.module('dockerboard')
  .controller('DockerComposeCtrl',function($scope){
    $scope.service={};
    $scope.ports=[];
    $scope.services=[];
    $scope.newPort=function(){
      $scope.ports.push({});
    }

    $scope.deletePort=function(index){
      $scope.ports.splice(index,1);
    }

    $scope.envs=[];
    $scope.newEnv=function(){
      $scope.envs.push({});
    }

    $scope.deleteEnv=function(index){
      $scope.envs.splice(index,1);
    }

    $scope.volumes=[];
    $scope.newVolume=function(){
      $scope.volumes.push({});
    }

    $scope.deleteVolume=function(index){
      $scope.volumes.splice(index,1);
    }

    $scope.portA="";
    $scope.portB="";
    $scope.envA="";
    $scope.envB="";

    $scope.createService=function(){
      $scope.service.ports=[];
      if($scope.portA && $scope.portB){
        $scope.service.ports.push(""+$scope.portA+":"+$scope.portB+"");
      }
      for(var i=0;i<$scope.ports.length;i++){
        $scope.service.ports.push(""+$scope.ports[i].portA+":"+$scope.ports[i].portB+"");
      }

      $scope.service.envs=[];
      if($scope.envA && $scope.envB){
        $scope.service.envs.push(""+$scope.envA+"="+$scope.envB+"");
      }
      for(var i=0;i<$scope.envs.length;i++){
        $scope.service.envs.push(""+$scope.envs[i].envA+"="+$scope.envs[i].envB+"");
      }

      $scope.service.volumes=[];
      if($scope.volumeA && $scope.volumeB){
        $scope.service.volumes.push(""+$scope.volumeA+"="+$scope.volumeB+"");
      }
      for(var i=0;i<$scope.volumes.length;i++){
        $scope.service.volumes.push(""+$scope.volumes[i].volumeA+"="+$scope.volumes[i].volumeB+"");
      }
      $scope.services.push($scope.service);
      console.log($scope.service);

      $scope.data={};
      $scope.data[$scope.service.container]={};
      $scope.data[$scope.service.container].image=$scope.service.image+":"+$scope.service.tag;
      if($scope.service.ports.length>0){
        $scope.data[$scope.service.container].ports=$scope.service.ports;
      }
      if($scope.service.envs.length>0){
        $scope.data[$scope.service.container].envs=$scope.service.envs;
      }
      if($scope.service.volumes.length>0){
        $scope.data[$scope.service.container].volumes=$scope.service.volumes;
      }
      console.log($scope.data);
      $scope.yml=YAML.stringify($scope.data);
    }

    $scope.copy=function(){
      window.clipboardData.setData('Text',$scope.yml);
      toastr.success('Copied to clipboard','Dockerboard');
    }

  });
