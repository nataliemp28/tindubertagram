angular
  .module('travelApp')
  .directive('createPost', createPost);

function createPost() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/createPost.html',
    controller: 'CreatePostController as createPost'
  };
}
