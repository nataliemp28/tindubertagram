angular.module('travelApp')
  .factory('MainFeed', MainFeed)
  .factory('ProfileFeed', ProfileFeed);

MainFeed.$inject = ['$resource'];
function MainFeed($resource) {
  return new $resource( '/users/feed' );
}

ProfileFeed.$inject = ['$resource'];
function ProfileFeed($resource) {
  return new $resource( '/users/:id/posts', { id: '@_id' } );
}
