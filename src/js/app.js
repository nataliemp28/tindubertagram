angular
.module('tindubertagram', ['ngResource', 'ui.router', 'satellizer'])
.config(Router)
.config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'RegisterController as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('usersIndex', {
    url: '/',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  });

  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';

  // $authProvider.facebook({
  //   clientId: '1854080408158696'
  // });
}
