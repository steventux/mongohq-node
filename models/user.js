var mongoose = require('mongoose');

var User = function() {

  var userSchema = mongoose.Schema({
    username: String,
    password: String
  }, { collection: 'users' } );

  userSchema.methods.validPassword = function(password) {
    return true;
  }
  return mongoose.model('User', userSchema);

}();


module.exports = User;
