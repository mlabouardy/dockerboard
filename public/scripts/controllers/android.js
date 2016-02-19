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

  $scope.images = [
    {
      'url': '/images/2.png',
      'thumbUrl': '/images/2.png'
    },
    {
      'url': '/images/3.png',
      'thumbUrl': '/images/3.png'
    },
    {
      'url': '/images/4.png',
      'thumbUrl': '/images/4.png'
    },
    {
      'url': '/images/5.png',
      'thumbUrl': '/images/5.png'
    },
    {
      'url': '/images/6.png',
      'thumbUrl': '/images/6.png'
    },
    {
      'url': '/images/7.png',
      'thumbUrl': '/images/7.png'
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
