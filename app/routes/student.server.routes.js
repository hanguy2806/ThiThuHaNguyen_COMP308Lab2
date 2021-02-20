var students = require('../../app/controllers/student.server.controller');

// Define the routes module' method
//module.exports = function(app) {
	// Mount the 'index' controller's 'render' method
 //   app.get('/', students.render);
    //renders add_user.ejs if a get request is made to /add_user path
    // app.get('/add_user', students.renderAddUser);
    
    // app.get('/read_user', students.renderReadUser);

module.exports = function (app) {
    //index
    app.get('/', students.render);

    app.route('/signup')
        .get(students.renderSignUp)
        .post(students.signUp);
         
    app.route('/signin')
        .get(students.renderSignIn)
        .post(students.signin);

    app.route('/submit_comments')
        .get(students.renderSubmitComment);
        

//not necessary
    app.route('/displayAll')    
        .get(students.list);
  
};
