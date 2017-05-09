<?php

	require_once('PDO_conn.php');
	
	$level_id = $_POST['level_id'];
	
	try {
		$statement = $DB_conn->prepare("SELECT barrier_name, 
										       barrier_x1,
										       barrier_y1,
										       barrier_x2,
										       barrier_y2
										FROM barriers
										WHERE level_id='" . $level_id . "';");
	} catch(PDOException $e) {
	  	echo $e->getMessage();
	}

?>