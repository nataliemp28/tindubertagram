angular.module('travelApp')
  .controller('MainFeedController', MainFeedController)
  .controller('ProfileFeedController', ProfileFeedController)
  .controller('SocialController', SocialController);

MainFeedController.$inject = [ '$state' , 'MainFeed' ];
function MainFeedController($state, MainFeed) {
  const mainFeed = this;

  mainFeed.all = MainFeed.query();
}


ProfileFeedController.$inject = [ '$state', 'ProfileFeed' ];
function ProfileFeedController($state, ProfileFeed) {
  const profileFeed = this;

  profileFeed.all = ProfileFeed.query($state.params);
}

SocialController.$inject = [ '$state', 'Post', '$auth'];
function SocialController($state, Post, $auth) {
  const social = this;

  function addLike(id) {
    const post = Post.get({ id: id });
    post.$promise.then(function(data){
      console.log(data);
      if (data.likes === null || undefined){
        data.likes = [];
      }
      data.likes.push({ userId: $auth.getPayload()._id });
      Post.patch({ id: id}, { likes: data.likes });
      $state.reload();
    });
  }

  social.addLike = addLike;

}
