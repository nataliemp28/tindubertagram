const router = require('express').Router();
const authController = require('../controllers/auth');
const postsController = require('../controllers/posts');
const usersController = require('../controllers/users');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/posts/:id')
  .get(postsController.show)
  .post(postsController.create)
  .put(postsController.update)
  .delete(postsController.delete);

router.route('/posts/user/feed/:id')
  .get(postsController.indexPublic);

router.route('/posts/user/:id')
  .get(postsController.indexPrivate);

router.route('/users/:id/following')
  .get(usersController.following);

router.route('/users/:id/followers')
  .get(usersController.followers);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

module.exports = router;
