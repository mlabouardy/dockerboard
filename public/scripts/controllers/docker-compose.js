angular.module('dockerboard')
  .controller('DockerComposeCtrl',function($scope, UtilityFactory, $window){
    toastr.success('Create your custom templates', 'Docker compose section');


    $scope.total=[];
    $scope.services=[];
    $scope.ports=[];
    $scope.envs=[];
    $scope.links=[];
    $scope.volumes=[];
    $scope.serviceLinks=[];
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


    $scope.generateService=function(){
      $scope.data={};
      $scope.data[$scope.service.container]={};
      $scope.data[$scope.service.container].image=$scope.service.image+":"+$scope.service.tag;
      var ports=[]
      if($scope.portA && $scope.portB){
        ports.push("".concat($scope.portA,":",$scope.portB));
      }
      for(var i=0;i<$scope.ports.length;i++){
        ports.push("".concat($scope.ports[i].portA,":",$scope.ports[i].portB));
      }

      if(ports.length>0){
        $scope.data[$scope.service.container].ports=ports;
      }

      var envs=[];
      if($scope.envA && $scope.envB){
        envs.push("".concat($scope.envA,"=",$scope.envB));
      }

      for(var i=0;i<$scope.envs.length;i++){
        envs.push("".concat($scope.envs[i].envA,"=",$scope.envs[i].envB));
      }

      if(envs.length>0){
        $scope.data[$scope.service.container].environment=envs;
      }

      var volumes=[];
      if($scope.volumeA && $scope.volumeB){
        volumes.push("".concat($scope.volumeA,":",$scope.volumeB));
      }

      for(var i=0;i<$scope.volumes.length;i++){
        volumes.push("".concat($scope.volumes[i].volumeA,":",$scope.volumes[i].volumeB));
      }

      if(volumes.length>0){
        $scope.data[$scope.service.container].volumes=volumes;
      }

      if($scope.service.links.length>0){
        $scope.data[$scope.service.container].links=$scope.service.links;
      }
    }

    $scope.convertToYAML=function(){
      $scope.generateService();
      $scope.total.push($scope.data);
      $window.localStorage.total=$scope.total;
      UtilityFactory.toYaml($scope.total).then(function(yaml){
        $scope.yml=yaml.data
        var lines = $scope.yml.split('\n');
        lines.splice(0,1);
        $scope.yml = lines.join('\n');
      });
    }

    $scope.clearForm=function(){
      $scope.ports=[];
      $scope.envs=[];
      $scope.envA="";
      $scope.envB="";
      $scope.portA="";
      $scope.portB="";
      $scope.volumeA="";
      $scope.volumeB="";
      $scope.volumes=[];
      $scope.service={};
      $scope.serviceLinks=[];
    }

    $scope.createService=function(){
      $scope.service.links=[];
      for(var i=0;i<$scope.serviceLinks.length;i++){
        $scope.service.links.push($scope.serviceLinks[i].name);
      }

      $scope.download=true;
      $scope.services.push($scope.service);
      $scope.convertToYAML();
      $scope.clearForm();

      if($scope.services.length>0){
        $scope.links.push({
          name:$scope.services[$scope.services.length-1].container,
          marker:$scope.services[$scope.services.length-1].container,
          ticked:false
        });
      }
    }

    $scope.deleteService=function(id){
        $scope.services.splice(id,1);
        $scope.total.splice(id,1);
        $scope.links.splice(id,1);
        if($scope.services.length==0){
          $scope.download=false;
          $scope.yml=undefined;
        }else{
          UtilityFactory.toYaml($scope.total).then(function(yaml){
            $scope.yml=yaml.data
            var lines = $scope.yml.split('\n');
            lines.splice(0,1);
            $scope.yml = lines.join('\n');
          });
        }


    }

  });
