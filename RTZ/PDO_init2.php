<?php
	// Creates the database and its tables.
	session_start();
	$debugMode = true;
    if ($debugMode) {
        $db_host = "localhost";
        $db_user = "root";
        $db_pass = "";
        $db_name = "comp2910test1";
    } else {
        $db_host = "sql201.byethost12.com";
        $db_user = "b12_20107247";
        $db_pass = "password.1";
        $db_name = "b12_20107247_ZeroSquad2";
    }
	try {
        //make the connection
        $db_conn = new PDO("mysql:host={$db_host};", $db_user, $db_pass);
        // set the PDO error mode to exception
        $db_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // turn emulation off in MySQL driver - only really used in older of MYSQL
        $db_conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $sql_dbdelete = "DROP DATABASE " . $db_name . ";";
        // Creates the database and tells MySQL to use it.
        $sql_dbcreation = "CREATE DATABASE IF NOT EXISTS " . $db_name . ";";
        $sql_dbuse = "USE " . $db_name;

    	//  Database Table: users
        $sql_users = "CREATE TABLE IF NOT EXISTS users (
       		user_id INT NOT NULL AUTO_INCREMENT,
       		user_name VARCHAR(80) NOT NULL,
       		user_password VARCHAR(80) NOT NULL,
       		user_photo VARCHAR(255) NOT NULL,
       		user_level INT NOT NULL,
        	UNIQUE (user_name),
        	PRIMARY KEY (user_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: games
    	$sql_games = "CREATE TABLE IF NOT EXISTS games (
    		game_id INT NOT NULL AUTO_INCREMENT,
    		game_time INT NOT NULL,
    		game_level INT NOT NULL,
    		user_id INT NOT NULL,
    		PRIMARY KEY (game_id),
    		FOREIGN KEY (user_id) REFERENCES users(user_id)
    	) ENGINE = MYISAM ;";

    	// Executes all of the above queries.
    	$db_conn->exec($sql_dbdelete);
    	$db_conn->exec($sql_dbcreation);
    	$db_conn->exec($sql_dbuse);
    	$db_conn->exec($sql_users);
    	$db_conn->exec($sql_games);
    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
?>