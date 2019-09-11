const User = require('./userModel');
const catchAsync = require('../utilities/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newUser
      //TODO - Create generalised response function
    }
  });
});
