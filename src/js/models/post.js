angular.module('travelApp')
  .factory('Post', Post);

Post.$inject = ['$resource'];
function Post($resource) {
  return new $resource( '/posts' );
}
