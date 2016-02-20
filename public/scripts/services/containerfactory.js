angular.module('dockerboard')
  .factory('ContainerFactory',function($http){
    var SERVER='/api/v1';
    return{
      containers:function(){
        return $http.get(SERVER+'/containers');
      },
      container:function(id){
        return $http.get(SERVER+'/containers/'+id);
      },
      logs:function(id){
        return $http.get(SERVER+'/logs/'+id);
      },
      resource:function(id){
        return $http.get(SERVER+'/usage/'+id);
      }
    }
  });
