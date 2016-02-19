angular.module('dockerboard')
.controller('DashboardCtrl',function($scope, DockerFactory){

  setTimeout(function() {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      showMethod: 'slideDown',
      timeOut: 4000
    };
    toastr.success('Manage your docker containers', 'Welcome to Dockerboard');

  }, 1300);


  DockerFactory.infos().then(function(info){
    $scope.info=info.data;
  },function(){
    toastr.error('Server is not responding', 'Dockerboard');
  });

  DockerFactory.version().then(function(version){
    $scope.version=version.data;
  },function(){
    toastr.error('Server is not responding', 'Dockerboard');
  });


});
