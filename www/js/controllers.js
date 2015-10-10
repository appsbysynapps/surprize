angular.module('starter.controllers', ['ngCordova', 'ionic'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('HomeCtrl', function ($scope, Prizes, Auth) {
    $scope.playlists = Prizes.getPersonPrize(Auth.auth.$getAuth().uid);
})

.controller('PrizeCtrl', function ($scope, $stateParams) {})

.controller('SendCtrl', function ($scope, $stateParams, $cordovaCamera, People) {
    $scope.imgsource = 'nosourceyet';
    $scope.pictureTaken = false;

    $scope.takePicture = function () {
        ionic.Platform.ready(function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 400,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgsource = "data:image/jpeg;base64," + imageData;
                $scope.pictureTaken = true;
            }, function (err) {
                // error
            });
        });
    };
    
    $scope.friends = People.people;
})

.controller('LoginCtrl', function ($scope, $stateParams) {
    /*
    // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };
    
    */
});