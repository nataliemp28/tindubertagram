angular.module('travelApp')
  .factory('Post', Post);

Post.$inject = ['$resource'];
function Post($resource) {
  return new $resource('/posts/:id', { id: '@_id' }, {
    update: { method: 'PUT' },
    patch: {method: 'PATCH'}
  });
}
