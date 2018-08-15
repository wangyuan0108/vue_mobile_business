const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
let ObjectId = Schema.Types.ObjectId;
let SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
  UserId: ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now }
});
userSchema.pre('save', function(next) {
  // let user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});
userSchema.methods = {
  //密码比对的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  }
};
mongoose.model('User', userSchema);
