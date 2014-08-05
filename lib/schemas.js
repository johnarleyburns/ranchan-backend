var mongoose = require('mongoose');

var threadSchema = mongoose.Schema({
    threadId: {
        type: String,
        unique: true,
        index: true
    },
    parentId: {
        type: String,
        index: true
    },
    ipAddress: {
        type: String
    },
    content: {
        type: String,
        trim: true
    },
    nickname: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        index: true
    },
    lastBump: {
        type: Date,
        index: true
    },
    chats: Number,
    nsfw: {
        type: Boolean,
        default: false
    }
    /*
    ,imageBytes: {
        type: Number
    },
    width: Number,
    height: Number,
    images: Number
    */
});

var banSchema = mongoose.Schema({
    ipAddress: {
        type: String,
        unique: true,
        index: true
    },
    banDate: {
        type: Date
    },
    endDate: {
        type: Date,
        index: true
    },
    reason: {
        type: String
    },
    moderatorId: {
        type: String
    }
});

var reportSchema = mongoose.Schema({
    threadId: {
        type: String,
        index: true,
        unique: true
    },
    content: {
        type: String
    },
    ipAddress: {
        type: String,
        index: true
    },
    threadIpAddress: {
        type: String
    },
    date: {
        type: Date
    },
    reason: {
        type: String
    },
    action: {
        type: String
    },
    resolved: {
        type: Boolean,
        default: false
    }
});

exports.Thread = mongoose.model('Thread', threadSchema);
exports.Thread.visibleFields = 'threadId parentId content nickname date lastBump chats nsfw';
exports.Ban = mongoose.model('Ban', banSchema);
exports.Report = mongoose.model('Report', reportSchema);

