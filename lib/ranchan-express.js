var express = require('express');
var passport = require('passport');
var DigestStrategy = require('passport-http').DigestStrategy;
var ranchan = require('./ranchan');
var db = require('./db');


var app = express();

//app.route('/forum/:fid/thread/:tid')
//app.route('/forum/:fid/thread/:tid')

app.configure(function() {
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req,res,next){
        req.db = db;
        next();
    });
    app.set('trust proxy', true);
    passport.use('digest', new DigestStrategy({ qop: 'auth' },
        function(username, done) {
            //User.findOne({ username: username }, function (err, user) {
            //if (err) { return done(err); }
            //if (!user) { return done(null, false); }
            var user = { username: 'bob', password: 'foo' };
            return done(null, user, user.password);
            //});
        },
        function(params, done) {
            // validate nonces as necessary
            done(null, true)
        }
    ));
});

app.post('/api/threads', function(req, res) {
    if (!req.ip || req.ip === '127.0.0.1') {
        res.send(400, "You must pass x-forwarded-for when posting");
        return;
    }
    if (!req.body) {
        res.send(400, "Post request body undefined");
        return;
    }
    var threadId = req.body.threadId;
    if (!threadId) {
	    res.send(400, "You must pass a thread Id when posting");
	    return;
    }
    var content = req.body.content;
    if (!content) {
	    res.send(400, "You must pass thread content when posting");
	    return;
    }

    var v4UuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    if (!threadId.match(v4UuidPattern)) {
	    res.send(400, "You must pass a Version 4 UUID as thread Id when posting");
	    return;
    }
    var parentId = req.body.parentId;
    if (parentId === undefined || (parentId !== '0' && !parentId.match(v4UuidPattern))) {
	    res.send(400, 'You must pass a Version 4 UUID or "0" as parent Id when posting');
	    return;
    }

    var thread = ranchan.newThread({
        threadId: threadId,
        parentId: parentId,
        content: content
    });
    var auth = ranchan.newAuth(req.ip, null);
    ranchan.postThread(thread, auth, function(err, thread) {
        if (err) {
            res.send(500, err);
            console.log(err);
            return;
        }
        res.send(200, thread);
    });
});

app.get('/api/threads', function(req, res) {
    ranchan.getThreads('0', function(err, threads) {
        if (err) {
            res.send(500, err);
            return;
        }
        res.send(200, threads);
    });
});

app.get('/api/reports', 
    passport.authenticate('digest', { session: true }),
    function(req, res) {
        console.log('user', req.user);
        if (!req.user) {
            res.send(401);
            return;
        }
        res.json(req.user);
});

/*
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // req.user.username
    res.send(200);
});
*/  

exports.app = app;
