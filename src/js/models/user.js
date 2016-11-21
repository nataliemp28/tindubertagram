angular.module('travelApp')
  .factory('User', User)
  .factory('UserSearch', UserSearch)
  .factory('Followers', Followers)
  .factory('FollowToggle', FollowToggle);

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

FollowToggle.$inject = ['$resource'];
function FollowToggle($resource) {
  return new $resource('/users/:id/following/toggle', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}

Followers.$inject = ['$resource'];
function Followers($resource) {
  return new $resource('/users/:id/followers', { id: '@_id' });
}
