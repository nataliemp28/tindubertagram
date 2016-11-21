angular.module('travelApp')
  .controller('UserShowController', UserShowController)
  .controller('UserEditController', UserEditController);

UserShowController.$inject = ['$state', '$auth', 'User', 'FollowToggle', '$rootScope'];
function UserShowController($state, $auth, User, FollowToggle, $rootScope) {
  const userShow = this;

  userShow.isLoggedIn = $auth.isAuthenticated;
  userShow.user = User.get($state.params);
  userShow.profileIsCurrentUser = false;
  userShow.followingUser = false;

  function deleteUser() {
    userShow.user.$remove(() => {
      $state.go('home');
    });
  }
  userShow.delete = deleteUser;

  function followUser(id) {
    FollowToggle.update({ _id: id.id}, (data) => {
      $rootScope.currentUser = data;
      $state.reload();
    });
  }
  userShow.follow = followUser;

  if ($state.params.id === $auth.getPayload()._id) {
    userShow.profileIsCurrentUser = true;
  } else {
    userShow.profileIsCurrentUser = false;
  }

  if ($rootScope.currentUser.following.indexOf($state.params.id) !== -1) {
    userShow.followingUser = true;
  } else {
    userShow.followingUser = false;
  }

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
