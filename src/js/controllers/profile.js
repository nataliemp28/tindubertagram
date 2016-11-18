angular.module('travelApp')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = [ '$auth', '$state' , 'User'];

function ProfileController($auth, $state, User) {
  const profile = this;

  profile.user = User.show( $auth.getPayload()._id );
}
