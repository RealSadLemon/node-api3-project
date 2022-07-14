const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const usersModel = require('../users/users-model');
const postsModel = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usersModel.get()
    .then(users => {
      res.status(200).json(users)
    })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
  res.status(200).json(req.user);
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
});

router.put('/:id', middleware.validateUserId, middleware.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  usersModel.remove(req.params.id)
    .then(user => {
      res.status(200).json(req.user)
    })
});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  usersModel.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postsModel.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
});

// do not forget to export the router
module.exports = router;