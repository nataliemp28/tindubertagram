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

  profileFeed.feed = ProfileFeed.query($state.params);
  angular.forEach(profileFeed.feed, function(post){
    post.bodyText = $sce.trustAsHtml(post.bodyText);
  });
  profileFeed.all = profileFeed.feed;
}
