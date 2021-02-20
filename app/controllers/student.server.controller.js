const Student = require('mongoose').model('Student');

//index homepage
exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Home Page'
	});
};

exports.renderSignUp=function(req,res,next){
	res.render('signup', {
		title: 'Student Register'
	});
}

// 'create' controller method to create a new user
exports.signUp = function(req, res, next) {	
	const student = new Student(req.body);
		student.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			res.redirect('/');
		}
	});
};

//render signin page
exports.renderSignIn=function(req,res,next){
	res.render('signin', {
		title: 'Login'
	});
}
//sign in post request
exports.signin= function(req, res, next) {
    var {email, password} = req.body;

    Student.findOne({
        email: email
    }
	, (err, student) => {
        if (err || !student) {
			console.log('error HERE');
			res.render('error_message',{message:"Could not found user"});
            // Call the next middleware with an error message
         //   return next(err);
        } else {	
			if(student.password === password){
				console.log(student.firstName);
				res.redirect('/submit_comments');
				// Call the next middleware
				next();
			}	
			res.render('error_message',{message:"Password does not match"});
			
        }
    });
};

exports.renderSubmitComment = function(req,res,next){
	res.render('submit_comments');
}

exports.list = function(req, res, next) {
	// Use the 'User' static 'find' method to retrieve the list of users
	Student.find({}, (err, students) => {
		if (err) {
			// Call the next middleware withks an error message
			return next(err);
		} else {
			res.render('students',{
				title: 'List of Student',
				students:students
			})
		}
	});
};

// 'read' controller method to display a user
exports.read = function(req, res) {
		res.json(req.student);
};


