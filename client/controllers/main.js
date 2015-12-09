app.controller('mainCtrl', function($scope, $rootScope, $location, httpFactory, $window, $auth) {

  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      $scope.drones = response.data;
    });
  };

  $scope.rentDrone = function(drone){
    httpFactory.get('api/drone/'+drone._id)
    .then(function(response){
      $scope.userDrone = response.data;
      console.log($scope.userDrone);
    });


    $location.path("/user");

  };

  $scope.flyDrone = function(drone){
    console.log("test flight flyig drone" + drone.name);
    $location.path("/webFlight");
    httpFactory.put('api/drone/'+ drone._id , {rented:true});
    $window.localStorage.currentDrone = JSON.stringify(drone);

  };

  $scope.done = function(){
    var drone =JSON.parse(localStorage.getItem('currentDrone'));
    $location.path("/home");
    httpFactory.put('api/drone/'+ drone._id , {rented:false});
    delete $window.localStorage.currentDrone;
  };

  $scope.getDrones();

});
