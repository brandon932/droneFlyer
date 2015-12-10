app.controller('userCtrl', function($scope, $rootScope, $location, httpFactory, $window, $timeout, $auth) {

  $scope.flyDrone = function(drone){
    console.log("test flight flyig drone" + drone.name);
    $location.path("/webFlight");
    $window.localStorage.currentDrone = JSON.stringify(drone);
  };
  
  $scope.done = function(){
    var drone =JSON.parse(localStorage.getItem('currentDrone'));
    $location.path("/home");
    httpFactory.put('api/drone/'+ drone._id , {rented:false});
    delete $window.localStorage.currentDrone;
  };

});
