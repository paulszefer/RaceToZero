<?php

require_once('PDO_conn.php');

class USER
{	

	private $conn;
	private $myId;
	private $loggedIn;
	
	public function __construct($DB_conn)
	{
		//I'm assuming $this->conn is USER.conn (java)
		$this->conn = $DB_conn;
    }
	
	//Sets up registration
	public function register($uname,$upass)
	{
		try
		{
			#$new_password = password_hash($upass, PASSWORD_DEFAULT);
			//INSERT into table columns
			$stmt = $this->conn->prepare("INSERT INTO users(user_name,user_pass) VALUES(:uname, :upass)");
			$stmt->bindparam(":uname", $uname);
			$stmt->bindparam(":upass", $upass); //NOTE HASHED PASSWORD IS PUT INTO TABLE
			$stmt->execute();
			return $stmt;	
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}

	//Returns true or false if username/email is in DB, then check password
	public function doLogin($uname,$umail,$upass)
	{
		try
		{
			//Fetches everything on users table
			$stmt = $this->conn->prepare(
				"SELECT username, user_email, user_pass 
				FROM users 
				WHERE username=:uname OR user_email=:umail"
				);
			//execute with params in this format works as if
			// $stmt->bindparam(":uname", $uname);
			// $stmt->bindparam(":umail", $umail);
			// $stmt->execute();
			$stmt->execute(array(':uname'=>$uname, ':umail'=>$umail));
			//PDO::FETCH_ASSOC returns an associative array, indexed by col names
			//PDO::FETCH_BOTH returns an associative array, indexed both by col name AND number
			$userRow=$stmt->fetch(PDO::FETCH_ASSOC);
			//FETCH::ASSOC output (array) is saved into $userRow
			if($stmt->rowCount() == 1)
			{
				//If by good DB design, 1 row is returned, check if $upass(user inputted pass) matches returned password
				if($upass == $userRow['user_pass'])
				{
					//sets the $_SESSION array at 'user_session' as id grabbed from DB table users
					$this->myId = $userRow['id'];
					//$_SESSION['user_session'] = $userRow['id'];
					$_SESSION['user_session'] = "in";
					$_SESSION['username'] = $userRow['username'];
					$_SESSION['userid'] = $userRow['id'];
					$this->loggedIn = true;
					return true;
					//Assigns the session number as the user_id (when user registered onto DB)
				}
				else
				{
					$this->loggedIn = false;
					return false;
				}
			}
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
	
	public function is_loggedin()
	{
		//isset() just determines if a var isn't null - 'user_session' is key, check if NULL
		/*if(isset($_SESSION['user_session']))
		{
			return true;
		}*/
		/*if($this->loggedIn) {
			if($_SESSION['user_session'] == $this->myId)
			{
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}*/
		if(empty($_SESSION['user_session'])){
			return false;
		} else {
			return($_SESSION['user_session'] == "in");
		}
	}
	
	//I guess we change $url for redirect
	public function redirect($url)
	{
		header("Location: $url");
	}
	
	public function doLogout()
	{
		//$_SESSION['user_session'] = "";
		$loggedIn = false;
		unset($_SESSION['user_session']);
		unset($_SESSION['username']);
		unset($_SESSION['userid']);
		session_write_close();
		return true;
	}
	
	public function postComment()
	{
		
	}
} //end of user class
?>