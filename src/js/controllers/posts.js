angular.module('travelApp')
  .controller('CreatePostController', CreatePostController);


CreatePostController.$inject = ['$auth', 'Post', '$state'];
function CreatePostController($auth, Post, $state) {
  const newPost = this;

  newPost.post = {};
  newPost.post.user = $auth.getPayload()._id;

  function createPost(){
    Post.save(newPost.post, () =>{
      $state.go('home');
    });
  }

  newPost.create = createPost;
}
