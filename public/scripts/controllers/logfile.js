angular.module('dockerboard')
  .controller('LogsCtrl',function($scope, DockerFactory){
    DockerFactory.logs().then(function(logs){
      $scope.logs=[];
      for(var i=0;i<logs.data.length;i++){
        var line=String.fromCharCode.apply(null, new Uint16Array(logs.data[i]));
        $scope.logs.push(line);
      }
    });
  });
