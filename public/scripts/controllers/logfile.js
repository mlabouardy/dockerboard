angular.module('dockerboard')
  .controller('LogsCtrl',function($scope, DockerFactory, $routeParams){

    DockerFactory.container($routeParams.id).then(function(details){
      details=details.data;
      $scope.name=details.Name.slice(1);
      $scope.Id=details.Id;
    });
    DockerFactory.logs($routeParams.id).then(function(logs){
      $scope.logs=[];
      for(var i=0;i<logs.data.length;i++){
        var line=String.fromCharCode.apply(null, new Uint16Array(logs.data[i]));
        $scope.logs.push(line);
      }
    });
  });
