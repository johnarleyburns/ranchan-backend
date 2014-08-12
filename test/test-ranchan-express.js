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

function randOctet() {
    return Math.round(Math.random()*255);
}

function randIp () {
    return randOctet()
   + '.' + randOctet()
   + '.' + randOctet()
   + '.' + randOctet();
} 

mocha.describe("GET /no_such_path/", function (){
    mocha.it("should return 404 on no such path", function(done){
    request(app)
        .get("/no_such_path/")
        .expect(404)
        .end(done);
    });
});

mocha.describe("POST /api/threads/", function (){
    mocha.it("should return 400 when x-forwarded-for not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        parentId: '0',
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .send(thread)
        .expect(400)
        .expect('You must pass x-forwarded-for when posting')
        .end(done);
    });
});

var ipAddress1 = randIp();
mocha.describe("POST /api/threads/", function (){
    mocha.it("should return 400 when thread content not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        parentId: '0',
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
        .send(thread)
        .expect(400)
        .expect('You must pass thread content when posting')
        .end(done);
    });
});

mocha.describe("POST /api/threads/", function (){
    mocha.it("should return 400 when parent Id not passed", function(done){
    app.use(express.bodyParser());
    var threadId = newUUID();
    var thread = {
        threadId: threadId,
        content: 'foo',
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
        .send(thread)
        .expect(400)
        .expect('You must pass a Version 4 UUID or "0" as parent Id when posting')
        .end(done);
    });
});

mocha.describe("POST /api/threads/", function (){
    mocha.it("should return 400 when thread not passed", function(done){
    app.use(express.bodyParser());
    request(app)
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
        .expect(400)
        .expect('You must pass a thread Id when posting')
        .end(done);
    });
});

mocha.describe("POST /api/threads/", function (){
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
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
        .send(thread)
        .expect(400)
        .expect('You must pass a Version 4 UUID as thread Id when posting')
        .end(done);
    });
});

mocha.describe("POST /api/threads/", function (){
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
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
        .send(thread)
        .expect(400)
        .expect('You must pass a Version 4 UUID or "0" as parent Id when posting')
        .end(done);
    });
});

var threadId = newUUID();
var content = 'ITT: testing on node.js top-level thread \\backslash "quotes"\nalso another line\nor two <a href="google.com">and a link</a>';
mocha.describe("POST /api/threads/", function (){
    mocha.it("posts a new top-level thread", function(done){
        this.timeout(10000);
    app.use(express.bodyParser());
    var thread = {
        threadId: threadId,
        parentId: '0',
        content: content,
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress1)
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

var threadId2 = newUUID();
var content2 = 'post reply test';
mocha.describe("POST /api/threads/", function (){
    mocha.it("posts a new reply-level thread", function(done){
        this.timeout(10000);
    app.use(express.bodyParser());
    var thread = {
        threadId: threadId2,
        parentId: threadId,
        content: content2,
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .send(thread)
        .set('x-forwarded-for', ipAddress1 + ', ' + '10.0.0.23')
        .expect(200)
        .expect(function(res){
            assert(res);
            assert(res.body);
            assert.equal(threadId2, res.body.threadId);
            assert.equal(threadId, res.body.parentId);
            assert.equal(content2, res.body.content);
            assert.equal(false, res.body.nsfw);
        })
        .end(done);
    });
});

var ipAddress2 = randIp();
var threadId3 = newUUID();
var content3 = 'post top level test two';
mocha.describe("POST /api/threads/", function (){
    mocha.it("posts a new top-level thread with different auth ip", function(done){
        this.timeout(10000);
    app.use(express.bodyParser());
    var thread = {
        threadId: threadId3,
        parentId: '0',
        content: content3,
        nsfw: false
    };
    request(app)
        .post("/api/threads/")
        .set('x-forwarded-for', ipAddress2)
        .send(thread)
        .expect(200)
        .expect(function(res){
            assert(res);
            assert(res.body);
            assert.equal(threadId3, res.body.threadId);
            assert.equal('0', res.body.parentId);
            assert.equal(content3, res.body.content);
            assert.equal(false, res.body.nsfw);
        })
        .end(done);
    });
});

mocha.describe("GET /api/threads/", function (){
    mocha.it("gets the top level list of threads", function(done){
    app.use(express.bodyParser());
    request(app)
        .get("/api/threads/")
        .expect(200)
        .expect(function(res){
            assert(res);
            assert(res.body);
            assert(res.body.length > 1);
            assert.equal(threadId3, res.body[0].threadId);
            assert.equal('0', res.body[0].parentId);
            assert.equal(content3, res.body[0].content);
            assert.equal(false, res.body[0].nsfw);
            assert.equal(threadId, res.body[1].threadId);
            assert.equal('0', res.body[1].parentId);
            assert.equal(content, res.body[1].content);
            assert.equal(false, res.body[1].nsfw);
        })
        .end(done);
    });
});


mocha.describe("GET /api/reports/", function (){
    mocha.it("should return 401 on non authenticated user", function(done){
    request(app)
        .get("/api/reports/")
        .expect(401)
        .end(done);
    });
});
