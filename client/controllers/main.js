app.controller('mainCtrl', function($scope, $rootScope, $location, httpFactory, $window, $auth) {
  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      console.log(response.data);
      $scope.drones = response.data;
    });
  };
  $scope.flyDrone = function(ip){
    console.log("test flight flyig drone" + ip);
    $location.path("/webFlight");
  };
  $scope.getDrones();

});
