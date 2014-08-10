var express = require('express');
var ranchan = require('./ranchan');
var db = require('./db');

var app = express();

//app.route('/forum/:fid/thread/:tid')
//app.route('/forum/:fid/thread/:tid')
app.use(express.bodyParser());

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/users', function(req, res){
  res.send(200, { name: 'tobi' });
});
app.post('/users', function(req, res){
    if (!req.body) {
        res.send(500, "Missing post request body");
        return;
    }
	var name = req.body.username;
	var email = req.body.email;
	if (!name || !email) {
	    res.send(500, "Missing username or email");
	    return;
	}
    console.log('req', Object.keys(req).sort());
	// store it
	res.send(200, name + " is stored");
});

app.post('/threads', function(req, res){
    if (!req.body) {
        res.send(500, "Post request body undefined");
        return;
    }
    var threadId = req.body.threadId;
    if (!threadId) {
	    res.send(400, "You must pass a thread Id when posting");
	    return;
    }
    var parentId = req.body.parentId;
    if (!parentId) {
	    res.send(400, "You must pass a parent Id when posting");
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
    if (parentId !== '0' && !parentId.match(v4UuidPattern)) {
	    res.send(400, 'You must pass a Version 4 UUID or "0" as parent Id when posting');
	    return;
    }

    var thread = ranchan.newThread({
        threadId: threadId,
        parentId: parentId,
        content: content
    });
    var auth = ranchan.newAuth('1.2.3.4', null);
    ranchan.postThread(thread, auth, function(err, thread) {
        if (err) {
            res.send(500, err);
            return;
        }
        res.send(200, thread);
    });
});

exports.app = app;
