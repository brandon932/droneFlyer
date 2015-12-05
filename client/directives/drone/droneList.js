app.directive('droneList', function() {
  return {
    restrict: 'E',
    scope: {drones : "="},
    replace: true,
    templateUrl:"directives/drone/droneList.html" ,
    link: function($scope,element,attrs){
      // console.log(scope.card);
      $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
      };
    }
  };
});
