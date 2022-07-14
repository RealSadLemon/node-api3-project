const userModel = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`<${new Date().toISOString()}> - ${req.method} to ${req.url} from ${req.get('Origin')}`)

  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params
  let user = await userModel.getById(id)
  if(user == null){
    res.status(404).json({ message: 'user not found' });
    return;
  }
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { body } = req;
  if(typeof body.name !== 'string' || body.name.trim() === ''){
    res.status(400).json({ message: 'missing required name field' });
    return;
  }
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { body } = req;
  if(typeof body.text !== 'string' || body.text.trim() === ''){
    res.status(400).json({ message: 'missing required text field' });
    return;
  }
  req.body.user_id = req.user.id;
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}