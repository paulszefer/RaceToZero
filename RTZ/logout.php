<?php
//Grabs connection file
session_start();
require_once('PDO_conn.php');

//if current user is logged in, log him out and redirect to login page
if($user->is_loggedin()){
	//Log user out
	$user->doLogout();
	$user->redirect('login.php');
}
?>