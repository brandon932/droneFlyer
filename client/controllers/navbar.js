app.controller('navbarCtrl', function($scope, $rootScope, $window, $auth) {

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
