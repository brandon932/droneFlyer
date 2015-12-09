app.controller('navbarCtrl', function($scope, $rootScope,$location, $window, $auth) {



  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.isAdmin = function(){
    $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return $rootScope.currentUser.admin;

  };

  $scope.logout = function() {
    delete $window.localStorage.currentUser;
    $auth.logout()
    .then(function(response){
      $location.path('/');
    });
  };
});
