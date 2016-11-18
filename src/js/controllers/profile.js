angular.module('travelApp')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = [ '$state' , 'User'];

function ProfileController($state, User) {
  const profile = this;

  profile.user = User.show( localStorage.userId );
}
