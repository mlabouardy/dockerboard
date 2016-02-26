angular.module('dockerboard')
  .factory('UtilityFactory',function($http){
    var SERVER='/api/v1';
    return{
      toYaml:function(data){
        return $http.post(SERVER+'/yaml',data);
      }
    }
  });
