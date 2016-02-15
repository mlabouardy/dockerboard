angular.module('dockerboard')
  .factory('DockerFactory',function($http){
    var SERVER='/api/v1';
    return{
      containers:function(){
        return $http.get(SERVER+'/containers');
      },
      images:function(){
        return $http.get(SERVER+'/images');
      },
      container:function(id){
        return $http.get(SERVER+'/containers/'+id);
      },
      infos:function(){
        return $http.get(SERVER+'/info');
      },
      logs:function(id){
        return $http.get(SERVER+'/logs/'+id);
      },
      version:function(){
        return $http.get(SERVER+'/version');
      },
      resource:function(id){
        return $http.get(SERVER+'/usage/'+id);
      },
      toYaml:function(data){
        return $http.post('/test',data);
      }
    }
  });
