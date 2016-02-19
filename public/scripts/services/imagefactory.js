angular.module('dockerboard')
  .factory('ImageFactory',function($http){
    var SERVER='http://51.254.132.239:3000/api/v1';
    return{
      images:function(){
        return $http.get(SERVER+'/images');
      }
    }
  });
