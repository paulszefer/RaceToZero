<?php

	require_once('PDO_conn.php');
	
	function getBarriers() {
	
		$level_id = $_POST['level_id'];
	
		$barriers = array();
	
		try {
			$statement = $DB_conn->prepare("SELECT barrier_name, 
											       barrier_x1,
											       barrier_y1,
											       barrier_x2,
											       barrier_y2
											FROM barriers
											WHERE level_id='" . $level_id . "';");
			$statement->execute();
			while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
				$barriers[] = $row;
			}
		} catch(PDOException $e) {
	  		echo $e->getMessage();
		}
	
		$json = json_encode($barriers);
		return $json;
	
	}

?>