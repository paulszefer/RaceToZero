<?php
	// Represents a game with a username, level, and time. This class is used to upload
	// scores to the database.
	
	class GAME {
		
		private $uname;
		private $level;
		private $time;
		
		// Initializes the username, level, and time.
		public function __construct($uname, $level, $time) {
			$this->uname = $uname;
			$this->level = $level;
			$this->time = $time;
		}
		
		// Queries the database and records the state of the game.
		public function save() {
            require_once('PDO_conn.php');
            $link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
    			
    		$userIDQuery = "SELECT user_id FROM users WHERE user_name=\"" . $this->uname . "\";";
    		$result = mysqli_query($link, $userIDQuery);
    		$row = mysqli_fetch_array($result);
    		$userid = intval($row['user_id']);
    			
    		$query = "INSERT INTO games(level_id,game_time,user_id) 
					  VALUES(" . $this->level . ", " . $this->time . ", " . $userid . ");";
			mysqli_query($link, $query);
		}
		
	}

?>