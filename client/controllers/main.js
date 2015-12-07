app.controller('mainCtrl', function($scope, $rootScope, $location, httpFactory, $window, $auth) {
  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      $scope.drones = response.data;
    });
  };
  $rootScope.currentDrone = {};
  $rootScope.wtf = 'wtf';
  $scope.flyDrone = function(drone){
    console.log("test flight flyig drone" + drone.name);
    $location.path("/webFlight");
    httpFactory.put('api/drone/'+ drone._id , {rented:true});
    $rootScope.wtf = "hi";
    $rootScope.currentDrone = drone;
    console.log($rootScope.currentDrone);
    console.log($rootScope.wtf);
    $location.path("/webFlight");
  };
  $scope.done = function(drone){
    $location.path("/home");
    httpFactory.put('api/drone/'+ drone._id , {rented:false});
  };

  $scope.getDrones();

});
