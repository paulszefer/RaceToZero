<?php
    // Provides functions that will be referenced by JavaScript functions in order
    // to query the database. The JavaScript functions will send the name of the
    // function they want to access it as a POST variable; this file then uses a
    // switch statement to execute that function and echo the results in JSON format.

    

    // Accepts a level_id as a parameter and returns the coordinates of all the barriers
    // in that level in JSON format. Each barrier has a name and coordinates of its
    // top-left and bottom-right vertices.
    // Not likely to be used, but I'm leaving it here just in case.
    function getBarriers() {

        $level_id = $_POST['level_id'];
    
        $barriers = array(); // holds rows that each correspond to one barrier
    
        require_once('PDO_conn.php');
    	$link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);

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
	
		$json = json_encode($barriers);
		return $json;
	
	}
	
	// Reads in the username using a session variable and the level and time using post
	// variables. Then invokes the save() function in class.game.php to send the
	// game data to the database. Does not have a return value.
	function saveGame() {
	    session_start();
	
		$uname = $_SESSION['user_name'];
		$level = $_POST['level'];
		$time = $_POST['time'];
	    
		include_once('class.game.php');
	
		$game = new GAME($uname, $level, $time);
		
		$game->save();
	}
	
	// Returns the total number of levels in the database as a string.
	function getNumberOfLevels() {
		require_once('PDO_conn.php');
    	$link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);

    	$query = "SELECT Count(game_level) AS NumberOfLevels FROM levels;";
			
		$result = mysqli_query($link, $query);
	
		if($result) {
			$row = mysqli_fetch_array($result);
			if($row['NumberOfLevels']) {
				return json_encode(array("number"=>$row['NumberOfLevels']));
			}
		}
		return json_encode(array("number"=>"1")); // just in case the query fails
	}
	
	// Reads in a level as a post variable and returns an array with all the game times
	// for that level sorted in order from shortest to longest.
	function getShortestTimes() {
		$level = $_POST['level'];
		
		$times = array();
		
        require_once('PDO_conn.php');
    	$link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
				
		$query = "SELECT game_time,
                         user_name
				  FROM games
				  	INNER JOIN users ON users.user_id = games.user_id
				  WHERE game_level=" . ($level + 1) . 
				" ORDER BY game_time ASC;";
				
		$result = mysqli_query($link, $query);
	
		if($result) {
			while($row = mysqli_fetch_array($result)) {
				$times[] = $row;
			}
		}
		
		$json = json_encode($times);
		return $json;
	}
	
	function setHighestLevelAchieved() {
	    require_once('PDO_conn.php');
    	$link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
    	
    	$query = "UPDATE users
    	          SET user_level=" . $_POST['level'] . 
    	        " WHERE user_id=\"" . $_SESSION['user_id'] . "\";";
    	mysqli_query($link, $query);
	}

	// Runs whenever this file is invoked by the jQuery $.post function; reads in the
	// name of the function as a post variable and echoes the output of that function.
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
		case 'setHighestLevelAchieved':
		    echo setHighestLevelAchieved();
		    break;
	}

?>