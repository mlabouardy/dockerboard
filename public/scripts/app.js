angular.module('dockerboard',['ngRoute'])
  .config(function($routeProvider){
      $routeProvider
        .when('/',{
          templateUrl:'views/main.html',
          title:'Dashboard'
        })
        .when('/containers',{
          templateUrl:'views/containers.html',
          controller:'ContainersCtrl',
          title:'Containers'
        })
        .when('/images',{
          templateUrl:'views/images.html',
          controller:'ImagesCtrl',
          title:'Images'
        })
        .otherwise({redirectTo:'/'});
  })
  .run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
    });
  })
