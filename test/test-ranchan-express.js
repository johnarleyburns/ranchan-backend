var request = require('supertest')
  , express = require('express')
  , mocha = require('mocha')
  , assert = require('assert')
  , ranchan = require('../lib/ranchan-express');
var app = ranchan.app;

var newUUID = function() { // v4 uuid
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

/*
mocha.describe('POST /thread', function() {
    mocha.it('respond with thread just posted', function(done) {
        request(app)
            .post('/t/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
*/
mocha.describe('GET /users', function(){
  mocha.it('respond with json', function(done){
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

mocha.describe("Posting is easy to test with supertest", function (){
    mocha.it("posts a new user to /users", function(done){
    app.use(express.bodyParser());
    var user = { username: 'marcus', email: 'bob@bob.com' };
    request(app)
        .post("/users/")
        .send(user)
        .expect(200)
        .expect("marcus is stored", done);
    });
});

mocha.describe("GET /no_such_path/", function (){
    mocha.it("should return 404 on no such path", function(done){
    request(app)
        .get("/no_such_path/")
        .expect(404)
        .end(done);
    });
});

mocha.describe("POST /threads/", function (){
    mocha.it("should return 400 when thread content not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        parentId: '0',
        nsfw: false
    };
    request(app)
        .post("/threads/")
        .send(thread)
        .expect(400)
        .expect('You must pass thread content when posting')
        .end(done);
    });
});

mocha.describe("POST /threads/", function (){
    mocha.it("should return 400 when parent Id not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        content: 'foo',
        nsfw: false
    };
    request(app)
        .post("/threads/")
        .send(thread)
        .expect(400)
        .expect('You must pass a parent Id when posting')
        .end(done);
    });
});

mocha.describe("POST /threads/", function (){
    mocha.it("should return 400 when thread not passed", function(done){
    app.use(express.bodyParser());
    request(app)
        .post("/threads/")
        .expect(400)
        .expect('You must pass a thread Id when posting')
        .end(done);
    });
});

mocha.describe("POST /threads/", function (){
    mocha.it("should return 400 when thread Id not UUID", function(done){
    app.use(express.bodyParser());
    var parentId = newUUID();
    var thread = {
        threadId: 'foo',
        parentId: parentId,
        content: 'bar',
        nsfw: false
    };
    request(app)
        .post("/threads/")
        .send(thread)
        .expect(400)
        .expect('You must pass a Version 4 UUID as thread Id when posting')
        .end(done);
    });
});

mocha.describe("POST /threads/", function (){
    mocha.it("should return 400 when parent Id not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        parentId: 'foo',
        content: 'bar',
        nsfw: false
    };
    request(app)
        .post("/threads/")
        .send(thread)
        .expect(400)
        .expect('You must pass a Version 4 UUID or "0" as parent Id when posting')
        .end(done);
    });
});


mocha.describe("POST /threads/", function (){
    mocha.it("posts a new top-level thread", function(done){
        this.timeout(10000);
    app.use(express.bodyParser());
    var threadId = newUUID();
    var content = 'ITT: testing on node.js top-level thread \\backslash "quotes"\nalso another line\nor two <a href="google.com">and a link</a>';
    var thread = {
        threadId: threadId,
        parentId: '0',
        content: content,
        nsfw: false
    };
    request(app)
        .post("/threads/")
        .send(thread)
        .expect(200)
        .expect(function(res){
            assert(res);
            assert(res.body);
            assert.equal(threadId, res.body.threadId);
            assert.equal('0', res.body.parentId);
            assert.equal(content, res.body.content);
            assert.equal(false, res.body.nsfw);
        })
        .end(done);
    });
});