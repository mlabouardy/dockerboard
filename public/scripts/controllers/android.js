angular.module('dockerboard')
  .controller('AndroidCtrl',function($scope){
    $scope.data={
      url:"http://51",
      token:"#dsqdsq"
    }

    $('#qrcode').qrcode({
        "size": 230,
        "fill": "#18A689",
        "text": $scope.data
    });
  });
