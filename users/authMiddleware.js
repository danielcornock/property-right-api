const bcrypt = require('bcryptjs');

exports.hashPassword = userSchema => {
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
  });
};

exports.setBodyUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};
