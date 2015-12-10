app.controller('navbarCtrl', function($scope, $rootScope,$location, $window, $auth) {



  $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.isAdmin = function(){
    if ($rootScope.currentUser.admin === true){
      return true;
    }else{
      return false;
    }
  };

  $scope.logout = function() {
    delete $window.localStorage.currentUser;
    $auth.logout()
    .then(function(response){
      $location.path('/');
    });
  };
});
