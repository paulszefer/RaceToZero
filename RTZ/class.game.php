<?php

	require_once('PDO_conn.php');
	
	class GAME {
		
		private $conn;
		private $uname;
		private $level;
		private $time;
		
		public function __construct($DB_conn, $uname, $level, $time) {
			$this->conn = $DB_conn;
			$this->uname = $uname;
			$this->level = $level;
			$this->time = $time;
		}
		
		public function save() {
			try {
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
				return $stmt;	
			}
			catch(PDOException $e) {
				echo $e->getMessage();
			}
		}
		
	}

?>