const router = require('express').Router();
const authController = require('../controllers/auth');
const oauthController = require('../controllers/oauth');
const postsController = require('../controllers/posts');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook)
  .post('/auth/instagram', oauthController.instagram);

router.route('/posts')
  .post(secureRoute, imageUpload, postsController.create);

router.route('/posts/:id')
  .get(secureRoute, postsController.show)
  .put(secureRoute, postsController.update)
  .delete(secureRoute, postsController.delete);

router.route('/users/feed')
  .get(secureRoute, usersController.feed);

router.route('/users/:id/posts')
  .get(secureRoute, usersController.posts);

router.route('/users/:id/following/toggle')
  .put(secureRoute, usersController.toggleFollowing );

router.route('/users/:id/followers')
  .get(secureRoute, usersController.followers);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.route('/users')
  .get(usersController.search);

module.exports = router;
