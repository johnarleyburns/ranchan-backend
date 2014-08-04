var mongoose = require('mongoose');
var schemas = require('./schemas');

var Thread = schemas.Thread;
var Ban = schemas.Ban;
var bumpLimit = 150;
var allowableThreadintervalSec = 60;
var allowablePostIntervalSec = 5;

exports.setBumpLimit = function(limit) {
    bumpLimit = limit;
}

exports.getBumpLimit = function() {
    return bumpLimit;
}

exports.newThread = function(threadMap) {
    return new Thread(threadMap);
};

exports.newBan = function(banMap) {
    return new Ban(banMap);
};

exports.newBanError = function(message) {
    var err = new Error();
    err.name = 'BanError';
    err.message = message;
    return err;
}

exports.newAuth = function(ipAddress, moderatorId) {
    var auth = {};
    auth.ipAddress = ipAddress;
    auth.moderatorId = moderatorId;
    return auth;
}

exports.newAuthError = function(message) {
    var err = new Error();
    err.name = 'AuthError';
    err.message = message;
    return err;
}

exports.newBumpError = function(message) {
    var err = new Error();
    err.name = 'BumpError';
    err.message = message;
    return err;
}

exports.newExistsError = function(message) {
    var err = new Error();
    err.name = 'ExistsError';
    err.message = message;
    return err;
}

exports.newWaitError = function(message) {
    var err = new Error();
    err.name = 'WaitError';
    err.message = message;
    return err;
}

exports.newThreadId = function() { // v4 uuid
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

exports.getThreads = function(parentId, callback) {
    var sort = parentId === '0' ? '-lastBump' : 'date';
    Thread.find().select(Thread.visibleFields).or([{
        parentId: parentId
    }, {
        threadId: parentId
    }]).sort(sort).exec(callback);
};

exports.getThread = function(threadId, callback) {
    Thread.findOne({
        threadId: threadId
    }).select(Thread.visibleFields).exec(callback);
};

exports.getThreadWithIP = function(threadId, ipAddress, callback) {
    Thread.findOne({
        threadId: threadId,
        ipAddress: ipAddress
    }).select(Thread.visibleFields).exec(callback);
};
    
exports.sameThread = function(thread1, thread2) {
    return exports.sameVisibleThread(thread1, thread2)
        && thread1.ipAddress === thread2.ipAddress;
};

exports.sameVisibleThread = function(thread1, thread2) {
    if (!thread1 && !thread2) {
        return true;
    }
    if (!thread1 || !thread2) {
        return false;
    }
    if (thread1.threadId !== thread2.threadId) {
        return false;
    }
    if (thread1.parentId !== thread2.parentId) {
        return false;
    }
    if (thread1.content !== thread2.content) {
        return false;
    }
    if (thread1.nickname !== thread2.nickname) {
        return false;
    }
    if (thread1.date < thread2.date || thread1.date > thread2.date) {
        return false;
    }
    if (thread1.nsfw !== thread2.nsfw) {
        return false;
    }
    if (thread1.chats !== thread2.chats) {
        return false;
    }
    return true;
    /*
    return thread1.imageBytes === thread2.imageBytes
    && thread1.width === thread2.width
    && thread1.height === thread2.height
    && thread1.images === thread2.images;
    */
};

exports.postThread = function(thread, auth, callback) {
    thread.ipAddress = auth.ipAddress;
    thread.date = new Date();
    thread.lastBump = new Date();
    thread.markModified('date');
    thread.markModified('lastBump');
    thread.chats = 0;
    exports.getActiveBan(thread.ipAddress, function(err, ban) {
        console.log('postThread() auth=', auth);
        if (err) {
            callback(err);
        }
        else if (!auth.moderatorId && ban) {
            var banError = new Error();
            banError.name = "BanError";
            banError.message = "You are banned until " + ban.endDate;
            callback(banError);
        }
        else {
            exports.getPostBlockingThread(thread.ipAddress, thread.parentId, function(err, blockingThread) {
                if (err) {
                    callback(err);
                }
                else if (blockingThread) {
                    if (thread.parentId !== '0') {
                        callback(exports.newWaitError("You must wait " + allowablePostIntervalSec + " seconds between posts"));
                    }
                    else {
                        callback(exports.newWaitError("You must wait " + allowableThreadintervalSec + " seconds between threads"));
                    }
                }
                else if (thread.parentId === '0') {
                    thread.save(callback);
                }
                else {
                    exports.getThread(thread.parentId, function(err, parent) {
                        if (err) {
                            callback(err);
                        }
                        else if (!parent) {
                            callback(exports.newExistsError("Parent thread does not exist"));
                        }
                        else if (parent.chats >= bumpLimit) {
                            callback(exports.newBumpError("Thread has reached the bump limit"));
                        }
                        else {
                            console.log('updated parent chats=' + parent.chats + ' to ' + (parent.chats + 1));
                            parent.lastBump = thread.lastBump;
                            parent.markModified('lastBump');
                            parent.chats += 1;
                            parent.save(function(err, savedParent) {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    thread.save(callback);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.deleteThread = function(threadId, parentId, auth, callback) {
    if (!auth.moderatorId) {
        var err = exports.newAuthError("Only a moderator can do that");
        callback(err);
    }
    else {
        Thread.findOneAndRemove({
            threadId: threadId
        }).exec(function(err, savedThread) {
            if (err) {
                callback(err);
            }
            else if (parentId === '0') {
                callback(null, savedThread);
            }
            else {
                Thread.findOne({
                    threadId: parentId
                }).exec(function(err, parent) {
                    if (err) {
                        return callback(err);
                    }
                    parent.chats -= 1;
                    parent.save(function(err, savedParent) {
                        callback(err, savedThread, savedParent);
                    });
                });
            }
        });
    }
};

exports.getBans = function(callback) {
        Ban.find()
        .sort('-endDate')
        .exec(callback);
};

exports.getActiveBans = function(callback) {
        var now = new Date();
        Ban.find()
        .where('endDate').gt(now) // we periodically remove expired bans
        .sort('-endDate')
        .exec(callback);
};

exports.getBan = function(ipAddress, callback) {
        Ban.findOne({ipAddress: ipAddress}).exec(callback);
};
    
exports.getActiveBan = function(ipAddress, callback) {
        Ban.findOne()
        .where('ipAddress').equals(ipAddress)
        .where('endDate').gt(new Date())
        .exec(callback);
}

exports.getPostBlockingThread = function(ipAddress, parentId, callback) {
    var isChild = parentId !== '0';
    var allowableLastDate = new Date();
    var allowableIntervalSec = isChild ? allowablePostIntervalSec : allowableThreadintervalSec;
    allowableLastDate.setSeconds(allowableLastDate.getSeconds() - allowableIntervalSec);
    console.log('ipAddress', ipAddress, 'parentId', parentId);
    Thread.findOne()
    .where('ipAddress').equals(ipAddress)
    .where('parentId').equals(parentId)
    .where('date').gt(allowableLastDate)
    .exec(callback);
};

exports.sameBan = function(ban1, ban2) {
    return exports.sameVisibleBan(ban1, ban2)
        && ban1.ipAddress === ban2.ipAddress;
}    
    
exports.sameVisibleBan = function(ban1, ban2) {
    if (!ban1 && !ban2) {
        return true;
    }
    if (!ban1 || !ban2) {
        return false;
    }
    if (ban1.reason !== ban2.reason) {
        return false;
    }
    if (ban1.moderatorId !== ban2.moderatorId) {
        return false;
    }
    if (ban1.banDate < ban2.banDate || ban1.banDate > ban2.banDate) {
        return false;
    }
    if (ban1.endDate < ban2.endDate || ban1.endDate > ban2.endDate) {
        return false;
    }
    return true;
};

exports.sameError = function(banError1, banError2) {
    if (!banError1 && !banError2) {
        return true;
    }
    if (!banError1 || !banError2) {
        return false;
    }
    if (banError1.name !== banError2.name) {
        return false;
    }
    if (banError1.message !== banError2.message) {
        return false;
    }
    return true;
};

exports.postBan = function(ban, threadId, auth, callback) {
    if (!auth.moderatorId) {
        callback(exports.newAuthError("Only a moderator can do that"));
        return;
    }
    Thread.findOne({
        threadId: threadId
    }).exec(function(err, thread) {
        if (!thread) {
            console.log('no thread');
            callback(err);
            return;
        }
        ban.ipAddress = thread.ipAddress;
        ban.moderatorId = auth.moderatorId;
        Ban.create(ban, callback);
    });
};

exports.deleteBan = function(ipAddress, callback) {
    Ban.findOneAndRemove({
        ipAddress: ipAddress
    }).exec(callback);
};

exports.cleanBans = function(callback) {
    var now = new Date();
    Ban.remove()
        .where('endDate').lt(now)
        .exec(callback);
};

exports.clearAllData = function(callback) {
    Thread.remove().exec(function(err) {
        if (err) {
            callback(err);
        }
        Ban.remove().exec(callback);
    });
};
