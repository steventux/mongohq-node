var helper          = require('../test-helper'),
    Factory         = helper.Factory,
    passwordHash    = require('password-hash');


describe("User", function() {
  describe("validPassword", function(){
    it("should authenticate with a password", function(done) {
      Factory.create("user", { password: passwordHash.generate("p455w0rd") }, function(user){ 
        user.validPassword("p455w0rd").should == true
        user.validPassword("somethingElse").should == false
        done();
      });
    });
  });
});
