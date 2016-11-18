angular.module('travelApp')
    .controller('RegisterController', RegisterController)
    .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', '$window'];
function RegisterController($auth, $state, $window) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then((res) => {
        $window.localStorage.setItem('token', res.data.token);
        $state.go('feed');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};
  login.isActive = false;

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $state.go('feed');
      });
  }

  login.submit = submit;

  function authenticate(service) {
    $auth.authenticate(service, () => {
      $state.go('usersIndex');
    });
  }

  login.authenticate = authenticate;
}
