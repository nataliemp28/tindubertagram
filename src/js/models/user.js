angular.module('tindubertagram')
  .factory('User', User);

function User($resource) {
  return new $resource('/users/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });

}
