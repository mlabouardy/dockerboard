angular.module('dockerboard',['ngRoute','ui.bootstrap'])
  .config(function($routeProvider){
      $routeProvider
        .when('/',{
          templateUrl:'views/main.html',
          controller:'DashboardCtrl',
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
        .when('/container/:id',{
          templateUrl:'views/container.html',
          controller:'ContainerCtrl',
          title:'Container details'
        })
        .when('/logfile/:id',{
          templateUrl:'views/logfile.html',
          controller:'LogsCtrl',
          title:'Logs'
        })
        .otherwise({redirectTo:'/'});
  })
  .run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
    });
  })
