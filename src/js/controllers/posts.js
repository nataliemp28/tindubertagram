angular.module('travelApp')
  .controller('CreatePostController', CreatePostController)
  .controller('ShowPostController', ShowPostController);


CreatePostController.$inject = ['$auth', 'Post', '$state'];
function CreatePostController($auth, Post, $state) {
  const newPost = this;

  newPost.post = {};
  newPost.post.user = $auth.getPayload()._id;

  function createPost(){
    Post.save(newPost.post, () =>{
      $state.reload();
    });
  }

  newPost.create = createPost;
}


ShowPostController.$inject = ['$auth', 'Post', '$state'];
function ShowPostController($auth, Post, $state) {
  const showPost = this;

  showPost.post = Post.get({ id: $state.params.id });
}
