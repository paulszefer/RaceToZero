<?php
    // Provides functions that will be referenced by JavaScript functions in order
    // to query the database. The JavaScript functions will send the name of the
    // function they want to access it as a POST variable; this file then uses a
    // switch statement to execute that function and echo the results in JSON format.

    // Reads in the username using a session variable and the level and time using post
    // variables. Then invokes the save() function in class.game.php to send the
    // game data to the database. Does not have a return value.
    function saveGame() {
        session_start();

        $uname = $_SESSION['user_name'];
        $level = $_POST['level'];
        $time = $_POST['time'];

        include_once('class.game.php');

        $game = new GAME($uname, $level, $time);

        $game->save();
    }
	
    // Reads in a level as a post variable and returns an array with all the game times
    // for that level sorted in order from shortest to longest.
    function getShortestTimes() {
        $level = $_POST['level'];

        $times = array();

        require_once('PDO_conn.php');
        $link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);

        $query = "SELECT game_time,
                         user_name
				  FROM games
				  	INNER JOIN users ON users.user_id = games.user_id
				  WHERE game_level=" . ($level + 1) . 
				" ORDER BY game_time ASC;";

        $result = mysqli_query($link, $query);

        if($result) {
            while($row = mysqli_fetch_array($result)) {
                $times[] = $row;
            }
        }

        $json = json_encode($times);
        return $json;
    }
	
    function setHighestLevelAchieved() {
        require_once('PDO_conn.php');
        $link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);

        $query = "UPDATE users
                  SET user_level=" . $_POST['level'] . 
                " WHERE user_id=\"" . $_SESSION['user_id'] . "\";";
        mysqli_query($link, $query);
    }

    // Runs whenever this file is invoked by the jQuery $.post function; reads in the
    // name of the function as a post variable and echoes the output of that function.
    $function = $_POST['function'];
    switch ($function) {
        case 'saveGame':
            echo saveGame();
            break;
        case 'getShortestTimes':
            echo getShortestTimes();
            break;
        case 'setHighestLevelAchieved':
            echo setHighestLevelAchieved();
            break;
    }

?>