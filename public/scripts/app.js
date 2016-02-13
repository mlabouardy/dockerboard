angular.module('dockerboard',['ngRoute','ui.bootstrap', 'angular-bootstrap-select', 'angular-bootstrap-select.extra'])
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
          title:'Container Information'
        })
        .when('/logfile/:id',{
          templateUrl:'views/logfile.html',
          controller:'LogsCtrl',
          title:'Logs'
        })
        .when('/registry',{
          templateUrl:'views/registry.html',
          controller:'RegistryCtrl',
          title:'Private Registry'
        })
        .when('/registry/:id/images',{
          templateUrl:'views/registry-images.html',
          controller:'RegistryImagesCtrl',
          title:'Private Registry Images'
        })
        .when('/docker-compose',{
          templateUrl:'views/docker-compose.html',
          controller:'DockerComposeCtrl',
          title:'Docker Compose'
        })
        .otherwise({redirectTo:'/'});
  })
  .run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
    });
  });
