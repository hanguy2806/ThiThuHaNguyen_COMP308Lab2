var config = require('./config'), mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../app/models/student.server.model');
    require('../app/models/comments.server.model');
    return db;
};
