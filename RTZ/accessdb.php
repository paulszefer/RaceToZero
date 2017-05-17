<?php
	// Provides functions that will be referenced by JavaScript functions in order
	// to query the database. The JavaScript functions will send the name of the
	// function they want to access it as a POST variable; this file then uses a
	// switch statement to execute that function and echo the results in JSON format.

	session_start();
	
	// Accepts a level_id as a parameter and returns the coordinates of all the barriers
	// in that level in JSON format. Each barrier has a name and coordinates of its
	// top-left and bottom-right vertices.
	function getBarriers() {
	
		$level_id = $_POST['level_id'];
	
		$barriers = array(); // holds rows that each correspond to one barrier
	
		// Eventually these variables will be collected in another php file for 
		// convenience.
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";

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
	
		$json = json_encode($barriers);
		return $json;
	
	}
	
	// Reads in the username using a session variable and the level and time using post
	// variables. Then invokes the save() function in class.game.php to send the
	// game data to the database. Does not have a return value.
	function saveGame() {
		$uname = $_SESSION['user_name'];
		$level = $_POST['level'];
		$time = $_POST['time'];
	
		include_once('class.game.php');
	
		$game = new GAME($uname, $level, $time);
		
		$game->save();
	}
	
	// Returns the total number of levels in the database as a string.
	function getNumberOfLevels() {
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";
    		
    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT Count(level_id) AS NumberOfLevels FROM levels;";
			
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
	// for that level sorted in order from shortest to longest. Eventually this will be
	// limited to a certain number of times, and will return the user_name instead of the
	// user_id.
	function getShortestTimes() {
		$level = $_POST['level'];
		
		$times = array();
		
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";

    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT game_time,
						 user_id
				  FROM games
				  WHERE level_id=" . ($level + 1) . 
				" ORDER BY game_time ASC;";
				
		$query2 = "SELECT game_time,
						  user_name
				  FROM games
				  	INNER JOIN users ON users.user_id = games.user_id
				  WHERE level_id=" . ($level + 1) . 
				" ORDER BY game_time ASC;";
				
		$result = mysqli_query($link, $query2);
	
		if($result) {
			while($row = mysqli_fetch_array($result)) {
				$times[] = $row;
			}
		}
		
		$json = json_encode($times);
		return $json;
	}
	
	// Reads in a username as a post variable and returns that user's best time in the
	// tutorial level.
	function displayTutorialScore() {
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";

    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT game_time
				  FROM games
				  	INNER JOIN users ON games.user_id = users.user_id
				  WHERE level_id=0
				 	AND user_name=" . $_POST['user_name'] .
				" ORDER BY game_time ASC;";
			
		$result = mysqli_query($link, $query);
	
		if($result) {
			$row = mysqli_fetch_array($result);
		}
		
		$json = json_encode(array('time'=>$row['game_time']));
		return $json;
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
		case 'displayTutorialScore':
			echo displayTutorialScore();
			break;
	}

?>