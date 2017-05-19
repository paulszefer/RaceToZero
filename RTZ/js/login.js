//Gloabls
var passRegEx = new RegExp(/^[a-zA-Z0-9]{6,}$/),
    //a-z, 0-9 includes - _ and . 6-10 characters total, after first match, no more
    validChars = new RegExp(/^[a-zA-Z0-9]{4,16}(?!.{1,})$/);

//Login form js

function loginvalidation() {
    return (loginUserValid() && loginPassValid());
}

function loginUserValid() {
    var loginUser = document.getElementById("loginUsername").value,
        l = loginUser.length;
    if (l < 4) {
        document.getElementById("loginUsernameErrorField").innerHTML = "Username less than 4 chars";
        return false;
        //another else if if username taken
    } else if (l > 16) {
        document.getElementById("loginUsernameErrorField").innerHTML = "Username more than 16 chars";
        return false;
    } else if (!validChars.test(loginUser)) {
        document.getElementById("loginUsernameErrorField").innerHTML = "Username contains illegal characters";
        return false;
    } else {
        document.getElementById("loginUsernameErrorField").innerHTML = "Username valid";
        return true;
    }
}
//Sanitizes login format
function loginPassValid() {
    var loginPass = document.getElementById("loginPassword").value;
    if (!passRegEX.test(loginPass)) {
        document.getElementById("loginPassErrorField").innerHTML = "Are you trying to drop table???";
        return false;
    } else {
        return true;
    }
}
// function loginEmailValid() {
// 	var domain = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); //checks email for single occurrence of @ and valid domain containing only valid characters.
// 	var email = document.getElementById("UserOrEmail").value;
// 	return (domain.test(email));
// }
// function userOrEmailValid(){
// 	if (loginUserValid()){
// 		document.getElementById("UserOrEmailErrorField").innerHTML = "Login format allowed.";
// 		return true;
// 	} else {
// 		document.getElementById("UserOrEmailErrorField").innerHTML = "Username format invalid.";
// 		return false;
// 	}
// }

//Registration form js
var ERROR_DISPLAY = "Errors in fields: ",
    ERROR_FIELD = [];

//returns true if whole form is ready
function validateForm() {
    ERROR_FIELD = [];
    if (!userValid()) {
        ERROR_FIELD.push("Username");
    }
    // if (!emailValid()){
    // 	ERROR_FIELD.push("Email");
    // }
    if (!passwordValid()) {
        ERROR_FIELD.push("Password");
    }
    // if (!agreeValid()){
    // 	ERROR_FIELD.push("TOS Agreement");
    // }
    if (userValid() && passwordValid()) {
        return true;
    } else {
        // alert(ERROR_DISPLAY + ERROR_FIELD);
        return false;
    }
}
//returns true if username is valid
function userValid() {
    var username = document.getElementById("regUsername").value,
        l = username.length;
    //document.getElementById("regUsernameErrorField").innerHTML = "you wrote:" + l + username;
    if (l < 4) {
        document.getElementById("regUsernameErrorField").innerHTML = "Username less than 4 chars";
        return false;
        //another else if if username taken
    } else if (l > 16) {
        document.getElementById("regUsernameErrorField").innerHTML = "Username more than 16 chars";
        return false;
    } else if (!validChars.test(username)) {
        document.getElementById("regUsernameErrorField").innerHTML = "Username contains illegal characters";
        return false;
    } else {
        document.getElementById("regUsernameErrorField").innerHTML = "Username valid";
        return true;
    }
}

//if email isn't BCIT domain or gmail
function emailValid() {
    var domain = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); //checks email for single occurrence of @ and valid domain containing only valid characters.
    var email = document.getElementById("email").value;
    if (domain.test(email)) {
        /*if (email exists in database) {
         document.getElementById("email").value = "Email already exists"
         } else {whatever value to let form submit}*/
        document.getElementById("emailErrorField").innerHTML = "Email valid"
        return true;
    }
    else {
        document.getElementById("emailErrorField").innerHTML = "Email not accepted"
        return false;
    }
}
//password checkbutton, true if length less than 10 and password===cpass
function passwordValid() {
    var pass = document.getElementById("regPassword").value,
        confirmpass = document.getElementById("cRegPassword").value;
    if (!(pass.length > 0)) {
        document.getElementById("cRegPassErrorField").innerHTML = "Please Enter a password";
        return false;
    } else if (!(pass === confirmpass)) {
        document.getElementById("cRegPassErrorField").innerHTML = "Passwords do not match.";
        return false;
    } else if (!passRegEx.test(pass)) {
        document.getElementById("cRegPassErrorField").innerHTML = "Password format invalid.";
        return false;
    } else {
        document.getElementById("cRegPassErrorField").innerHTML = "Password OK.";
        return true;
    }
}
// function agreeValid() {
// 	if (!consentYes.checked){
// 		document.getElementById("agreeErrorField").innerHTML = '<span style="color:red">Please agree to TOS</span>';
// 		return false;
// 	} else {
// 		document.getElementById("agreeErrorField").innerHTML = "";
// 		return true;
// 	}
// }

$(function () {
// Login/Register tab swapping
    $("#logintab").click(function () {

        // if ($("#logintab").hasClass("inactivetab")) {
            $("#logintab").removeClass("inactivetab");
            $("#logintab").addClass("activetab");
            $("#regtab").removeClass("activetab");
            $("#regtab").addClass("inactivetab");
        // }
        $("#logincontent").css("display", "block");
        $("#regcontent").css("display", "none");
    });

    $("#regtab").click(function () {
        // if ($("#rebtab").hasClass("inactivetab")) {
            $("#logintab").removeClass("activetab");
            $("#logintab").addClass("inactivetab");
            $("#regtab").removeClass("inactivetab");
            $("#regtab").addClass("activetab");
        // }
        $("#regcontent").css("display", "block");
        $("#logincontent").css("display", "none");
    });
});