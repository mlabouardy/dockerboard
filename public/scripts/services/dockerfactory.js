angular.module('dockerboard')
  .factory('DockerFactory',function($http){
    var SERVER='/api/v1';
    return{
      containers:function(){
        return $http.get('containers.json');
      },
      images:function(){
        return $http.get('images.json');
      },
      container:function(){
        return $http.get('container.json');
      },
      infos:function(){
        return $http.get('info.json');
      }
    }
  });
