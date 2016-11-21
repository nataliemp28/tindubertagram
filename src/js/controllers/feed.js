angular.module('travelApp')
  .controller('MainFeedController', MainFeedController)
  .controller('ProfileFeedController', ProfileFeedController);

MainFeedController.$inject = [ '$state' , 'MainFeed' ];
function MainFeedController($state, MainFeed) {
  const mainFeed = this;

  mainFeed.all = MainFeed.query();
}


ProfileFeedController.$inject = [ '$state', 'ProfileFeed', '$sce' ];
function ProfileFeedController($state, ProfileFeed, $sce) {
  const profileFeed = this;

  ProfileFeed.query($state.params, (feed) => {
    profileFeed.feed = feed;
    profileFeed.all = profileFeed.feed;
  });
}
