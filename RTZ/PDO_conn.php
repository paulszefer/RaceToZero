<?php
//this file should really be hidden somewhere else, but whatever for now
session_start();

//for localhost testing
/*
$DB_host = "localhost";
$DB_user = "root";
$DB_pass = "";
$DB_name = "comp1536project";
*/

$DB_host = 'bcitdevcom.ipagemysql.com';
$DB_user = 'project2017b';
$DB_pass = 'project.g12';
$DB_name = 'project2017b';

try {
        //make the connection
        $DB_conn = new PDO("mysql:host={$DB_host};dbname={$DB_name};", $DB_user, $DB_pass);
        // set the PDO error mode to exception
        $DB_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //Just turn emulation off in MySQL driver - only really used in older of MYSQL
        $DB_conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        //echo "Connect success.";
        //Create table if not exist
    	//
    	//  Database Table 1
    	//
        $sql ="CREATE TABLE IF NOT EXISTS `users` (
       `id` INT( 11 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
       `username` VARCHAR( 255 ) NOT NULL ,
       `user_email` VARCHAR( 60 ) NOT NULL ,
       `user_pass` VARCHAR( 255 ) NOT NULL ,
        UNIQUE (`username`),
        UNIQUE (`user_email`)
    	) ENGINE = MYISAM ;";
        $DB_conn->exec($sql);
    	
    	
    	//
    	//   Database Table 2
    	//
    	$sql2 = "CREATE TABLE IF NOT EXISTS `comments` (
    	`SKU` INT( 11 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    	`id` INT( 11 ) ,
    	`username` VARCHAR( 255 ) NOT NULL ,
    	`usercomment` VARCHAR( 255 ) NOT NULL ,
    	`post_date` DATETIME NOT NULL DEFAULT NOW() ,
    	`building` VARCHAR( 255 )
    	) ENGINE = MYISAM ;";
    	$DB_conn->exec($sql2);

    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }

include_once 'class.user.php';

//new user object for each instance we need a connection
$user = new USER($DB_conn);
?>