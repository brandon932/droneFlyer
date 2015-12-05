app.controller('navbarCtrl', function($scope, $rootScope,$location, $window, $auth) {

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.logout = function() {
        $auth.logout()
        .then(function(response){
          $location.path('/');
        });
        delete $window.localStorage.currentUser;
    };
});
