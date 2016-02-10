angular.module('dockerboard')
  .controller('ContainerCtrl',function($scope, DockerFactory, $routeParams){
    DockerFactory.container($routeParams.id).then(function(details){
      details=details.data;
      var stats=[
        {
          name:"Running",
          color:"widget style1 navy-bg",
          icon:"fa fa-play fa-5x"
        },
        {
          name:"Paused",
          color:"widget style1 lazur-bg",
          icon:"fa fa-pause fa-5x"
        },
        {
          name:"Restarting",
          color:"widget style1 yellow-bg",
          icon:"fa fa-refresh fa-5x"
        },
        {
          name:"OOMKilled",
          color:"widget style1 red-bg",
          icon:"fa fa-hand-paper-o fa-5x"
        },
        {
          name:"Dead",
          color:"widget style1 red-bg",
          icon:"fa fa-ban fa-5x"
        }
      ];

      $scope.state={}
      if(details.State.Running)
          $scope.state=stats[0];
      if(details.State.Paused)
          $scope.state=stats[1];
      if(details.State.Restarting)
          $scope.state=stats[2];
      if(details.State.OOMKilled)
          $scope.state=stats[3];
      if(details.State.Dead)
        $scope.state=stats[4];

      var ports=details.NetworkSettings.Ports;
      $scope.ports=[];
      for(port in ports){
        var data=ports[port];
        var hostPorts=[];
        if(data!=null){
          for(var i=0;i<data.length;i++){
            hostPorts.push(data[i].HostPort);
          }
          $scope.ports.push({
            homePort:port,
            hostPorts:hostPorts
          });
        }

      }

      $scope.name=details.Name.slice(1);

      var envs=details.Config.Env;
      $scope.envs=[];
  	 	for(var i=0;i<envs.length;i++){
  	 		var env=envs[i]

  	 		var variableValue = env.substr(env.indexOf("=") + 1);
  	 		var variableName= env.substr(0, env.indexOf('='));

  	 		$scope.envs.push({
  	 			name:variableName,
  	 			value:variableValue
  	 		});
  	 	}
      $scope.volumes=details.Config.Volumes;
      $scope.image=details.Config.Image;
      $scope.exposedPorts=details.Config.ExposedPorts;
      $scope.Id=details.Id;
    });
  });
