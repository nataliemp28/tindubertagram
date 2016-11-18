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
        $window.localStorage.setItem('userId', res.data.user._id);
        $state.go('feed');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state', '$window'];
function LoginController($auth, $state, $window) {
  const login = this;

  login.credentials = {};
  login.isActive = false;

  function submit() {
    $auth.login(login.credentials)
      .then((res) => {
        $window.localStorage.setItem('userId', res.data.user._id);
        $state.go('feed');
      });
  }

  login.submit = submit;

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then((res) => {
        console.log(res);
      });
  }
  login.authenticate = authenticate;
}
