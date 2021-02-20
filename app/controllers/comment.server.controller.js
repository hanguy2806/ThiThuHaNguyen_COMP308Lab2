const Comment = require('mongoose').model('Comment');
const Student = require('mongoose').model('Student');

exports.commentsByStudent = function (req, res, next) {
    //var email = req.session.email;
    var email=req.body.email;
    //find the student then its comments using Promise mechanism of Mongoose
    Student.
        findOne({ email: email }, (err, student) => {
            if (err) { return getErrorMessage(err); }
            req.id = student._id;
            console.log(req.id);
        })
        .then(function () {
            //find the posts from this author
            Comment.
                find({
                    student: req.id
                }, (err, comments) => {
                    console.log(comments);
                    if (err) { return getErrorMessage(err); }
                    console.log('go here if comment found');
                    res.render('comments', {
                        comments: comments, email: email
                    });
                });
        });
};

exports.renderFilterStudent=function(req,res,next){
    res.render('student_filter');
}

exports.submitComment=async function (req, res, next) {
   var email=req.session.email;
   console.log(email);
   const current_student= await Student.findOne({ email: email });
	console.log(current_student);
   const comment= new Comment(req.body);
   comment.student=current_student;
   console.log(comment);
   
   await comment.save();
   res.redirect('/thankyou');
};

exports.renderThankyou=function(req,res,next){
    var email = req.session.email;
    res.render('thankyou',{
        email:email
    });
}

exports.renderSubmitComment=function(req,res,next){
    res.render('submit_comments');
}