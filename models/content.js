var mongoose = require('mongoose');

var Content = function() {

  var contentSchema = mongoose.Schema({
    title: String,
    path: String,
    body: String
  }, { collection: 'contents' } );

  return mongoose.model('Content', contentSchema);

}();

module.exports = Content;
