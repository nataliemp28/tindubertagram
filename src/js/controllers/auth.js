angular.module('travelApp')
    .controller('RegisterController', RegisterController)
    .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', '$window', '$rootScope'];
function RegisterController($auth, $state, $window, $rootScope) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then((res) => {
        $window.localStorage.setItem('token', res.data.token);

        $rootScope.$broadcast('loggedIn');
        $state.go('feed');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state', '$rootScope'];
function LoginController($auth, $state, $rootScope) {
  const login = this;

  login.credentials = {};
  login.isActive = false;

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $rootScope.$broadcast('loggedIn');
        $state.go('feed');
      });
  }

  login.submit = submit;

  function authenticate(service) {
    console.log('Authenticating');

    $auth.authenticate(service)
      .then(() => {
        $rootScope.$broadcast('loggedIn');
        $state.go('feed');
      });
  }

  login.authenticate = authenticate;
}
