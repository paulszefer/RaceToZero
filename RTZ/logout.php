<?php
require_once('PDO_conn.php');

if($user->is_loggedin()){
	//Log user out
	$user->doLogout();
	$user->redirect('login.php');
}
?>