<?php
//Grabs connection script
session_start();
require_once('PDO_conn.php');

class USER {
	private $conn;
	private $myId;
	private $loggedIn;
	public $loginError;
	public $registerError;
	
	public function __construct($DB_conn) {
		//I'm assuming $this->conn is USER.conn (java)
		$this->conn = $DB_conn;
		if (isset($_SESSION['user_session'])){
			$this->loggedIn = true;
			$this->myId = $_SESSION['user_id'];
		}
    }
	
	//Sets up registration function
	public function register($uname,$upass,$photourl) {
		$this->registerError = '';
		$regUserPattern = '/^[a-zA-Z0-9]{4,16}(?!.{1,})$/';
		$regPassPattern = '/^[a-zA-Z0-9]{6,}$/';
		//Check if they entered username and password
		if(empty($uname)||empty($upass)){
			$this->registerError='No username or password provided';
			return false;
		} else if (!preg_match($regUserPattern, $uname)){
			//check if they entered the right user pattern
			$this->registerError='Username did not match specified pattern';
			return false;
		} else if (!preg_match($regPassPattern, $upass)){
			//check if they entered the right password pattern
			$this->registerError='Password contains illegal characters';
			return false;
		} else {
			//if they passed all of these tests, check if username already taken
			try {
				$statement = $this->conn->prepare(
					"SELECT user_name
					FROM users 
					WHERE user_name=:uname");
				$statement->execute(array(':uname'=>$uname));
				$row = $statement->fetch(PDO::FETCH_ASSOC);
				//Check if username is already taken
				if (strtolower($row['user_name']) == strtolower($uname)){
					$this->registerError = 'Username already taken';
					return false;
				} else {
					$levelAchieved = $_COOKIE['level'] ? $_COOKIE['level'] : 0;
					//If they passed all the tests, register them in
					$stmt = $this->conn->prepare(
					"INSERT INTO users(user_name,user_password,user_photo,user_level) 
					VALUES(:uname, :upass, :photourl, :ulevel)");
					$stmt->execute(array(':uname'=>$uname, ':upass'=>$upass,':photourl'=>$photourl, ':ulevel'=>$levelAchieved));
					//and log them in automatically
					$this->doLogin($uname, $upass);
					//and redirect them to login script
					$this->redirect('index.php');
					return true;
				}//End of else
			} catch(PDOException $e) {
				echo $e->getMessage();
		}//End of catch for register
	}} //End of Register

	//Returns true or false if username/email is in DB, then check password
	public function doLogin($uname,$upass) {
		$this->loginError ='';
		try {
			$stmt = $this->conn->prepare(
				"SELECT user_name, user_password, user_id, user_level
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
					$_SESSION['user_session'] = $userRow['user_name'];
					$_SESSION['user_name'] = $userRow['user_name'];
					$_SESSION['user_id'] = $userRow['user_id'];
					setcookie("level", $userRow['user_level'], time() + 86400);
					
					include_once('class.game.php');
                    if($_COOKIE['level0']) {
                        $game = new GAME($userRow['user_name'], 0, $_COOKIE['level0']);
                        $game->save();
                        setcookie("level0", 0, time() - 86400);
                    }
                    if($_COOKIE['level1']) {
                        $game = new GAME($userRow['user_name'], 1, $_COOKIE['level1']);
                        $game->save();
                        setcookie("level1", 0, time() - 86400);
                    }
                    if($_COOKIE['level2']) {
                        $game = new GAME($userRow['user_name'], 2, $_COOKIE['level2']);
                        $game->save();
                        setcookie("level2", 0, time() - 86400);
                    }
                    if($_COOKIE['level3']) {
                        $game = new GAME($userRow['user_name'], 3, $_COOKIE['level3']);
                        $game->save();
                        setcookie("level3", 0, time() - 86400);
                    }
                    if($_COOKIE['level4']) {
                        $game = new GAME($userRow['user_name'], 4, $_COOKIE['level4']);
                        $game->save();
                        setcookie("level4", 0, time() - 86400);
                    }
					
					//set this user loggedIn status as true
					$this->loggedIn = true;
					return true;
					//Assigns the session number as the user_id (when user registered onto DB)
				}
				else {
					$this->loggedIn = false;
					$this->loginError = 'Incorrect Password';
					return false;
				}
			} else {
				$this->loginError = 'Username does not exist';
				return false;
			}
		}
		catch(PDOException $e) {
			echo $e->getMessage();
		}
	}

	public function displayLoginError(){
		return $this->loginError;
	}
	public function displayRegError(){
		return $this->registerError;
	}
	//checks if an user object is logged in
	public function is_loggedin() {
		//isset() just determines if a var isn't null - 'user_session' is key, check if NULL
		return $this->loggedIn;
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
	//Grabs user profile image
	public function getUserProfileImage(){
		try 
		{
			//Select the userimage filename
			$statement = $this->conn->prepare("SELECT user_photo
				FROM users
				WHERE user_name=:uname");
			$statement->execute(array(':uname' => $_SESSION['user_name']));
			//store found rows in $row
			$row = $statement->fetch(PDO::FETCH_ASSOC);
			//return user_photo name, concatenate with png extension
			return ($row['user_photo']).".png";
		}
		catch(PDOException $e) {
			echo $e->getMessage();
		}
	}
} //end of user class
?>