app.controller('mainCtrl', function($scope, $rootScope, httpFactory, $window, $auth) {
  $scope.getDrones = function(){
    httpFactory.get('api/drones')
    .then(function(response){
      console.log(response.data);
      $scope.drones = response.data;
    });
  };
  $scope.getDrones();
});
