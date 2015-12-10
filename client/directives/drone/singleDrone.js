app.directive('singleDrone', function() {
  return {
    restrict: 'E',
    scope: {userDrones : "="},
    replace: true,
    templateUrl:"directives/drone/droneList.html" ,
    link: function($scope,element,attrs){
      $scope.isAuthenticated = function() {
        console.log($scope.userDrone);
        return $auth.isAuthenticated();
      };
    }
  };
});
