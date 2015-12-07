app.controller('mainCtrl', function($scope, $rootScope, $location, httpFactory, $window, $auth) {

  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      $scope.drones = response.data;
    });
  };

  $scope.flyDrone = function(drone){
    console.log("test flight flyig drone" + drone.name);
    $location.path("/webFlight");
    httpFactory.put('api/drone/'+ drone._id , {rented:true});
    $window.localStorage.currentDrone = JSON.stringify(drone);
    
  };

  $scope.done = function(drone){
    console.log(JSON.parse(localStorage.getItem('currentDrone')));
    $location.path("/home");
    // httpFactory.put('api/drone/'+ drone._id , {rented:false});
    delete $window.localStorage.currentDrone;
  };

  $scope.getDrones();

});
