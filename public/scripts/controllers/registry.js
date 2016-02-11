angular.module('dockerboard')
  .controller('RegistryCtrl',function($scope, $uibModal){
    $scope.registries=[];

    $scope.newRegistry=function(){
      var newRegistryModal = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/new-registry.html',
        controller: 'CreateRegistryCtrl'
	    });

	    newRegistryModal.result.then(function (registry) {
        $scope.registries.push(registry);
	    });
    }
  });
