<?php

	require_once('PDO_conn.php');
	
	$uname = $_POST['uname'];
	$level = $_POST['level'];
	$time = $_POST['time'];
	
	$game = new GAME($DB_conn, $uname, $level, $time);
	
	$game->save();

?>