<?php

	session_start();

	//for localhost testing
	/*
	$db_host = "localhost";
	$db_user = "root";
	$db_pass = "";
	$db_name = "comp1536project";
	*/

	$db_host = 'bcitdevcom.ipagemysql.com';
	$db_user = 'project2017b';
	$db_pass = 'project.g12';
	$db_name = 'project2017b';

	try {
        //make the connection
        $db_conn = new PDO("mysql:host={$db_host};", $db_user, $db_pass);
        // set the PDO error mode to exception
        $db_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //Just turn emulation off in MySQL driver - only really used in older of MYSQL
        $db_conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        
        $sql_dbcreation = "CREATE DATABASE IF NOT EXISTS " . $db_name . ";";
        
    	//  Database Table 1
        $sql_users ="CREATE TABLE IF NOT EXISTS users (
       		user_id INT NOT NULL AUTO_INCREMENT,
       		user_name VARCHAR(80) NOT NULL,
       		user_password VARCHAR(80) NOT NULL,
       		user_photo VARCHAR(255) NOT NULL,
        	UNIQUE (user_name),
        	PRIMARY KEY (user_id)
    	) ENGINE = MYISAM ;";
    	
    	//   Database Table 2
    	$sql_games = "CREATE TABLE IF NOT EXISTS games (
    		game_id INT NOT NULL AUTO_INCREMENT,
    		game_level INT NOT NULL,
    		game_time INT NOT NULL,
    		user_id INT NOT NULL,
    		PRIMARY KEY (game_id),
    		FOREIGN KEY (user_id) REFERENCES users(user_id)
    	) ENGINE = MYISAM ;";
    	
    	$db_conn->exec($sql_dbcreation);
    	$db_conn->exec($sql_users);
    	$db_conn->exec($sql_games);

    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
?>