var app = angular.module('MyApp', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

    $authProvider.github({
      url:'/auth/github',
      clientId: 'db0cf5e1495effc961f7',
      redirectUri: window.location.origin
    });

    $routeProvider
    .when('/', {
      templateUrl: 'partials/welcome.html',
      access: {restricted: false}
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'mainCtrl',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl',
      access: {restricted: false}
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupCtrl',
      access: {restricted: false}
    })
    .when('/webFlight', {
      templateUrl: 'partials/webFlight.html',
      controller: 'mainCtrl',
      access: {restricted: true}
    })
    .when('/user', {
      templateUrl: 'partials/user.html',
      controller: 'mainCtrl',
      access: {restricted: true}
    })
    .when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'mainCtrl',
      access: {restricted: true}
    })
    .otherwise('/');
});
// app.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     console.log(AuthService.getUserStatus);
//     if (next.access.restricted && !AuthService.getUserStatus()) {
//       $location.path('/login');
//     }
//   });
// });
