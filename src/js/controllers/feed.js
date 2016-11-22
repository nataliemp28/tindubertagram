angular.module('travelApp')
  .controller('MainFeedController', MainFeedController)
  .controller('ProfileFeedController', ProfileFeedController);

MainFeedController.$inject = [ '$state' , 'MainFeed' ];
function MainFeedController($state, MainFeed) {
  const mainFeed = this;

  mainFeed.all = MainFeed.query();
}


ProfileFeedController.$inject = [ '$state', 'ProfileFeed' ];
function ProfileFeedController($state, ProfileFeed) {
  const profileFeed = this;

  profileFeed.all = ProfileFeed.query($state.params);
  console.log(profileFeed.all);
}
