angular
.module('travelApp', ['ngResource', 'ui.router', 'satellizer', 'gMap'])
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
  .state('usersIndex', {
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

  $authProvider.instagram({
    clientId: '92e67d01aacb443fa782c92500650463'
  });
}
