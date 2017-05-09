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
	
	function saveGame() {
		$uname = $_POST['uname'];
		$level = $_POST['level'];
		$time = $_POST['time'];
	
		include_once('class.game.php');
	
		$game = new GAME($DB_conn, $uname, $level, $time);
	
		$game->save();
	}
	
	function getNumberOfLevels() {
		try {
			$statement = $DB_conn->prepare("SELECT Count(level_id)
											AS NumberOfLevels
											FROM levels;");
			$statement->execute();
			$row = $statement->fetch(PDO::FETCH_ASSOC);
			return $row['NumberOfLevels'];
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
	}
	
	function getShortestTimes() {
		$level = $_POST['level'];
		
		$times = array();
		
		try {
			$statement = $DB_conn->prepare("SELECT game_time,
												   user_id
											FROM games
											WHERE level_id=" . $level . 
										   "ORDER BY game_time DESC;");
			$statement->execute();
			$count = 0;
			while ($row = $statement->fetch(PDO::FETCH_ASSOC) && $count < 10) {
				$times[] = $row;
				$count++;
			}
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
		
		$json = json_encode($times);
		return $json;
	}

?>