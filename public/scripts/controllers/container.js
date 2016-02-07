angular.module('dockerboard')
  .controller('ContainerCtrl',function($scope, DockerFactory){
    DockerFactory.container().then(function(details){
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


    });
  });
