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
        $window.localStorage.setItem('token', res.token);
        $state.go('usersIndex');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        console.log('We would go to the feed now!');
        $state.go('usersIndex');
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
