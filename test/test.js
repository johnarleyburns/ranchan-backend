var mocha = require('mocha');
var assert = require('assert');
var db = require('../lib/db');
var ranchan = require('../lib/ranchan');

var throwError = function(err) {
    throw err;
};

var ipAddress = '127.0.0.9';
var ipAddress2 = '127.0.0.10';
var bannedIpAddress = '127.0.0.11';
var bannedIpAddress2 = '127.0.0.12';
var modIpAddress = '127.0.0.13';

var modId1 = 'johnarleyburns@gmail.com';

var auth1;
var modAuth1;
var bannedAuth1;
var bannedAuth2;
var bannedModAuth1;
mocha.describe('ranchan', function(){
    mocha.describe('newAuth', function() {
        mocha.it('should generate new auth objects', function() {
            auth1 = ranchan.newAuth(ipAddress, null);
            modAuth1 = ranchan.newAuth(ipAddress2, modId1);
            bannedAuth1 = ranchan.newAuth(bannedIpAddress, null);
            bannedAuth2 = ranchan.newAuth(bannedIpAddress2, null);
            bannedModAuth1 = ranchan.newAuth(modIpAddress, modId1);
            assert.equal(ipAddress, auth1.ipAddress);
            assert(!auth1.moderatorId);
            assert.equal(ipAddress2, modAuth1.ipAddress);
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
            first.setMinutes(first.getMinutes() - 256);
            second.setMinutes(second.getMinutes() - 128);
            third.setMinutes(third.getMinutes() - 64);
            fourth.setMinutes(fourth.getMinutes() - 32);
            fifth.setMinutes(fifth.getMinutes() - 16);
            sixth.setMinutes(sixth.getMinutes() - 8);
            seventh.setMinutes(seventh.getMinutes() - 4);
            eighth.setMinutes(eighth.getMinutes() - 2);
            nineth.setMinutes(eighth.getMinutes() - 1);
            thread1 = ranchan.newThread({
                threadId: threadId1,
                parentId: 0,
                content: 'ITT: testing on node.js',
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
                content: 'testing ftw',
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
                date: fourth,
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
                date: fourth,
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
                date: fourth,
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
                date: fourth,
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
                date: fourth,
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
                date: fourth,
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

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should return list at first without test threads', function(done) {
            this.timeout(4000);
            ranchan.getThreads('0', function(threads) {
                assert(threads);
                assert(threads.length >= 0);
                assert(!isThreadIdInList(threads, threadId1));
                assert(!isThreadIdInList(threads, threadId2));
                assert(!isThreadIdInList(threads, threadId3));
                assert(!isThreadIdInList(threads, threadId4));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<thread1> - should not exist
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should not return non-posted thread', function(done) {
            ranchan.getThread(thread1.threadId, function(thread) {
                assert(!thread);
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post top level thread', function(done){
            ranchan.postThread(thread1, auth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread1, thread));  
                done();
            },
            throwError);
        })
    })
})

mocha.describe('ranchan', function() {
    mocha.describe('hideThreadIP()', function() {
        mocha.it('should hide thread ipAddress', function() {
            var thread = ranchan.hideThreadIP(thread1);
            assert(thread);
            assert(!thread.ipAddress);
            assert(ranchan.sameVisibleThread(thread1, thread));
        })
    })
});

// GET /a/t/<threadId1> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find top level thread just created with hidden ipAddress', function(done) {
            ranchan.getThread(threadId1, function(thread) {
                assert(thread);
                assert(!thread.ipAddress);
                assert(ranchan.sameVisibleThread(thread1, thread));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<thread1> 
mocha.describe('ranchan', function() {
    mocha.describe('getThreadWithIP()', function() {
        mocha.it('should return thread matching posters IP', function(done) {
            ranchan.getThreadWithIP(thread1.threadId, auth1.ipAddress, function(thread) {
                assert(thread);
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<thread1> 
mocha.describe('ranchan', function() {
    mocha.describe('getThreadWithIP()', function() {
        mocha.it('should not return thread not matching posters IP', function(done) {
            ranchan.getThreadWithIP(thread1.threadId, bannedAuth1.ipAddress, function(thread) {
                assert(!thread);
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post thread reply', function(done){
            ranchan.postThread(thread2, auth1, function(thread){
                assert(ranchan.sameVisibleThread(thread2, thread));  
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<threadId2> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find thread reply', function(done) {
            ranchan.getThread(threadId2, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread2, thread));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 now in top level but not reply thread2', function(done) {
            ranchan.getThreads('0', function(threads) {
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1));
                assert(!isThreadIdInList(threads, threadId2));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<threadId1>/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 and thread2 as thread parent and reply', function(done) {
            ranchan.getThreads(threadId1, function(threads) {
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(isThreadIdInList(threads, threadId2, threadId1));
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post another top level thread', function(done){
            ranchan.postThread(thread3, auth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread3, thread));  
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<threadId3> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find another top level thread just created', function(done) {
            ranchan.getThread(threadId3, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread3, thread));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread3 now in top level ordered before thread1', function(done) {
            ranchan.getThreads('0', function(threads) {
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
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should post another reply level thread', function(done){
            ranchan.postThread(thread4, auth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread4, thread));  
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/<threadId3> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getThread', function() {
        mocha.it('should find another reply level thread just created', function(done) {
            ranchan.getThread(threadId4, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread4, thread));
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1,thread2,thread4 in order for thread1 parent with correct chats count', function(done) {
            ranchan.getThreads(threadId1, function(threads) {
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
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 bumped in top level above thread3', function(done) {
            ranchan.getThreads('0', function(threads) {
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
            },
            throwError);
        })
    })
});

// POST /a/t - thread for deletion
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should create a top-level thread to be used for deletion', function(done){
            ranchan.postThread(thread5, auth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread5, thread));  
                done();
            },
            throwError);
        })
    })
});

// POST /a/t - thread for deletion
mocha.describe('ranchan', function(){
    mocha.describe('postThread', function() {
        mocha.it('should create a reply-level thread to be used for deletion', function(done){
            ranchan.postThread(thread6, auth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread6, thread));  
                done();
            },
            throwError);
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should fail to delete a top level thread since not moderator', function(done){
            ranchan.deleteThread(threadId5, '0', auth1, function(thread){
                assert(false);
                done();
            },
            function(err){
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
            ranchan.deleteThread(threadId5, '0', modAuth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread5, thread));  
                done();
            },
            throwError);
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should delete a reply-level thread and update parent', function(done){
            ranchan.deleteThread(threadId6, threadId1, modAuth1, function(thread, parent){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread6, thread));
                assert(parent);
                assert.equal(threadId1, parent.threadId);
                assert.equal(2, parent.chats);
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should have thread1 parent without deleted thread5 and correct chats count', function(done) {
            ranchan.getThreads(threadId1, function(threads) {
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(!isThreadIdInList(threads, threadId5, threadId1));
                assert.equal(2, threads[0].chats);
                done();
            },
            throwError);
        })
    })
});

// GET /a/t/0/
mocha.describe('ranchan', function() {
    mocha.describe('getThreads', function() {
        mocha.it('should not return deleted top-level thread', function(done) {
            ranchan.getThreads('0', function(threads) {
                assert(threads);
                assert(threads.length >= 0);
                assert(isThreadIdInList(threads, threadId1, '0'));
                assert(!isThreadIdInList(threads, threadId5, threadId1));
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThread()', function() {
        mocha.it('should be able to post thread before ban', function(done) {
            ranchan.postThread(thread7, bannedAuth1, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread7, thread));
                done();
            },
            throwError);
        });
    });
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should not be able to add to the ban list as non-moderator', function(done){
            ranchan.postBan(ban1, threadId1, auth1, function(ban){
                assert(false);
                done();
            },
            function(err) {
                assert(err);
                assert.equal('AuthError', err.name);
                assert.equal('Only a moderator can do that', err.message);
                done();
            });
        })
    })
});

mocha.describe('ranchan', function(){
    mocha.describe('hideBanIP()', function() {
        mocha.it('should hide IP from a ban', function(){
            var ban = ranchan.hideBanIP(ban1);
            assert(ban);
            assert(ranchan.sameVisibleBan(ban1, ban));
        });
    });
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should allow moderator to add IP from a thread to the ban list', function(done){
            ranchan.postBan(ranchan.hideBanIP(ban1), threadId7, modAuth1, function(ban){
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            },
            throwError);
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getBan', function() {
        mocha.it('should find ban which was just added', function(done) {
            ranchan.getBan(bannedIpAddress, function(ban) {
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            },
            throwError);
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have ban1 in ban list', function(done) {
            ranchan.getBans(function(bans) {
                assert(bans);
                assert(bans.length >= 0);
                assert(isIPAddressInBanList(bans, bannedIpAddress));
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThreadBan', function() {
        mocha.it('should not be able to post top level thread due to ban', function(done) {
            ranchan.postThread(thread7, bannedAuth1, function(thread) {
                assert(false); // should not reach here
                done();
            },
            function(err) {
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
            ranchan.postThread(thread8, modAuth1, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread8, thread));
                done();
            },
            throwError);
        })
    })
});

// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should add moderator IP to the ban list', function(done){
            ranchan.postBan(modBan1, threadId8, modAuth1, function(ban){
                assert(ban);
                assert(ranchan.sameBan(modBan1, ban));
                done();
            },
            throwError);
        })
    })
});

// POST /a/d/<threadId> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteThread', function() {
        mocha.it('should delete a top level thread as moderator even if moderator IP on ban list', function(done){
            ranchan.deleteThread(threadId8, '0', modAuth1, function(thread){
                assert(thread);
                assert(ranchan.sameVisibleThread(thread8, thread));  
                done();
            },
            throwError);
        })
    })
});


// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThreadOverride', function() {
        mocha.it('should be able to post top level thread overriding ban if moderator', function(done) {
            ranchan.postThread(thread9, modAuth1, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread9, thread));
                done();
            },
            throwError);
        })
    })
});

// POST /a/d/<ipAddress> - delete
mocha.describe('ranchan', function(){
    mocha.describe('deleteBan', function() {
        mocha.it('should delete a ban', function(done){
            ranchan.deleteBan(bannedIpAddress, function(ban){
                assert(ban);
                assert(ranchan.sameBan(ban1, ban));
                done();
            },
            throwError);
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have ban1 no longer in ban list', function(done) {
            ranchan.getBans(function(bans) {
                assert(bans);
                assert(bans.length >= 0);
                assert(!isIPAddressInBanList(bans, bannedIpAddress));
                done();
            },
            throwError);
        })
    })
});

// POST /a/t
mocha.describe('ranchan', function() {
    mocha.describe('postThread()', function() {
        mocha.it('should be able to post thread before ban for expired test', function(done) {
            ranchan.postThread(thread10, bannedAuth2, function(thread) {
                assert(thread);
                assert(ranchan.sameVisibleThread(thread10, thread));
                done();
            },
            throwError);
        });
    });
});
// POST /a/b
mocha.describe('ranchan', function(){
    mocha.describe('postBan', function() {
        mocha.it('should add expired IP to the ban list', function(done){
            ranchan.postBan(ban2, threadId10, modAuth1, function(ban){
                assert(ban);
                assert(ranchan.sameBan(ban2, ban));
                done();
            },
            throwError);
        })
    })
});

// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('getBan', function() {
        mocha.it('should find expired ban which was just added before clean', function(done) {
            ranchan.getBan(bannedIpAddress2, function(ban) {
                assert(ban);
                assert(ranchan.sameBan(ban2, ban));
                done();
            },
            throwError);
        })
    })
});


// GET /a/b/<bannedIPAddress> - after exists
mocha.describe('ranchan', function() {
    mocha.describe('cleanBans', function() {
        mocha.it('should clean ban list of expired entries', function(done) {
            ranchan.cleanBans(function() {
                done();
            },
            throwError);
        })
    })
});

// GET /a/b/
mocha.describe('ranchan', function() {
    mocha.describe('getBans', function() {
        mocha.it('should have expired ban no longer in ban list', function(done) {
            ranchan.getBans(function(bans) {
                assert(bans);
                assert(bans.length >= 0);
                assert(!isIPAddressInBanList(bans, bannedIpAddress2));
                done();
            },
            throwError);
        })
    })
});

// put thread# and content automatically in ban when posting ban
// delete all threads for a banned IP
// getThreadsCSV method for brevity
// check that children thread also deleted when parent is deleted
// verify auth versus db in separate method
// try to post new thread beyond timer limitgit
// try to post reply beyond timer limit 5sec
// try to post reply beyond bump limit 300

