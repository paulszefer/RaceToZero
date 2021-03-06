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
        	UNIQUE (user_name),
        	PRIMARY KEY (user_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: goals
    	$sql_goals = "CREATE TABLE IF NOT EXISTS goals (
    		goal_id INT NOT NULL AUTO_INCREMENT,
    		goal_name VARCHAR(80) NOT NULL,
    		goal_x1 INT NOT NULL,
    		goal_y1 INT NOT NULL,
    		goal_x2 INT NOT NULL,
    		goal_y2 INT NOT NULL,
    		PRIMARY KEY (goal_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: fooditems
    	$sql_fooditems = "CREATE TABLE IF NOT EXISTS fooditems (
    		fooditem_id INT NOT NULL AUTO_INCREMENT,
    		fooditem_name VARCHAR(80) NOT NULL,
    		fooditem_type INT NOT NULL,
    		fooditem_image VARCHAR(255) NOT NULL,
    		fooditem_isedible BOOLEAN NOT NULL,
    		PRIMARY KEY (fooditem_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: playitems
    	$sql_playitems = "CREATE TABLE IF NOT EXISTS playitems (
    		playitem_id INT NOT NULL AUTO_INCREMENT,
    		playitem_initx1 INT NOT NULL,
    		playitem_inity1 INT NOT NULL,
    		playitem_initdx INT NOT NULL,
    		playitem_initdy INT NOT NULL,
    		fooditem_id INT NOT NULL,
    		PRIMARY KEY (playitem_id),
    		FOREIGN KEY (fooditem_id) REFERENCES fooditems(fooditem_id)
    	) ENGINE = MYISAM ;";

    	//	 Database Table: levels
    	$sql_levels = "CREATE TABLE IF NOT EXISTS levels (
    		level_id INT NOT NULL AUTO_INCREMENT,
    		playitem_id INT NOT NULL,
    		PRIMARY KEY (level_id),
    		FOREIGN KEY (playitem_id) REFERENCES playitems(playitem_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: stages
    	$sql_stages = "CREATE TABLE IF NOT EXISTS stages (
    		stage_id INT NOT NULL AUTO_INCREMENT,
    		goal_id INT,
    		level_id INT NOT NULL,
    		PRIMARY KEY (stage_id),
    		FOREIGN KEY (level_id) REFERENCES levels(level_id),
    		FOREIGN KEY (goal_id) REFERENCES goals(goal_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: barriers
    	$sql_barriers = "CREATE TABLE IF NOT EXISTS barriers (
    		barrier_id INT NOT NULL AUTO_INCREMENT,
    		barrier_name VARCHAR(80) NOT NULL,
    		barrier_x1 INT NOT NULL,
    		barrier_y1 INT NOT NULL,
    		barrier_x2 INT NOT NULL,
    		barrier_y2 INT NOT NULL,
    		stage_id INT NOT NULL,
    		PRIMARY KEY (barrier_id),
    		FOREIGN KEY (stage_id) REFERENCES stages(stage_id)
    	) ENGINE = MYISAM ;";

    	//   Database Table: games
    	$sql_games = "CREATE TABLE IF NOT EXISTS games (
    		game_id INT NOT NULL AUTO_INCREMENT,
    		game_time INT NOT NULL,
    		level_id INT NOT NULL,
    		user_id INT NOT NULL,
    		PRIMARY KEY (game_id),
    		FOREIGN KEY (user_id) REFERENCES users(user_id),
    		FOREIGN KEY (level_id) REFERENCES levels(level_id)
    	) ENGINE = MYISAM ;";

    	//   Add level_id to goals
    	$sql_goalsupdate = "ALTER TABLE goals
    		ADD COLUMN stage_id INT NOT NULL,
    		ADD CONSTRAINT goals_stage_id_fk
    		FOREIGN KEY (stage_id) REFERENCES stages(stage_id);";

    	//   Add level_id to playitems
    	$sql_playitemsupdate = "ALTER TABLE playitems
    		ADD COLUMN level_id INT NOT NULL,
    		ADD CONSTRAINT playitems_level_id_fk
    		FOREIGN KEY (level_id) REFERENCES levels(level_id);";

    	// Executes all of the above queries.
    	$db_conn->exec($sql_dbdelete);
    	$db_conn->exec($sql_dbcreation);
    	$db_conn->exec($sql_dbuse);
    	$db_conn->exec($sql_users);
    	$db_conn->exec($sql_goals);
    	$db_conn->exec($sql_fooditems);
    	$db_conn->exec($sql_playitems);
    	$db_conn->exec($sql_levels);
    	$db_conn->exec($sql_barriers);
    	$db_conn->exec($sql_games);
    	$db_conn->exec($sql_goalsupdate);
    	$db_conn->exec($sql_playitemsupdate);
    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
?>