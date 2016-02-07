angular.module('dockerboard')
  .controller('ContainersCtrl',function($scope, DockerFactory){
    DockerFactory.containers().then(function(containers){
      $scope.containers=containers.data;
      for(var i=0;i<$scope.containers.length;i++){
        var d = new Date(0);
			  d.setUTCSeconds($scope.containers[i].Created);
			  $scope.containers[i].Created=d.toLocaleString();
      }
    });
  });
