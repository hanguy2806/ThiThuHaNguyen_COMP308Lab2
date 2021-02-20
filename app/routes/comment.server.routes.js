var comments = require('../../app/controllers/comment.server.controller');

module.exports = function (app) {    

    app.route('/submit_comments')
        .get(students.renderSubmitComment)
        .post(students.submitComment);
};
