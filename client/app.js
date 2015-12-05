var app = angular.module('MyApp', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

    $authProvider.github({
      url:'/auth/github',
      clientId: '0c345464624272812a83',
      redirectUri: window.location.origin
    });

      $routeProvider
    .when('/', {
      templateUrl: 'partials/welcome.html',
      controller: 'mainCtrl'
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'mainCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupCtrl'
    })
    .otherwise('/');

});
