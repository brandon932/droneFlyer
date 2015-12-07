app.directive('droneList', function() {
  return {
    restrict: 'E',
    scope: {drones : "="},
    replace: true,
    templateUrl:"directives/drone/droneList.html" ,
    link: function($scope,element,attrs){
      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
    }
  };
});
