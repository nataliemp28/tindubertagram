const router = require('express').Router();
const authController = require('../controllers/auth');
const oauthController = require('../controllers/oauth');
const postsController = require('../controllers/posts');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook)
  .post('/auth/instagram', oauthController.instagram);

router.route('/posts')
  .post(postsController.create);

router.route('/posts/:id')
  .get(postsController.show)
  .put(postsController.update)
  .delete(postsController.delete);

router.route('/user/feed')
  .get(secureRoute, usersController.feed);

router.route('/user/posts')
  .get(secureRoute, usersController.posts);

router.route('/user/following')
  .get(secureRoute, usersController.following);

router.route('/user/followers')
  .get(secureRoute, usersController.followers);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

module.exports = router;
