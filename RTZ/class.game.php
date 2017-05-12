<?php

	require_once('PDO_conn.php');
	
	class GAME {
		
		private $uname;
		private $level;
		private $time;
		
		public function __construct($uname, $level, $time) {
			$this->uname = $uname;
			$this->level = $level;
			$this->time = $time;
		}
		
		public function save() {
			try {/*
				$stmt1 = $this->conn->prepare(
					"SELECT user_id
					FROM games
					WHERE user_name='" . $this->uname . "';");
				$stmt1->execute();
				$row = $statement->fetch(PDO::FETCH_ASSOC);
				
				$userid = $row['user_id'];
			
				$stmt = $this->conn->prepare(
					"INSERT INTO games(game_level,game_time,user_id) 
					VALUES(:level, :time, :userid)");
				$stmt->bindparam(":level", $this->level);
				$stmt->bindparam(":time", $this->time);
				$stmt->bindparam(":userid", $userid);
				$stmt->execute();
				return $stmt;	*/
				
				$username = "root";
    			$password = "";
   				$host     = "localhost";
    			$database = "comp2910test1";

    			$link = mysqli_connect($host, $username, $password, $database);
    			
    			$userIDQuery = "SELECT user_id FROM users WHERE user_name=\"" . $this->uname . "\";";
    			$result = mysqli_query($link, $userIDQuery);
    			$row = mysqli_fetch_array($result);
    			$userid = intval($row['user_id']);
    			
    			$query = "INSERT INTO games(level_id,game_time,user_id) 
						  VALUES(" . $this->level . ", " . $this->time . ", " . $userid . ");";
				var_dump($query);
				mysqli_query($link, $query);
			}
			catch(PDOException $e) {
				echo $e->getMessage();
			}
		}
		
	}

?>