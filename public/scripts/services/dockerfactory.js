angular.module('dockerboard')
  .factory('DockerFactory',function($http){
    var SERVER='/api/v1';
    return{
      infos:function(){
        return $http.get(SERVER+'/info');
      },
      version:function(){
        return $http.get(SERVER+'/version');
      },
      toYaml:function(data){
        return $http.post(SERVER+'/yaml',data);
      }
    }
  });
