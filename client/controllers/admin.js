app.controller('adminCtrl', function($scope, $rootScope, $location, httpFactory, $window, $timeout, $auth) {
  function messageTimeout(){
    $scope.success = false;
  }
  $scope.postDrone = function(){
    console.log("it workes");
    var payload = $scope.drone;
    httpFactory.post('/api/drones', payload)
    .then(function(response){
      // $scope.drones.push(response.data);
      $scope.drone = {};
      $scope.success= true;
      $scope.message= "Added a new Drone. Thanks!";
      $timeout(messageTimeout, 5000);
    });
  };
});
