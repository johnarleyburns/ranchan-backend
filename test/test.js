var mocha = require('mocha');
var assert = require('assert');
var db = require('../lib/db');
var ranchan = require('../lib/ranchan');

var throwError = function(err) {
    throw err;
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
var ipAddress = randIp();
var ipAddress2 = randIp();
var ipAddress3 = randIp();
var ipAddress4 = randIp();
var bannedIpAddress = randIp();
var bannedIpAddress2 = randIp();
var modIpAddress = randIp();
var modIpAddress2 = randIp();

var modId1 = 'johnarleyburns@gmail.com';

var auth1;
var auth2;
var auth3;
var auth4;
var modAuth1;
var bannedAuth1;
var bannedAuth2;
var bannedModAuth1;
mocha.describe('ranchan', function(){
    mocha.describe('newAuth', function() {
        mocha.it('should generate new auth objects', function() {
            auth1 = ranchan.newAuth(ipAddress, null);
            auth2 = ranchan.newAuth(ipAddress2, null);
            auth3 = ranchan.newAuth(ipAddress3, null);
            auth4 = ranchan.newAuth(ipAddress4, null);
            modAuth1 = ranchan.newAuth(modIpAddress2, modId1);
            bannedAuth1 = ranchan.newAuth(bannedIpAddress, null);
            bannedAuth2 = ranchan.newAuth(bannedIpAddress2, null);
            bannedModAuth1 = ranchan.newAuth(modIpAddress, modId1);
            assert.equal(ipAddress, auth1.ipAddress);
            assert(!auth1.moderatorId);
            assert.equal(ipAddress2, auth2.ipAddress);
            assert.equal(modIpAddress2, modAuth1.ipAddress);
            assert.equal(modId1, modAuth1.moderatorId);
            assert.equal(bannedIpAddress, bannedAuth1.ipAddress);
            assert.equal(bannedIpAddress2, bannedAuth2.ipAddress);
            assert.equal(modIpAddress, bannedModAuth1.ipAddress);
            assert.equal(modId1, bannedModAuth1.moderatorId);
        });
    });
});

var thread1;
var thread2;
var thread3;
var thread4;
var thread5;
var thread6;
var thread7;
var thread8;
var thread9;
var thread10;
var thread11;
var thread12;
var threadId1;
var threadId2;
var threadId3;
var threadId4;
var threadId5;
var threadId6;
var threadId7;
var threadId8;
var threadId9;
var threadId10;
var threadId11;
var threadId12;

mocha.describe('ranchan', function(){
    mocha.describe('newThreadId', function() {
        mocha.it('should generate unique and propertly formatted v4 uuids', function() {
            var v4UuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
            
            threadId1 = ranchan.newThreadId();
            assert(threadId1.match(v4UuidPattern));
            threadId2 = ranchan.newThreadId();
            assert(threadId2.match(v4UuidPattern));
            assert(threadId1 !== threadId2);
            threadId3 = ranchan.newThreadId();
            threadId4 = ranchan.newThreadId();
            threadId5 = ranchan.newThreadId();
            threadId6 = ranchan.newThreadId();
            threadId7 = ranchan.newThreadId();
            threadId8 = ranchan.newThreadId();
            threadId9 = ranchan.newThreadId();
            threadId10 = ranchan.newThreadId();
            threadId11 = ranchan.newThreadId();
            threadId12 = ranchan.newThreadId();
            
            var first = new Date();
            var second = new Date();
            var third = new Date();
            var fourth = new Date();
            var fifth = new Date();
            var sixth = new Date();
            var seventh = new Date();
            var eighth = new Date();
            var nineth = new Date();
            var tenth = new Date();
            var eleventh = new Date();
            var twelvth = new Date();
            first.setMinutes(first.getMinutes() - 256);
            second.setMinutes(second.getMinutes() - 128);
            third.setMinutes(third.getMinutes() - 64);
            fourth.setMinutes(fourth.getMinutes() - 32);
            fifth.setMinutes(fifth.getMinutes() - 16);
            sixth.setMinutes(sixth.getMinutes() - 8);
            seventh.setMinutes(seventh.getMinutes() - 4);
            eighth.setMinutes(eighth.getMinutes() - 3);
            nineth.setMinutes(eighth.getMinutes() - 2);
            tenth.setMinutes(eighth.getMinutes() - 1);
            twelvth.setMinutes(third.getMinutes() - 64);
            twelvth.setSeconds(third.getSeconds() + 30);
            thread1 = ranchan.newThread({
                threadId: threadId1,
                parentId: 0,
                content: 'ITT: testing on node.js top-level thread',
                nickname: 'bob the builder',
                date: first,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread2 = ranchan.newThread({
                threadId: threadId2,
                parentId: threadId1,
                content: 'test reply thread',
                nickname: '',
                date: second,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread3 = ranchan.newThread({
                threadId: threadId3,
                parentId: '0',
                content: 'An entirely different top level thread',
                nickname: '',
                date: third,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread4 = ranchan.newThread({
                threadId: threadId4,
                parentId: threadId1,
                content: 'yet another reply',
                nickname: '',
                date: fourth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread5 = ranchan.newThread({
                threadId: threadId5,
                parentId: '0',
                content: 'top level thread to delete',
                nickname: '',
                date: fifth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread6 = ranchan.newThread({
                threadId: threadId6,
                parentId: threadId1,
                content: 'reply level thread to delete',
                nickname: '',
                date: sixth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread7 = ranchan.newThread({
                threadId: threadId7,
                parentId: '0',
                content: 'top level thread override by mod',
                nickname: '',
                date: seventh,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });  
            thread8 = ranchan.newThread({
                threadId: threadId8,
                parentId: '0',
                content: 'top level thread ban override by mod',
                nickname: '',
                date: eighth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread9 = ranchan.newThread({
                threadId: threadId9,
                parentId: '0',
                content: 'top level thread ban override by mod for expired',
                nickname: '',
                date: nineth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread10 = ranchan.newThread({
                threadId: threadId10,
                parentId: '0',
                content: 'top level thread added before ban for expired test',
                nickname: '',
                date: tenth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread11 = ranchan.newThread({
                threadId: threadId11,
                parentId: threadId1,
                content: 'reply thread bump limit test',
                nickname: 'bumpper',
                date: eleventh,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
            thread12 = ranchan.newThread({
                threadId: threadId12,
                parentId: '0',
                content: 'top level thread timer limit test',
                nickname: 'frequentus',
                date: twelvth,
                imageBytes: 0,
                width: 0,
                height: 0,
                flags: 0,
                chats: 0,
                images: 0
            });
        });
    });
});

var ban1;
var ban2;
var modBan1;
mocha.describe('ranchan', function() {
    mocha.describe('newBan()', function() {
        mocha.it('should create new ban object', function() {
            var now = new Date();
            var end = new Date();
            end.setDate(end.getDate() + 30); // default 30 days
            ban1 = ranchan.newBan({
                ipAddress: bannedIpAddress,
                banDate: now,
                endDate: end,
                reason: 'spam',
                moderatorId: modId1
            });
            // expired ban
            var now2 = new Date();
            var end2 = new Date();
            now2.setDate(now2.getDate() - 31);
            end2.setDate(end2.getDate() - 1);
            ban2 = ranchan.newBan({
                ipAddress: bannedIpAddress2,
                banDate: now2,
                endDate: end2,
                reason: 'rules',
                moderatorId: modId1
            });
            // banned mod
            var now3 = new Date();
            var end3 = new Date();
            end.setDate(end.getDate() + 30); // default 30 days
            modBan1 = ranchan.newBan({
                ipAddress: modIpAddress,
                banDate: now,
                endDate: end,
                reason: 'spam',
                moderatorId: modId1
            });
        });
    });
});

var banError;        
mocha.describe('ranchan', function() {
    mocha.describe('newBanError()', function() {
        mocha.it('should create new ban error object', function() {
            var message = "You are banned until " + ban1.endDate;
            banError = ranchan.newBanError(message);
            assert(banError);
            assert.equal('BanError', banError.name);
            assert.equal(message, banError.message);
        });
    });
});

var authError;        
var authIPError;
mocha.describe('ranchan', function() {
    mocha.describe('newAuthError()', function() {
        mocha.it('should create new auth error object', function() {
            var message = "Only a moderator can do that";
            authError = ranchan.newAuthError(message);
            assert(authError);
            assert.equal('AuthError', authError.name);
            assert.equal(message, authError.message);
            var message2 = "Mismatched IPs";
            authIPError = ranchan.newAuthError(message2);
            assert(authIPError);
            assert.equal('AuthError', authIPError.name);
            assert.equal(message2, authIPError.message);
        });
    });
});

var bumpError;        
mocha.describe('ranchan', function() {
    mocha.describe('newBumpError()', function() {
        mocha.it('should create new bump error object', function() {
            var message = "Thread has reached the bump limit";
            bumpError = ranchan.newBumpError(message);
            assert(bumpError);
            assert.equal('BumpError', bumpError.name);
            assert.equal(message, bumpError.message);
        });
    });
});

var existsError;        
mocha.describe('ranchan', function() {
    mocha.describe('newExistsError()', function() {
        mocha.it('should create new exists error object', function() {
            var message = "Parent thread does not exist";
            existsError = ranchan.newExistsError(message);
            assert(existsError);
            assert.equal('ExistsError', existsError.name);
            assert.equal(message, existsError.message);
        });
    });
});

// thread is same iff equal
mocha.describe('ranchan', function(){
    mocha.describe('sameVisibleThread', function() {
        mocha.it('same threads should be equal iff equal', function(){
            assert(ranchan.sameVisibleThread(thread1, thread1));
            assert(!ranchan.sameVisibleThread(thread1, thread2));
        })
    })
});

// ban is same iff equal
mocha.describe('ranchan', function(){
    mocha.describe('sameBan', function() {
        mocha.it('same bans should be equal iff equal', function(){
            assert(ranchan.sameBan(ban1, ban1));
            assert(!ranchan.sameBan(ban1, {}));
        })
    })
});

// ban is same iff equal
mocha.describe('ranchan', function(){
    mocha.describe('sameError', function() {
        mocha.it('same errors should be equal iff equal', function(){
            assert(ranchan.sameError(banError, banError));
            assert(!ranchan.sameError(banError, {}));
            assert(ranchan.sameError(authError, authError));
            assert(!ranchan.sameError(authError, {}));
        })
    })
});

var isThreadIdInList = function(threads, threadId, parentId) {
    var exists = false;
     threads.forEach(function(v) {
         if (parentId !== undefined && v.parentId === parentId && v.threadId === threadId) {
             exists = true;
         }
         else if (parentId === undefined && v.threadId === threadId) {
             exists = true;
         }
     });
     return exists;
};

var isIPAddressInBanList = function(bans, ipAddress) {
    var exists = false;
     bans.forEach(function(v) {
         if (v.ipAddress === ipAddress) {
             exists = true;
         }
     });
     return exists;
};

var isThreadIdInReportList = function(reports, threadId) {
    var exists = false;
     reports.forEach(function(v) {
         if (v.threadId === threadId) {
             exists = true;
         }
     });
     return exists;
};

// start DB access
mocha.describe('ranchan', function(){
    mocha.describe('clearAllData', function() {
        mocha.it('should clear all data before testing', function(done) {
            this.timeout(10000);
            ranchan.clearAllData(function(err) {
                assert(!err);
                done();                
            });
        });
    });
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should return list at first without test threads', function(done) {
            this.timeout(5000);
            ranchan.getThreads('0', function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length === 0);
                assert(!isThreadIdInList(threads, threadId1));
                assert(!isThreadIdInList(threads, threadId2));
                assert(!isThreadIdInList(threads, threadId3));
                assert(!isThreadIdInList(threads, threadId4));
                done();
            });
        })
    })
});

// GET /a/t/<thread1> - should not exist
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should not return non-posted thread', function(done) {
            ranchan.getThread(thread1.threadId, function(err, thread) {
                assert(!err);
                assert(!thread);
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should not post thread reply to non-existent thread', function(done){
            ranchan.postThread(thread2, auth1, function(err, thread){
                assert(err);
                assert.equal("ExistsError", err.name);
                assert.equal("Parent thread does not exist", err.message);
                done();
            });
        })
    })
});

// GET /a/t/<thread2> - should not exist
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should not return non-posted thread reply', function(done) {
            ranchan.getThread(thread2.threadId, function(err, thread) {
                assert(!err);
                assert(!thread);
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post top level thread, ignoring calculated fields', function(done){
            var threadx = ranchan.newThread(thread1);
            var ago = new Date();
            ago.setDate(ago.getDate() - 100);
            threadx.date = ago;
            threadx.lastBump = ago;
            threadx.chats = 99;
            ranchan.postThread(threadx, auth1, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread1, thread));
                assert.notEqual(ago, thread.date.getTime());
                assert.notEqual(ago, thread.lastBump);
                assert.notEqual(99, thread.chats);
                done();
            });
        })
    })
})
// should not be able to set post date, lastBump, or chats fields when posting

// GET /a/t/<threadId1> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find top level thread just created with hidden ipAddress and zero chats', function(done) {
            ranchan.getThread(threadId1, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(!thread.ipAddress);
                assert(ranchan.sameVisibleThread(thread1, thread));
                assert.equal(0, thread.chats);
                done();
            });
        })
    })
});

// GET /a/t/<thread1> 
mocha.describe('ranchan', function() {
    mocha.describe('getThreadWithIP()', function() {
        mocha.it('should return thread matching posters IP', function(done) {
            ranchan.getThreadWithIP(thread1.threadId, auth1.ipAddress, function(err, thread) {
                assert(!err);
                assert(thread);
                done();
            });
        })
    })
});

// GET /a/t/<thread1> 
mocha.describe('ranchan', function() {
    mocha.describe('getThreadWithIP()', function() {
        mocha.it('should not return thread not matching posters IP', function(done) {
            ranchan.getThreadWithIP(thread1.threadId, bannedAuth1.ipAddress, function(err, thread) {
                assert(!err);
                assert(!thread);
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post thread reply', function(done){
            ranchan.postThread(thread2, auth1, function(err, thread){
                assert(!err);
                assert(ranchan.sameVisibleThread(thread2, thread));  
                done();
            });
        })
    })
});

// GET /a/t/<threadId2> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find thread reply', function(done) {
            ranchan.getThread(threadId2, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread2, thread));
                done();
            });
        })
    })
});

// GET /a/t/<threadId2> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find parent thread with updated chat count', function(done) {
            ranchan.getThread(threadId1, function(err, thread) {
                assert(!err);
                assert(thread);
                assert.equal(1, thread.chats);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('getPostBlockingThread()', function() {
        mocha.it('should find thread blocking posting due to timer limit', function(done){
            ranchan.getPostBlockingThread(auth1.ipAddress, thread4.parentId, function(err, blockingThread){
                assert(!err);
                assert(blockingThread);
                assert(ranchan.sameVisibleThread(thread2, blockingThread));
                done();
            });
        });
    });
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should not post second thread reply due to timer limit', function(done){
            ranchan.postThread(thread4, auth1, function(err, thread){
                assert(err);
                assert.equal("WaitError", err.name);
                assert.equal("You must wait 5 seconds between posts", err.message);
                done();
            });
        })
    })
});

// GET /a/t/<threadId2> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should not find thread reply attempted to post before timer limit expired', function(done) {
            ranchan.getThread(threadId4, function(err, thread) {
                assert(!err);
                assert.equal(null, thread);
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 now in top level but not reply thread2', function(done) {
            ranchan.getThreads('0', function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1));
                assert(!isThreadIdInList(threads, threadId2));
                done();
            });
        })
    })
});

// GET /a/t/<threadId1>/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 and thread2 as thread parent and reply with correct chat count', function(done) {
            ranchan.getThreads(threadId1, function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(isThreadIdInList(threads, threadId2, threadId1));
                assert.equal(1, threads[0].chats);
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post another top level thread from different IP', function(done){
            ranchan.postThread(thread3, auth2, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread3, thread));  
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should not post another top level thread from same IP just used before timer limit', function(done){
            ranchan.postThread(thread12, auth2, function(err, thread){
                assert(err);
                assert("WaitError", err.name);
                assert("You must wait 60 seconds between threads");
                done();
            });
        })
    })
});

// GET /a/t/<threadId3> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find another top level thread just created', function(done) {
            ranchan.getThread(threadId3, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread3, thread));
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread3 now in top level ordered before thread1', function(done) {
            ranchan.getThreads('0', function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(isThreadIdInList(threads, threadId3, '0'));
                var pos1 = -1;
                var pos3 = -1;
                var b1, b3;
                threads.forEach(function(v, i) {
                    switch (v.threadId) {
                        case threadId1:
                            pos1 = i;
                            b1 = v.lastBump;
                            break;
                        case threadId3:
                            pos3 = i;
                            b3 = v.lastBump;
                            break;
                        default:
                            ;   
                    }
                });
                //assert.equal(b3, b1);
                assert(pos3 < pos1);
                ;
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post another reply level thread', function(done){
            ranchan.postThread(thread4, auth2, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread4, thread));  
                done();
            });
        })
    })
});

// GET /a/t/<threadId3> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find another reply level thread just created', function(done) {
            ranchan.getThread(threadId4, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread4, thread));
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1,thread2,thread4 in order for thread1 parent with correct chats count', function(done) {
            ranchan.getThreads(threadId1, function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(isThreadIdInList(threads, threadId2, threadId1));
                assert(isThreadIdInList(threads, threadId4, threadId1));
                assert.equal(2, threads[0].chats);
                var pos1 = -1;
                var pos2 = -1;
                var pos4 = -1;
                threads.forEach(function(v, i) {
                    switch (v.threadId) {
                        case threadId1:
                            pos1 = i;
                            break;
                        case threadId2:
                            pos2 = i;
                            break;
                        case threadId4:
                            pos4 = i;
                            break;
                        default:
                            ;   
                    }
                });
                assert(pos2 > pos1);
                assert(pos4 > pos2);
                ;
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 bumped in top level above thread3', function(done) {
            ranchan.getThreads('0', function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(isThreadIdInList(threads, threadId3, '0'));
                var pos1 = -1;
                var pos3 = -1;
                threads.forEach(function(v, i) {
                    switch (v.threadId) {
                        case threadId1:
                            pos1 = i;
                            break;
                        case threadId3:
                            pos3 = i;
                            break;
                        default:
                            ;   
                    }
                });
                assert(pos1 < pos3);
                done();
            });
        })
    })
});

// POST /a/t - thread for deletion
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should create a top-level thread to be used for deletion', function(done){
            ranchan.postThread(thread5, auth3, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread5, thread));  
                done();
            });
        })
    })
});

// POST /a/t - thread for deletion
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should create a reply-level thread to be used for deletion', function(done){
            ranchan.postThread(thread6, auth4, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread6, thread));  
                done();
            });
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should fail to delete a top level thread since not moderator', function(done){
            ranchan.deleteThread(threadId5, '0', auth1, function(err, thread){
                assert(err);
                assert(ranchan.sameError(authError, err));
                done();
            });
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should delete a top level thread as moderator', function(done){
            ranchan.deleteThread(threadId5, '0', modAuth1, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread5, thread));  
                done();
            });
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should delete a reply-level thread and update parent', function(done){
            ranchan.deleteThread(threadId6, threadId1, modAuth1, function(err, thread, parent){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread6, thread));
                assert(parent);
                assert.equal(threadId1, parent.threadId);
                assert.equal(2, parent.chats);
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 parent without deleted thread5 and correct chats count', function(done) {
            ranchan.getThreads(threadId1, function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(!isThreadIdInList(threads, threadId5, threadId1));
                assert.equal(2, threads[0].chats);
                done();
            });
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should not return deleted top-level thread', function(done) {
            ranchan.getThreads('0', function(err, threads) {
                assert(!err);
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(!isThreadIdInList(threads, threadId5, threadId1));
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThread()', function() {
        mocha.it('should be able to post thread before ban', function(done) {
            ranchan.postThread(thread7, bannedAuth1, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread7, thread));
                done();
            });
        });
    });
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should not be able to add to the ban list as non-moderator', function(done){
            ranchan.postBan(ban1, threadId1, auth1, function(err, ban){
                assert(err);
                assert.equal('AuthError', err.name);
                assert.equal('Only a moderator can do that', err.message);
                done();
            });
        })
    })
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should allow moderator to add IP from a thread to the ban list', function(done){
            ranchan.postBan(ban1, threadId7, modAuth1, function(err, ban){
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            });
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getBan', function() {
        mocha.it('should find ban which was just added', function(done) {
            ranchan.getBan(bannedIpAddress, function(err, ban) {
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            });
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getActiveBan', function() {
        mocha.it('should find active ban which was just added', function(done) {
            ranchan.getActiveBan(bannedIpAddress, function(err, ban) {
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('getBans()', function() {
        mocha.it('should not make bans visible for non-mods', function(done){
            ranchan.getBans(auth1, function(err, bans){
                assert(err);
                assert.equal("AuthError", err.name);
                assert.equal("Only a moderator can view bans", err.message);
                done();
            });
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have ban1 in ban list', function(done) {
            ranchan.getBans(modAuth1, function(err, bans) {
                assert(!err);
                assert(bans);
                assert(bans.length >= 0);
                assert(isIPAddressInBanList(bans, bannedIpAddress));
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThreadBan', function() {
        mocha.it('should not be able to post top level thread due to ban', function(done) {
            ranchan.postThread(thread7, bannedAuth1, function(err, thread) {
                assert(err);
                assert(ranchan.sameError(banError, err));
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThreadOverride', function() {
        mocha.it('should be able to post top level thread as moderator before banned', function(done) {
            ranchan.postThread(thread8, modAuth1, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread8, thread));
                done();
            });
        })
    })
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should add moderator IP to the ban list', function(done){
            ranchan.postBan(modBan1, threadId8, modAuth1, function(err, ban){
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(modBan1, ban));
                done();
            });
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should delete a top level thread as moderator even if moderator IP on ban list', function(done){
            ranchan.deleteThread(threadId8, '0', modAuth1, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread8, thread));  
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThreadOverride', function() {
        mocha.it('should be able to post top level thread overriding ban if moderator', function(done) {
            ranchan.postThread(thread9, modAuth1, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread9, thread));
                done();
            });
        })
    })
});

// POST /a/d/<ipAddress> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteBan', function() {
        mocha.it('should delete a ban', function(done){
            ranchan.deleteBan(bannedIpAddress, function(err, ban){
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            });
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have ban1 no longer in ban list', function(done) {
            ranchan.getBans(modAuth1, function(err, bans) {
                assert(!err);
                assert(bans);
                assert(bans.length >= 0);
                assert(!isIPAddressInBanList(bans, bannedIpAddress));
                done();
            });
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThread()', function() {
        mocha.it('should be able to post thread before ban for expired test', function(done) {
            ranchan.postThread(thread10, bannedAuth2, function(err, thread) {
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread10, thread));
                done();
            });
        });
    });
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should add expired IP to the ban list', function(done){
            ranchan.postBan(ban2, threadId10, modAuth1, function(err, ban){
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban2, ban));
                done();
            });
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getBan', function() {
        mocha.it('should find expired ban which was just added before clean', function(done) {
            ranchan.getBan(bannedIpAddress2, function(err, ban) {
                assert(!err);
                assert(ban);
                assert(ranchan.sameBan(ban2, ban));
                done();
            });
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getActiveBan', function() {
        mocha.it('should not find expired ban which was just added before clean as active', function(done) {
            ranchan.getActiveBan(bannedIpAddress2, function(err, ban) {
                assert(!err);
                assert(!ban);
                done();
            });
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getActiveBans', function() {
        mocha.it('should not have expired bans in the active ban list', function(done) {
            ranchan.getActiveBans(modAuth1, function(err, bans) {
                assert(!err);
                assert(bans);
                assert(bans.length >= 0);
                assert(!isIPAddressInBanList(bans, bannedIpAddress2));
                done();
            });
        });
    });
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('cleanBans', function() {
        mocha.it('should clean ban list of expired entries', function(done) {
            ranchan.cleanBans(function(err) {
                assert(!err);
                done();
            });
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have expired ban no longer in ban list', function(done) {
            ranchan.getBans(modAuth1, function(err, bans) {
                assert(!err);
                assert(bans);
                assert(bans.length >= 0);
                assert(!isIPAddressInBanList(bans, bannedIpAddress2));
                done();
            });
        })
    })
});

// normally never called
mocha.describe('ranchan', function() {
    mocha.describe('setBumpLimit(), getBumpLimit()', function() {
        mocha.it('should set bump limit to 2', function() {
            var limit = 2;
            ranchan.setBumpLimit(limit);
            assert(limit, ranchan.getBumpLimit());
        })
    })
});

// POST /a/t/
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should fail to add a reply to a thread already at the bump limit', function(done){
            ranchan.postThread(thread11, auth3, function(err, thread){
                assert(err);
                assert.equal(bumpError.name, err.name);
                assert.equal(bumpError.message, err.message);
                assert(ranchan.sameError(bumpError, err));
                done();
            });
        })
    })
});

// for testing only
mocha.describe('ranchan', function() {
    mocha.describe('setBumpLimit(), getBumpLimit()', function() {
        mocha.it('should set bump limit back to default 150', function() {
            var limit = 150;
            ranchan.setBumpLimit(limit);
            assert(limit, ranchan.getBumpLimit());
        })
    })
});

// POST /a/t - thread for deletion
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should add a reply to a thread below the bump limit', function(done){
            ranchan.postThread(thread11, auth3, function(err, thread){
                assert(!err);
                assert(thread);
                assert(ranchan.sameVisibleThread(thread11, thread));  
                done();
            });
        })
    })
});

// get report for non-mod auth3 not found
mocha.describe('ranchan', function(){
    mocha.describe('getBlockingReport()', function() {
        mocha.it('should not find a blocking report for an ipAddress before it is created', function(done){
            ranchan.getBlockingReport(auth3.ipAddress, function(err, report){
                assert(!err);
                assert(!report);
                done();
            });
        })
    })
});

var report1;
var report2;
var report3;
mocha.describe('ranchan', function(){
    mocha.describe('newReport()', function() {
        mocha.it('should create a new report in memory', function(done){
            report1 = ranchan.newReport({
                ipAddress: auth3.ipAddress,
                threadId: threadId11,
                reason: "spam"
            });
            assert(report1);
            assert.equal(auth3.ipAddress, report1.ipAddress);
            assert.equal(threadId11, report1.threadId);
            assert.equal("spam", report1.reason);
            report2 = ranchan.newReport({
                ipAddress: auth3.ipAddress,
                threadId: threadId12,
                reason: "spam"
            });
            report3 = ranchan.newReport({
                ipAddress: auth1.ipAddress,
                threadId: "non-existent-thread",
                reason: "spam"
            });
            done();
        })
    })
});

// non-mod auth3 can create report1 which auto-deletes thread
// POST /a/r/
mocha.describe('ranchan', function(){
    mocha.describe('postReport()', function() {
        mocha.it('should post a report for the associated ipAddress and thread', function(done){
            this.timeout(5000);
            ranchan.postReport(report1, auth3, function(err, report){
                assert(!err);
                assert(report);
                assert.equal(auth3.ipAddress, report.ipAddress);
                assert.equal(report1.threadId, report.threadId);
                assert.equal(thread11.content, report.content);
                assert.equal(thread11.ipAddress, report.threadIpAddress);
                assert.equal(report1.reason, report.reason);
                assert.equal(null, report.action);
                assert.equal(false, report.resolved);
                done();
            });
        })
    })
});

// get active report returns report1 for auth3
mocha.describe('ranchan', function(){
    mocha.describe('getBlockingReport()', function() {
        mocha.it('should find a blocking report for an ipAddress after created', function(done){
            ranchan.getBlockingReport(auth3.ipAddress, function(err, report){
                assert(!err);
                assert(report);
                assert.equal(auth3.ipAddress, report.ipAddress);
                assert.equal(report1.threadId, report.threadId);
                assert.equal(thread11.content, report.content);
                assert.equal(report1.reason, report.reason);
                assert.equal(false, report.resolved);
                done();
            });
        })
    })
});

// get report for non-mod auth1 not found
mocha.describe('ranchan', function(){
    mocha.describe('getBlockingReport()', function() {
        mocha.it('should not find a blocking report for auth never reported', function(done){
            ranchan.getBlockingReport(auth1.ipAddress, function(err, report){
                assert(!err);
                assert(!report);
                done();
            });
        })
    })
});

// non-mod auth3 cannot create report2 if report1 within 5 minutes ago
// POST /a/r/
mocha.describe('ranchan', function(){
    mocha.describe('postReport()', function() {
        mocha.it('should not create a new report before report timer expires', function(done){
            ranchan.postReport(report2, auth3, function(err, report){
                assert(err);
                assert.equal("WaitError", err.name);
                assert.equal("You must wait 60 seconds between reporting threads", err.message);
                done();
            });
        })
    })
});

// non-mod auth3 cannot create report3 for non-existent thread
// POST /a/r/
mocha.describe('ranchan', function(){
    mocha.describe('postReport()', function() {
        mocha.it('should not post a report for a non-existent thread', function(done){
            ranchan.postReport(report3, auth1, function(err, report){
                assert(err);
                assert.equal("ExistsError", err.name);
                assert.equal("Cannot report, thread does not exist", err.message);
                done();
            });
        })
    })
});

// POST /a/r/
mocha.describe('ranchan', function(){
    mocha.describe('postReport()', function() {
        mocha.it('should be a null-op to post a report for a thread already reported', function(done){
            ranchan.postReport(report1, auth2, function(err, report){
                assert(!err);
                assert(report);
                assert.equal(report1.threadId, report.threadId);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('getUnresolvedReports()', function() {
        mocha.it('should not report unresolved reports for non-mods', function(done){
            ranchan.getUnresolvedReports(auth1, function(err, reports){
                assert(err);
                assert.equal("AuthError", err.name);
                assert.equal("Only a moderator can view reports", err.message);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('getUnresolvedReports()', function() {
        mocha.it('should return the unresolved report just created', function(done){
            ranchan.getUnresolvedReports(modAuth1, function(err, reports){
                assert(!err);
                assert(reports);
                assert(reports.length > 0);
                assert(isThreadIdInReportList(reports, report1.threadId));
                reports.forEach(function(report) {
                    assert(!report.resolved); 
                });
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('postResolveReport()', function() {
        mocha.it('should not resolve report for non-moderator', function(done){
            ranchan.postResolveReport(report1.threadId, "banned", auth1, function(err, report){
                assert(err);
                assert.equal("AuthError", err.name);
                assert.equal("Only a moderator can resolve a report", err.message);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('postResolveReport()', function() {
        mocha.it('should resolve report for moderator', function(done){
            ranchan.postResolveReport(report1.threadId, "banned", modAuth1, function(err, report){
                assert(!err);
                assert(report);
                assert(report.resolved);
                assert.equal("banned", report.action);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('getUnresolvedReports()', function() {
        mocha.it('should not have resolved report in unresolved list', function(done){
            ranchan.getUnresolvedReports(modAuth1, function(err, reports){
                assert(!err);
                assert(reports);
                assert(reports.length == 0);
                assert(!isThreadIdInReportList(reports, report1.threadId));
                done();
            });
        })
    })
});

// put thread# and content automatically in ban when posting ban
// delete all threads for a banned IP
// only mod can resolve with ban and delete (quickResolve)

// getThreadsCSV method for brevity
// check that children thread also deleted when parent is deleted
// verify auth versus db in separate method
/*
*/