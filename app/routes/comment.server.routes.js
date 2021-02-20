var comments = require("../../app/controllers/comment.server.controller");

module.exports = function (app) {
  app
    .route("/submit_comments")
    .get(comments.renderSubmitComment)
    .post(comments.submitComment);
  app.route("/comments").get(comments.renderFilterStudent)
    .post(comments.commentsByStudent);
  app.route("/thankyou").get(comments.renderThankyou);
};
