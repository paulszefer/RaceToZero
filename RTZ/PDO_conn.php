<?php

// This file will be heavily modified/replaced later, because we will be using mysqli
// instead.
session_start();

$debugMode = true;

if ($debugMode) {
    $DB_host = "localhost";
    $DB_user = "root";
    $DB_pass = "";
    $DB_name = "comp2910test1";
} else {
    $DB_host = "sql201.byethost12.com";
    $DB_user = "b12_20107247";
    $DB_pass = "password.1";
    $DB_name = "b12_20107247_ZeroSquad2";
}

//for official host
// $DB_host = "sql201.byethost12.com";
// $DB_user = "b12_20107247";
// $DB_pass = "password.1";
// $DB_name = "b12_20107247_ZeroSquad2";


// $DB_host = 'bcitdevcom.ipagemysql.com';
// $DB_user = 'project2017b';
// $DB_pass = 'project.g12';
// $DB_name = 'project2017b';


try {
        //make the connection
        $DB_conn = new PDO("mysql:host={$DB_host};dbname={$DB_name};", $DB_user, $DB_pass);
        // set the PDO error mode to exception
        $DB_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //Just turn emulation off in MySQL driver - only really used in older of MYSQL
        $DB_conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }

include_once 'class.user.php';

//new user object for each instance we need a connection
$user = new USER($DB_conn);
?>