angular.module('dockerboard')
  .controller('RegistryCtrl',function($scope, $uibModal, RegistryFactory){
    toastr.success('Manage your registries', 'Private Registries');

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

    function registryExists(registry){
      for(var i=0;i<$scope.registries.length;i++){
        if($scope.registries[i].hostname==registry.hostname
            && $scope.registries[i].port==registry.port)
            return true;
      }
      return false;
    }

    $scope.newRegistry=function(){
      var newRegistryModal = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/new-registry.html',
        controller: 'CreateRegistryCtrl'
	    });

	    newRegistryModal.result.then(function (registry) {
        if(!registryExists(registry)){
          $scope.registries.push(registry);
          toastr.info('Private registry created !', 'Dockerboard');
          RegistryFactory.create(registry).then(function(){
            refresh();
          });
        }else{
          toastr.warning('Private registry already exists !', 'Dockerboard');
        }
	    });
    }


  });
