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
      searchV1:function(id){
        return $http.get(SERVER+'/registry/v1/'+id+'/tags');
      },
      searchV2:function(id){
        return $http.get(SERVER+'/registry/v2/'+id+'/tags');
      },
      remove:function(id){
        return $http.delete(SERVER+'/registry/'+id);
      }
    }
  });
