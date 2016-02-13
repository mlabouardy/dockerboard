angular.module('dockerboard')
  .factory('RegistryFactory',function($http){
    var SERVER='/api/v1';
    return{
      registries:function(){
        return $http.get(SERVER+'/registry');
      },
      create:function(registry){
        return $http.post(SERVER+'/registry',registry);
      },
      search:function(id){
        return $http.get(SERVER+'/registry/'+id+'/tags');
      },
      remove:function(id){
        return $http.delete(SERVER+'/registry/'+id);
      }
    }
  });
