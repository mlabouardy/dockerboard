angular.module('dockerboard')
  .controller('CreateRegistryCtrl',function($scope, $uibModalInstance){
    $scope.registry={
      port:5000,
      protocol:'http',
      hostname:'localhost',
      api:'v1'
    };
    $scope.create = function () {
	    $uibModalInstance.close($scope.registry);
	  };

    $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
  });
