angular.module('dockerboard')
  .controller('NavbarCtrl',function($scope, $location){
    $scope.isActive=function(path){
      return $location.path()==path;
    }

    $scope.closeSidebar=function(){
      var bodyClass = $('body').attr("class");
      if(bodyClass=="mini-navbar"){
        $('body').removeClass('mini-navbar')
      }else{
        $('body').addClass('mini-navbar')
      }
    }
  });
