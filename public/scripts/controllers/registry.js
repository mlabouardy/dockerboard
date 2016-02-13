angular.module('dockerboard')
  .controller('RegistryCtrl',function($scope, $uibModal, RegistryFactory){
    $scope.registries=[];

    var refresh=function(){
      RegistryFactory.registries().then(function(registries){
        $scope.registries=registries.data;
      });
    }

    refresh();

    $scope.remove=function(id){
      RegistryFactory.remove(id).then(function(){
        refresh();
        toastr.info('Private registry removed !', 'Dockerboard');
      });
    }

    $scope.newRegistry=function(){
      var newRegistryModal = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/new-registry.html',
        controller: 'CreateRegistryCtrl'
	    });

	    newRegistryModal.result.then(function (registry) {
        $scope.registries.push(registry);
        toastr.info('Private registry created !', 'Dockerboard');
        RegistryFactory.create(registry).then(function(){
          refresh();
        });
	    });
    }
  });
