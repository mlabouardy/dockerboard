angular.module('dockerboard')
.controller('ContainersCtrl',function($scope, ContainerFactory){
  toastr.success('Manage docker containers', 'Containers Manager');

  ContainerFactory.containers().then(function(containers){
    $scope.containers=containers.data;
    for(var i=0;i<$scope.containers.length;i++){
      var d = new Date(0);
      d.setUTCSeconds($scope.containers[i].Created);
      $scope.containers[i].Created=d.toLocaleString();

      var name=$scope.containers[i].Names[0];
      $scope.containers[i].Name=name;

    }

    containers=$scope.containers;
    var arr = [];
    for (var prop in containers) {
      arr.push(containers[prop]);
    }
    $scope.data={
      nodes:arr,
      links:[]
    };

    drawGraph($scope.data);


  },function(){
    toastr.error('Server is not responding', 'Dockerboard');
  });
});
