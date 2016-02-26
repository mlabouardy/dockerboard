angular.module('dockerboard')
  .factory('ContainerFactory',function($http){
    var SERVER='http://51.254.132.239:3000/api/v1';
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
