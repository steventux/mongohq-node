var helper          = require('../test-helper'),
    Content         = helper.Content,
    Factory         = helper.Factory;

describe('A CMS page', function() {

  before(function(done){
    Factory.create('content',{path:"foo",title:"Foo!",body:"### Some foo content"},function(){});
    this.browser.visit('/foo').
      then(done, done);
  });

  it('should display content by path', function(done){
    this.browser.success.should.be.ok
    this.browser.text("h3").should.equal("Some foo content");
    done();
  });
});
