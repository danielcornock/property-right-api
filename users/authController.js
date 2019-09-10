const User = require('./userModel');

exports.signup = async (req, res, next) => {
  // TODO add catchAsync when implemented
  try {
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
  } catch (err) {
    res.status(500).json({
      message: 'unsuccessful',
      error: err
    });
  }
};
