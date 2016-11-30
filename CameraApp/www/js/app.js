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


// var addMarker = navigator.geolocation.getCurrentPosition(function(position) {
//       var marker = new google.maps.Marker({position:
//           {lat: position.coords.latitude,
//           lng: position.coords.longitude},
//           map: map});
//     });



app.controller('CameraCtrl', function($scope, $cordovaCamera, $cordovaGeolocation, $http) {
  //= require drawing.js

  $scope.disabled = true;
  $scope.show = false;
  $scope.myClass = ['list', 'card', 'picture', 'test'];


  var pictureData;
  var coordData;

  // $scope.pictureUrl = "http://placehold.it/300x500";
  $scope.takePicture = function() {



    // $scope.class = "top";
    $scope.disabled = true;
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

    $cordovaCamera.getPicture(options).then(function(data) {
        // console.log("camera data " + angular.toJson(data));
        pictureData = 'data:image/jpeg;base64,' + data;
        // console.log(pictureData)
        $scope.show = true;

        $scope.pictureUrl = pictureData;

        getCoords().then(function(position) {
          coordData = {lat: position.coords.latitude, long: position.coords.longitude};
          // console.log(coordData)
          $scope.disabled = false;
          //enable the button
        }), function(error) {
          // error for coords
        }
      }, function(error) {
        console.log("camera error " + angular.toJson(data));
      });
  };

  var getCoords = function(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    return $cordovaGeolocation.getCurrentPosition(posOptions)
  }

  function canvasSave(){
    return canvasData = canvas.toDataUrl();
  }

  $scope.savePicture = function(){
    canvasData = canvas.toDataURL();

    // canvasSave();


    // ADD A SAVING TAG

    // url: 'https://radiant-savannah-52082.herokuapp.com/pictures',

    $http({
    method: 'POST',
    url : 'http://172.16.0.12:3000/pictures',
    data: {params: {pictureData: pictureData, coordData: coordData, canvasData: canvasData}}
    }).then(function successCallback(response) {
      // console.log("in successCallback")
      // $scope.class = "bot";
      $scope.show = false;
      $scope.disabled = true;
      clearCanvas();
      // respond with a success toast
      // $scope.testAjax = response.data.url;

    }, function errorCallback(response) {
      console.log(response);
    });
  }

/////////////////////////////////////////////////////// DRAWING JS //////////////////////////////////////////////////////////////////

  var canvasData;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var drawingColor = "#000000";

    // Set up mouse events for drawing
  var drawing = false;
  var mousePos = { x:0, y:0 };
  var lastPos = mousePos;
  canvas.addEventListener("mousedown", function (e) {
          drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    drawing = false;
  }, false);
  canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Get the position of the mouse relative to the canvas
  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }
  window.requestAnimFrame = (function (callback) {
          return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             window.msRequestAnimaitonFrame ||
             function (callback) {
          window.setTimeout(callback, 1000/60);
             };
  })();

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Allow for animation
  (function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  canvas.addEventListener("touchstart", function (e) {
          mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  var eraseButton = document.getElementById("erase");

  var clicks = 0;

  eraseButton.addEventListener("click", function() {
    if (clicks === 0) {
      clicks ++;
      drawingColor = "00FFFFFF";
    } else {
      clicks = 0;
      drawingColor = "#000000";
    }
  });

/////////////////////////////////////////////////////// DRAWING JS //////////////////////////////////////////////////////////////////

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

    $scope.map = map;
    $ionicLoading.hide();},
    function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });

}); // end of mapController
