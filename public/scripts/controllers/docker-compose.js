angular.module('dockerboard')
  .controller('DockerComposeCtrl',function($scope, DockerFactory, $window){
    clearForm();
    $scope.services=[];
    $scope.links=[];

    $scope.download=false;

    $scope.newPort=function(){
      $scope.ports.push({});
    }

    $scope.deletePort=function(index){
      $scope.ports.splice(index,1);
    }


    $scope.newEnv=function(){
      $scope.envs.push({});
    }

    $scope.deleteEnv=function(index){
      $scope.envs.splice(index,1);
    }


    $scope.newVolume=function(){
      $scope.volumes.push({});
    }

    $scope.deleteVolume=function(index){
      $scope.volumes.splice(index,1);
    }

    function generateYaml(){
      $scope.service.ports=[];
      if($scope.portA && $scope.portB){
        $scope.service.ports.push("".concat($scope.portA,":",$scope.portB));
      }
      for(var i=0;i<$scope.ports.length;i++){
        $scope.service.ports.push("".concat($scope.ports[i].portA,":",$scope.ports[i].portB));
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
      if($scope.service.links.length>0){
        $scope.data[$scope.service.container].links=$scope.service.links;
      }
    }

    function clearForm(){
      $scope.service={};
      $scope.service.links=[];
      $scope.ports=[];
      $scope.envs=[];
      $scope.volumes=[];
      $scope.total=[];
    }

    function serviceExists(name){
      for(var i=0;i<$scope.services.length;i++){
        if($scope.services[i].container==name)
          return true;
      }
      return false;
    }

    $scope.createService=function(){
      if(!serviceExists($scope.service.container)){
        generateYaml();
        $scope.download=true;
        $scope.total.push($scope.data);
        DockerFactory.toYaml($scope.total).then(function(yaml){
          $scope.yml=yaml.data
          var lines = $scope.yml.split('\n');
          lines.splice(0,1);
          $scope.yml = lines.join('\n');
        });

        clearForm();

        for(var i=0;i<$scope.services.length;i++)
          $scope.links.push($scope.services[i].container);
        toastr.success('Service has been created !','Dockerboard');
      }else{
        toastr.error('Service already exists !','Dockerboard');
      }

    }

    $scope.deleteService=function(id){
      $scope.total.splice(id,1);
      $scope.services.splice(id,1);
      if($scope.services.length<=0)
        $scope.download=false
      DockerFactory.toYaml($scope.total).then(function(yaml){
        $scope.yml=yaml.data
        var lines = $scope.yml.split('\n');
        lines.splice(0,1);
        $scope.yml = lines.join('\n');
      });
      toastr.success('Service has been removed !','Dockerboard');
    }

  });
