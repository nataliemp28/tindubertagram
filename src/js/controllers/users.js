angular.module('travelApp')
  .controller('UserShowController', UserShowController)
  .controller('UserEditController', UserEditController);

UserShowController.$inject = ['$state', '$auth', 'User'];
function UserShowController($state, $auth, User) {
  const userShow = this;

  userShow.isLoggedIn = $auth.isAuthenticated;
  userShow.user = User.get($state.params);
  userShow.profileIsCurrentUser = false;

  function deleteUser() {
    userShow.user.$remove(() => {
      $state.go('home');
    });
  }

  if ($state.params.id === $auth.getPayload()._id) {
    userShow.profileIsCurrentUser = true;
  } else {
    userShow.profileIsCurrentUser = false;
  }

  userShow.delete = deleteUser;
}

UserEditController.$inject = ['User', '$state'];
function UserEditController(User, $state) {
  const userEdit = this;

  userEdit.user = User.get($state.params);

  function update() {
    userEdit.user.$update(() => {
      $state.go('profile', $state.params);
    });
  }

  this.update = update;

}
