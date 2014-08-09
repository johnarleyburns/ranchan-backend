var request = require('supertest')
  , express = require('express')
  , mocha = require('mocha')
  , ranchan = require('../lib/ranchan-express');
  
mocha.describe('GET /users', function(){
  mocha.it('respond with json', function(done){
    request(ranchan.app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})