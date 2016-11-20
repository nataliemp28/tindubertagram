angular.module('travelApp')
  .factory('MainFeed', MainFeed)
  .factory('ProfileFeed', ProfileFeed);

MainFeed.$inject = ['$resource'];
function MainFeed($resource) {
  return new $resource( '/user/feed' );
}

ProfileFeed.$inject = ['$resource'];
function ProfileFeed($resource) {
  return new $resource( '/user/:id/posts', { id: '@_id' } );
}
