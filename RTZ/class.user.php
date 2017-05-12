<?php
//Grabs connection script
require_once('PDO_conn.php');

class USER {
	private $conn;
	private $myId;
	private $loggedIn;
	
	public function __construct($DB_conn) {
		//I'm assuming $this->conn is USER.conn (java)
		$this->conn = $DB_conn;
    }
	
	//Sets up registration function
	public function register($uname,$upass,$photourl) {
		try {
			$stmt = $this->conn->prepare(
				"INSERT INTO users(user_name,user_password,user_photo) 
				VALUES(:uname, :upass, :photourl)");
			$stmt->bindparam(":uname", $uname);
			$stmt->bindparam(":upass", $upass);
			$stmt->bindparam(":photourl", $photourl);
			$stmt->execute();
			return $stmt;	
		}
		catch(PDOException $e) {
			echo $e->getMessage();
		}
	}

	//Returns true or false if username/email is in DB, then check password
	public function doLogin($uname,$upass) {
		try {
			$stmt = $this->conn->prepare(
				"SELECT user_name, user_password
				FROM users 
				WHERE user_name=:uname"
				);
			$stmt->execute(array(':uname'=>$uname));
			$userRow = $stmt->fetch(PDO::FETCH_ASSOC);
			//If a row is returned
			if($stmt->rowCount() == 1) {
				//If password = db returned password
				if($upass == $userRow['user_password']) {
					//sets the $_SESSION array at 'user_session' as id grabbed from DB table users
					$this->myId = $userRow['user_id'];
					//$_SESSION['user_session'] = $userRow['id'];
					//temp ghetto fix atm
					$_SESSION['user_session'] = "in";
					$_SESSION['user_name'] = $userRow['user_name'];
					$_SESSION['user_id'] = $userRow['user_id'];
					//set this user loggedIn status as true
					$this->loggedIn = true;
					return true;
					//Assigns the session number as the user_id (when user registered onto DB)
				}
				else {
					$this->loggedIn = false;
					return false;
				}
			}
		}
		catch(PDOException $e) {
			echo $e->getMessage();
		}
	}
	
	//checks if an user object is logged in
	public function is_loggedin() {
		//isset() just determines if a var isn't null - 'user_session' is key, check if NULL
		if(isset($_SESSION['user_session']))
		{
			return true;
		}
		if($this->loggedIn) {
			if($_SESSION['user_session'] == $this->myId)
			{
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	//Redirects user to another page
	public function redirect($url) {
		header("Location: $url");
	}
	
	//unsets current user's session set by doLogin(), and destroys current session
	public function doLogout() {
		$loggedIn = false;
		unset($_SESSION['user_session']);
		unset($_SESSION['user_name']);
		unset($_SESSION['user_id']);
		session_write_close();
		session_destroy();
		return true;
	}
	
	//TO be implemented if there is time
	public function postComment() {
		
	}
} //end of user class
?>