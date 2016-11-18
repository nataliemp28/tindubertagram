angular
.module('travelApp', ['ngResource', 'ui.router', 'satellizer'])
.config(Router)
.config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('register', {
    url: '/register',
    controller: 'RegisterController as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('feed', {
    url: '/feed',
    templateUrl: '/templates/feed.html',
    controller: 'MainFeedController as mainFeed'
  }).state('profile', {
    url: '/user/:id',
    templateUrl: '/templates/profile.html',
    controller: 'UserShowController as userShow'
  }).state('map', {
    url: '/map',
    templateUrl: '/templates/map.html'
  }).state('home', {
    url: '/',
    templateUrl: '/templates/home.html'
  });

  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';

  $authProvider.facebook({
    clientId: '332198860490764'
  });
}
