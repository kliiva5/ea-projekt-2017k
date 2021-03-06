//Function to save data to DB
function saveToDB(){

  var d_date = document.getElementById('due_date').value;
  var task = document.getElementById('task').value;
  var date_check = CheckDate(d_date);
  
  if(date_check === false){
	  
	console.log("Due dates must be in the future");
	return;
	  
  }
  
  if(d_date === null || d_date === "" || task === "" || task === null){

    console.log("No task or due date was specified");
    return;

  } else {

    var user = firebase.auth().currentUser;
    var uid;

    if(user !== null){

      uid = user.uid;

      firebase.database().ref("UserTasks/"+ uid +"/").push({
        Task: task,
        Due: d_date,
		Status: "Not Completed"
      });

      console.log(task, d_date);
      clearFields();

    } else {
      console.log("Users must be signed in to add tasks");
    }

  }

}


function LogOut(){
  firebase.auth().signOut();
}

//Function for logging in
function LogIn(){

  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  if (email === null || password === null || email === '' || password === '') {
	  alert("Fill all fields to log in!");
  } else {
	  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
		// IF LOG IN WORKS
	
	}).catch(function(error) {
		// IF LOG IN DOESNT WORK
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);         
		}
    console.log(error);
});
	  
	  
  /*var authenticate = firebase.auth();

  var promise = authenticate.signInWithEmailAndPassword(email, password);
  
	document.querySelector('.form-group').style.visibility = 'hidden';
	document.getElementById('logout').style.visibility = 'visible';
 

 */
}}

//Function for creating accounts
function SignUp(){

  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  if (email === null || password === null || email === '' || password === '') {
	  alert("Fill all fields to sign up!");
  } else {
  var auth = firebase.auth();

  var promise = auth.createUserWithEmailAndPassword(email, password);
  }


}

//Function to clear fields after every successful entry
function clearFields(){

  document.getElementById('due_date').value = "";
  document.getElementById('task').value = "";

}

//Function to check if the date is in the future
function CheckDate(date){
	
	var selectedDate = new Date(date);
	var currentDate = new Date();
	
	if(selectedDate < currentDate){
		return false;
	} else {
		return true;
	}
}
