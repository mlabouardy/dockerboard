angular.module('dockerboard')
  .factory('DockerFactory',function($http){
    var SERVER='http://51.254.132.239:3000/api/v1';
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
        return $http.get('info.json');
      },
      logs:function(id){
        return $http.get(SERVER+'/logs/'+id);
      }
    }
  });
