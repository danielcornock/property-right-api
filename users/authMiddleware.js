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
