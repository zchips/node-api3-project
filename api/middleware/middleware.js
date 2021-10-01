const User = require('../users/users-model');
const Post = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('req.method', req.method);
  console.log('req.url', req.url);
  console.log('req.timestamp', Date.now());
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const {id} = req.params;
    const user = await User.getById(id);
    if(user){
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: "user not found",
      })
    }
  } catch (error){
    next(error);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    next({
      status: 400,
      message: "missing required name field",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text){
    next({
      status: 400,
      message: "Missing required text field.",
    })
  } else {
    next()
  }
}

const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'Request not found'
  })
}

const errorHandling = (error, req, res, next) => { 
  const status = error.status || 500
  res.status(status).json({
    message: error.message,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  notFound,
  errorHandling
}