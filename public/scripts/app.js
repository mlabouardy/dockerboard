angular.module('dockerboard',['ngRoute','ui.bootstrap', 'ngclipboard','isteven-multi-select','bootstrapLightbox'])
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
        .when('/registry/:api/:id/images',{
          templateUrl:'views/registry-images.html',
          controller:'RegistryImagesCtrl',
          title:'Private Registry Images'
        })
        .when('/docker-compose',{
          templateUrl:'views/docker-compose.html',
          controller:'DockerComposeCtrl',
          title:'Docker Compose'
        })
        .when('/android',{
          templateUrl:'views/android.html',
          controller:'AndroidCtrl',
          title:'Android Application'
        })
        .otherwise({redirectTo:'/'});
  })
  .run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
    });
  })
  .directive('textareaFit', [
    '$log',
    function ($log) {
      var copyCssStyles = function (elSrc, elDest) {
            var stylesToCopy = [
                  'width',
                  'font-family',
                  'font-size',
                  'line-height',
                  'min-height',
                  'padding'
                ],
                destStyles = {};

            angular.forEach(stylesToCopy, function (style) {
              destStyles[style] = elSrc.css(style);
            });

            elDest.css(destStyles);
          };

      return {
        restrict: 'A',
        link : function ($scope, $element) {
          if (!angular.isFunction($element.height)) {
            $log.error('textareaFit directive only works when jQuery is loaded');
          } else if (!$element.is('textarea')) {
            $log.info('textareaFit directive only works for elements of type "textarea"');
          } else {
            var elClone = angular.element('<div>'),
                setEqualHeight = function () {
                  var curText = $element.val();
                  if (/\n$/.test(curText)) {
                    curText += ' ';
                  }
                  copyCssStyles($element, elClone);
                  elClone.text(curText);
                  $element.height(elClone.height());
                };

            elClone
              .hide()
              .css({
                'white-space': 'pre-wrap',
                'word-wrap' : 'break-word'
              });
            $element.parent().append(elClone);
            $element.css('overflow', 'hidden');

            $scope.$watch(function () {
              return $element.val();
            }, setEqualHeight);

            $scope.$watch(function () {
              return $element.width();
            }, setEqualHeight);

            $scope.$on('destroy', function () {
              elClone.remove();
              elClone = null;
            });
          }
        }
      };
    }]
  );
