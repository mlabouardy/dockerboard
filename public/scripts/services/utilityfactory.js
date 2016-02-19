angular.module('dockerboard')
  .factory('UtilityFactory',function($http){
    var SERVER='http://51.254.132.239:3000/api/v1';
    return{
      toYaml:function(data){
        return $http.post(SERVER+'/yaml',data);
      }
    }
  });
