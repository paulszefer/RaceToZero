<?php

	require_once('PDO_conn.php');
	
	function getBarriers() {
	
		$level_id = $_POST['level_id'];
	
		$barriers = array();
	
		try {
			$username = "root";
    		$password = "";
   			$host     = "localhost";
    		$database = "comp1536project";

    		$link = mysqli_connect($host, $username, $password, $database);
    		$query = "SELECT barrier_name, 
							 barrier_x1,
							 barrier_y1,
							 barrier_x2,
							 barrier_y2
					  FROM barriers
					  WHERE level_id='" . $level_id . "';";
			
			$result = mysqli_query($link, $query);
	
			if($result) {
				while($row = mysqli_fetch_array($result)) {
					$barriers[] = $row;
				}
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
			$username = "root";
    		$password = "";
   			$host     = "localhost";
    		$database = "comp1536project";

    		$link = mysqli_connect($host, $username, $password, $database);
    		$query = "SELECT Count(level_id) AS NumberOfLevels FROM levels;";
			
			$result = mysqli_query($link, $query);
	
			if($result) {
				$row = mysqli_fetch_array($result);
				if($row['NumberOfLevels']) {
					return json_encode(array("number"=>$row['NumberOfLevels']));
				}
			}
			return json_encode(array("number"=>"1"));
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
	}
	
	function getShortestTimes() {
		$level = $_POST['level'];
		$level = 1;
		
		$times = array();
		
		try {
			$username = "root";
    		$password = "";
   			$host     = "localhost";
    		$database = "comp1536project";

    		$link = mysqli_connect($host, $username, $password, $database);
    		$query = "SELECT game_time,
							 user_id
					  FROM games
					  WHERE level_id=" . $level . 
					" ORDER BY game_time ASC;";
			
			$result = mysqli_query($link, $query);
	
			if($result) {
				while($row = mysqli_fetch_array($result)) {
					$times[] = $row;
				}
			}
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
		
		$json = json_encode($times);
		return $json;
	}
	
	function displayTutorialScore() {
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp1536project";

    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT game_time
				  FROM games
				  	INNER JOIN users ON games.user_id = users.user_id
				  WHERE level_id=0
				  	AND user_name=$_POST['user_name']
				  ORDER BY game_time ASC;";
			
		$result = mysqli_query($link, $query);
	
		if($result) {
			$row = mysqli_fetch_array($result)
		}
		
		$json = json_encode(array('time'=>$row['game_time']));
		return $json;
	}
	
	$function = $_POST['function'];
	switch ($function) {
		case 'getBarriers':
			echo getBarriers();
			break;
		case 'saveGame':
			echo saveGame();
			break;
		case 'getNumberOfLevels':
			echo getNumberOfLevels();
			break;
		case 'getShortestTimes':
			echo getShortestTimes();
			break;
		case 'displayTutorialScore':
			echo displayTutorialScore();
			break;
	}

?>