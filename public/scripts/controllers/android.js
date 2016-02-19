angular.module('dockerboard')
.controller('AndroidCtrl',function($scope, $window, Lightbox){
  toastr.success('Docker directly in your phone', 'Android application');

  $scope.data={
    api: $window.location.origin+'/api/v1',
    token:"#dsqdsq"
  }

  $('#qrcode').qrcode({
    "size": 230,
    "fill": "#000",
    "text": JSON.stringify($scope.data)
  });

  $scope.images = getAndroidScreenshots();

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
