// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('SimpleAjax', function($scope, $http) {

  $scope.testAjax = "Test";

  $http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    $scope.testAjax = response;
  }, function errorCallback(response) {
    $scope.testAjax = "error";
  });
});



app.controller('CameraCtrl', function($scope, $cordovaCamera) {

  $scope.pictureUrl = "http://placehold.it/300x500";
  $scope.takePicture = function() {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,


      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    $cordovaCamera.getPicture(options)
      .then(function(data) {
        console.log("camera data " + angular.toJson(data));
        $scope.pictureUrl = 'data:image/jpeg;base64,' + data;
      }, function(error) {
        console.log("camera error " + angular.toJson(data));
      });
  };
});

app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

  var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

  $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lng);

    var mapOptions = { center: myLatlng, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker1 = new google.maps.Marker({position: {lat: 41.876389, lng: -87.65328}, map: map}); // DBC
    var marker2 = new google.maps.Marker({position: {lat: 41.87717, lng: -87.6555}, map: map}); // Target
    var marker3 = new google.maps.Marker({position: {lat: 41.876714, lng: -87.657297}, map: map}); // Wise Owl
    var marker4 = new google.maps.Marker({position: {lat:41.875387, lng: -87.647541}, map: map}); // UIC-Halsted Blue Line
    var marker5 = new google.maps.Marker({position: {lat: 41.87972, lng: -87.650478}, map: map}); // Dog park

    var mapClickListener = function() {
      document.getElementById("map").addEventListener("click", function() {
        new google.maps.Marker({position:
          {lat: position.coords.latitude,
          lng: position.coords.longitude},
          map: map});
      });
    };

    $scope.map = map;
    $ionicLoading.hide();},
    function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });

}); // end of mapController
