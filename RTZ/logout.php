<?php
require_once('PDO_conn.php');

if(isset($_SESSION['user_session'])){
	//Log user out
	$user->doLogout();
	$user->redirect('login.php');
}
?>