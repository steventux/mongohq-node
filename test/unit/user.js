var helper          = require('../../test-helper'),
    Factory         = helper.Factory,
    passwordHash    = require('password-hash'),
    User            = helper.User;

var testUser;

describe("User", function() {
  before(function(done){
    Factory.create("user", { password: passwordHash.generate("p455w0rd") }, function(){ 
      testUser = User.findOne({username: "admin"});
      done(); 
    }); 
  });
  describe(function(){
    it("should authenticate with a password", function(done) {
      testUser.validatePassword("p455w0rd").should == true
      testUser.validatePassword("somethingElse").should == false
    });
  });
});
