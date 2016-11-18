angular.module('travelApp')
  .factory('User', User)
  .factory('UserSearch', UserSearch);

UserSearch.$inject = ['$resource'];
function UserSearch($resource) {
  return new $resource('/users');
}

User.$inject = ['$resource'];
function User($resource) {
  return new $resource('/users/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
