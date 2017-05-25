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

    		$userIDQuery = "SELECT user_id FROM users WHERE user_name=\"" . $this->uname . "\";";
    		$result = mysqli_query($link, $userIDQuery);
    		$row = mysqli_fetch_array($result);
    		$userid = intval($row['user_id']);
    		//For auto generated messages
    		$exclamation = ['Congrats!','Wow!','Amazing!','Slammatocious!','Awesome!','Whoo!','WHOA!'];
    		$place = ["first", 'second', 'third'];
    		//Hacky fix for janky $this->level keks
			$theRealCurrentLevel;
			$theRealCurrentLevelNum;
			if ($this->level < 1){			
				$theRealCurrentLevel = 'Tutorial';
				$theRealCurrentLevelNum = 0;
			} else {
				$theRealCurrentLevel = intval($this->level);
				$theRealCurrentLevelNum = intval($this->level);
			}
            
    		//Grabs the current level 3 highest scores
    		$topScoreQuery = "SELECT game_time, user_name
			FROM games
            INNER JOIN users on users.user_id = games.user_id
    		WHERE game_level= ".$theRealCurrentLevelNum." ORDER BY game_time ASC;";
    		$topScoreResult = mysqli_query($link, $topScoreQuery);
    		$topScoreResults = array();
    		while ($topScoreResultRow = mysqli_fetch_array($topScoreResult)) {
    		    $topScoreResults[] = $topScoreResultRow;
    		}

   //  		//For dubug shenanigans atm
			// require_once('twitterOAuth.php');
			// //Prepares a message to send to twitter
			// $status = 'Congrats! '. $row['user_id'] . ' has a new score on level '
			// . $theRealCurrentLevel . ' with a time of: '.round((($this->time)/1000),2).' seconds!';
			// //Posts via twitter
			// $connection->post('statuses/update', array('status'=>$status));
            
    		//Check if score is smaller than the fetched rows
			if($topScoreResults) {
				$shouldPost = false;
				$i = 0;
				$top3user = array();
				while(sizeof($top3user) < 3 && !$shouldPost && !in_array($this->uname, $top3user)){
					if ($topScoreResults[$i]) {
					    if (!in_array($topScoreResults[$i]['user_name'], $top3user)){
						    if ($topScoreResults[$i]['game_time'] > $this->time){
							    $shouldPost = true;
						    }
						    array_push($top3user, $topScoreResults[$i]['user_name']);
					    }
					} else {
					    $shouldPost = true;
					}
					$i++;
				}
				// while($resultRow = mysqli_fetch_array($topScoreResult)) {
				// 	//forces int onto result row, at index 0 - being game_time

				// 	if( $this->time < $resultRow['game_time'] ){
				// 		$shouldPost = true;
				// 	}
				// }

				if ($shouldPost) {
					//if at anytime new score is better, call for twitter post
					require_once('twitterOAuth.php');
					//Prepares a message to send to twitter
					$randInd = array_rand($exclamation);
					$levelDeclaration = ($theRealCurrentLevelNum === 0) ? "the tutorial level" : ("level " . $theRealCurrentLevel);
					$status = $exclamation[$randInd].' '. $this->uname . ' has a new score on level '
					. $theRealCurrentLevel. ' with a time of '.round((($this->time)/1000),1).' seconds! They are now in '.$place[sizeof($top3user)].' place!';
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