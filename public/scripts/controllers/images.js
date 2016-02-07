angular.module('dockerboard')
.controller('ImagesCtrl',function($scope, DockerFactory){
  DockerFactory.images().then(function(images){
    $scope.images=images.data;
    for(var i=0;i<$scope.images.length;i++){
      var d = new Date(0);
      d.setUTCSeconds($scope.images[i].Created);
      $scope.images[i].Created=d.toLocaleString();

      var repositoryName=$scope.images[i].RepoTags[0];
      var tag = repositoryName.substr(repositoryName.indexOf(":") + 1);
      var imageName= repositoryName.substr(0, repositoryName.indexOf(':'));

      $scope.images[i].Name=imageName;
      $scope.images[i].Tag=tag;

      var size=$scope.images[i].VirtualSize;
      $scope.images[i].VirtualSize=(size/1000)/1000;
    }
  });

  $scope.keyword={};

  $scope.open=function(){
    $scope.popup.opened = true;
  }

  $scope.popup = {
    opened: false
  };

});
