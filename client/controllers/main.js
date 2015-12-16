app.controller('mainCtrl', function($scope, $rootScope, $location, httpFactory, $window, $auth) {

  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      $scope.drones = response.data;
    });
  };
  console.log($rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')));

  $scope.rentDrone = function(drone){
    httpFactory.get('api/drone/'+drone._id)
    .then(function(response){
      $scope.userDrone= response.data;
    $location.path("/user");
  });
    console.log($scope.userDrone);
    // httpFactory.put('api/drone/'+ drone._id , {rented:true});
    //
    //
    // $location.path("/user");

  };
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


  $scope.getDrones();

});
