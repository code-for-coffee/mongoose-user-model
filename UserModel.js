const Mongoose = require('mongoose')
const BCrypt = require('bcryptjs')
const SALT_FACTOR = 10

let UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  passwordHash: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        let pattern = /^\S+@\S+$/
        return pattern.test(val)
      },
      message: '{VALUE} is not a valid email'
    }
  }
  updated_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  // performing actions
  let user = this,
      salt = BCrypt.genSaltSync(SALT_FACTOR)
  // only hash the password if it has been modified / is new
  if (!user.isModified('passwordHash')) return next()
  BCrypt.hash(user.passwordHash, salt, (err, hash) => {
    console.log(err)
    if (err) return next(err)
    // override the plaintext password with the hashed one
    user.passwordHash = hash
    next()
  })
})
UserSchema.methods.comparePassword = function(attempt, callback) {
  BCrypt.compare(attempt, this.passwordHash, (err, isMatch) => {
    if (err) return cb(err)
    else cb(null, isMatch)
  })
}
UserSchema.methods.comparePasswordSync = function(attempt) {
  return BCrypt.compareSync(attempt, this.passwordHash)
}

// export
module.exports = Mongoose.model('User', TaskSchema)
