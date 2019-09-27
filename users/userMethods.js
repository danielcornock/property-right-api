const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utilities/config');

const signToken = id => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpires
  });
};

exports.checkPasswordMatch = userSchema => {
  userSchema.methods.correctPassword = async (
    candidatePassword,
    userPassword
  ) => {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.jwtCookieExpires * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (config.env === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);

  // Remove passwords from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};
