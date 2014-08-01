var mongoose = require('mongoose');
var schemas = require('./schemas');

var Thread = schemas.Thread;
var Ban = schemas.Ban;

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

exports.newThreadId = function() { // v4 uuid
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

exports.getThreads = function(parentId, success, error) {
    var sort = parentId === '0' ? '-lastBump' : 'date';
    Thread.find().select(Thread.visibleFields).or([{
        parentId: parentId
    }, {
        threadId: parentId
    }]).sort(sort).exec(function(err, threads) {
        if (err) {
            error(err);
        }
        success(threads);
    });
};

exports.getThread = function(threadId, success, error) {
    Thread.findOne({
        threadId: threadId
    }).select(Thread.visibleFields).exec(function(err, thread) {
        if (err) {
            error(err);
        }
        success(thread);
    });
};

exports.getThreadWithIP = function(threadId, ipAddress, success, error) {
    Thread.findOne({
        threadId: threadId,
        ipAddress: ipAddress
    }).select(Thread.visibleFields).exec(function(err, thread) {
        if (err) {
            error(err);
        }
        success(thread);
    });
};

exports.hideThreadIP = function(thread) {
    var t = {};
    var k;
    for (k in thread) {
        if (k !== 'ipAddress') {
            t[k] = thread[k];
        }
    }
    return t;
}

exports.hideBanIP = function(ban) {
    var t = {};
    var k;
    for (k in ban) {
        if (k !== 'ipAddress') {
            t[k] = ban[k];
        }
    }
    return t;
}
    
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

exports.postThread = function(thread, auth, success, error) {
    var isMod = auth.moderatorId ? true : false;
    var saveFunc = function(err, savedThread) {
        if (err) {
            return error(err);
        }
        if (thread.parentId === '0') {
            return success(thread);
        }
        Thread.findOne({
            threadId: thread.parentId
        }).exec(function(err, parent) {
            if (err) {
                return error(err);
            }
            parent.lastBump = thread.lastBump;
            parent.markModified('lastBump');
            parent.chats += 1;
            parent.save(function(err, savedParent) {
                if (err) {
                    return error(err);
                }
                return success(thread, parent);
            });
        });
    };

    thread.ipAddress = auth.ipAddress;
    thread.lastBump = thread.date;
    thread.markModified('date');
    thread.markModified('lastBump');
    
    if (isMod) {
        thread.save(saveFunc);
    }
    else {
        thread.pre('save', function(next) {
            Ban.findOne().where({
                ipAddress: auth.ipAddress
            }).exec(function(err, ban) {
                if (err) {
                    next(err);
                }
                else if (ban) {
                    var banError = new Error();
                    banError.name = "BanError";
                    banError.message = "You are banned until " + ban.endDate;
                    next(banError);
                }
                else {
                    next();
                }
            });
        }).save(saveFunc);
    }
};

exports.deleteThread = function(threadId, parentId, auth, success, error) {
    if (!auth.moderatorId) {
        var err = exports.newAuthError("Only a moderator can do that");
        error(err);
    }
    else {
        Thread.findOneAndRemove({
            threadId: threadId
        }).exec(function(err, savedThread) {
            if (err) {
                error(err);
            }
            else if (parentId === '0') {
                success(savedThread);
            }
            else {
                Thread.findOne({
                    threadId: parentId
                }).exec(function(err, parent) {
                    if (err) {
                        return error(err);
                    }
                    parent.chats -= 1;
                    parent.save(function(err, savedParent) {
                        if (err) {
                            return error(err);
                        }
                        return success(savedThread, savedParent);
                    });
                });
            }
        });
    }
};

exports.getBans = function(success, error) {
        var now = new Date();
        Ban.find()
        //.where('endDate').gt(now) // we periodically remove expired bans instead
        .sort('-endDate')
        .exec(function(err, bans){
            if (err) {
                error(err);
            }
            success(bans);
        });
};

exports.getBan = function(ipAddress, success, error) {
        Ban.findOne({ipAddress: ipAddress}).exec(function(err, ban) {
            if (err) {
                error(err);
            }
            success(ban);
        });
};
    
exports.sameBan = function(ban1, ban2) {
    return exports.sameVisibleBan(ban1, ban2)
        && ban1.ipAddress === ban2.ipAddress;
}    
    
exports.sameVisibleBan = function(ban1, ban2) {
    console.log('ban1', ban1);
    console.log('ban2', ban2);
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

exports.postBan = function(ban, threadId, auth, success, error) {
    if (!auth.moderatorId) {
        error(exports.newAuthError("Only a moderator can do that"));
        return;
    }
    Thread.findOne({
        threadId: threadId
    }).exec(function(err, thread) {
        if (!thread) {
            console.log('no thread');
            error(err);
            return;
        }
        ban.ipAddress = thread.ipAddress;
        ban.moderatorId = auth.moderatorId;
        ban.save(function(err, savedBan) {
            if (err) {
                console.log('no save');
                error(err);
                return;
            }
            success(ban);
        });
    });
};

exports.deleteBan = function(ipAddress, success, error) {
    Ban.findOneAndRemove({
        ipAddress: ipAddress
    }).exec(function(err, savedBan) {
        if (err) {
            return error(err);
        }
        return success(savedBan);
    });
};

exports.cleanBans = function(success, error) {
    var now = new Date();
    Ban.remove()
        .where('endDate').lt(now)
        .exec(function(err){
            if (err) {
                error(err);
            }
            success();
        });
};
