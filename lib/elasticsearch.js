var request = require('request'),
    endpoint = function() {
      return process.env.ELASTICSEARCH_URL;
    },


exports.search = function(query) {
  request.get(endpoint() + "/lsl-content/content/_search?q=" + query, function(err, res, body){
    if (err){
      return JSON.parse(err);
    } else {
      var json = JSON.parse(body);
      return json.hits;
    }
  });
};

exports.submit = function(content) {
};
