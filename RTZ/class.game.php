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
            require_once('dblogin.php');
	        $link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
	        
    		$userIDQuery = "SELECT user_id FROM users WHERE user_name=\"" . $this->uname . "\";";
    		$result = mysqli_query($link, $userIDQuery);
    		$row = mysqli_fetch_array($result);
    		$userid = intval($row['user_id']);
    		//Grabs the current level 3 highest scores
    		$topScoreQuery = "SELECT game_time, user_name
    		FROM games
    		WHERE game_level = " . $this->level . " ORDER BY game_time ASC
    		LIMIT 3;";
    		$topScoreResult = mysqli_query($link, $topScoreQuery);

    		//Check if score is smaller than the fetched rows
			if($topScoreResult) {
				$resultRow;
				$shouldPost = false;
				while($resultRow = mysqli_fetch_array($topScoreResult)) {
					//forces int onto result row, at index 0 - being game_time
					if($this->time < intval($resultRow['game_time'])){
						$shouldPost = true;
					}
				}
				if ($shouldPost) {
					//if at anytime new score is better, call for twitter post
					require_once('twitterOAuth.php');
					//Prepares a message to send to twitter
					$status = 'Congrats! '. $resultRow['user_name'] . ' has a new score on level '
					. $this->level . ' with a time of: '.(($this->time)/1000).' seconds!';
					//Posts via twitter
					$connection->post('statuses/update', array('status'=>$status));
				}
			}
    		$query = "INSERT INTO games(game_level,game_time,user_id)
					  VALUES(" . $this->level . ", " . $this->time . ", " . $userid . ");";
			mysqli_query($link, $query);
		}
		
	}

?>