angular.module('dockerboard')
  .controller('DashboardCtrl',function($scope, DockerFactory){
    DockerFactory.infos().then(function(info){
      $scope.info=info.data;
    });
  });
