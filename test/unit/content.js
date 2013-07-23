var helper          = require('../test-helper'),
    Factory         = helper.Factory;

describe("Content", function() {
  describe("bodyText", function(){
    it("should return the body excluding markdown and html", function(done){
      Factory.create('content', { body: "# My amazing content\n\n### It's so cool!\n\n**I love it**" }, function(content){
        content.bodyText().should.equal("My amazing content\n\nIts so cool!\n\nI love it");
        done();
      });
    });
  });
});
