<?php
	require_once('PDO_conn.php');
	$link = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
	// Queries the database in order to get the current user's score on the tutorial
	// level.
	// Currently unused; will probably be deleted later. (replaced with getLevelScore())
	function displayTutorialScore() {
	
		// Eventually these will be in their own file for convenience.
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";

    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT game_time
				  FROM games
				  	INNER JOIN users ON games.user_id = users.user_id
				  WHERE level_id=1
				  	AND user_name=\"" . $_SESSION['user_name'] . 
			  "\" ORDER BY game_time ASC;";
		$result = mysqli_query($link, $query);
		if($result) {
			$row = mysqli_fetch_array($result);
		}
		
		return $row['game_time'];
	}
	
	// Queries the database in order to get the current user's score on any level.
	function getLevelScore($level) {
        global $link;
		// Eventually these will be in their own file for convenience.
    	$query = "SELECT game_time
				  FROM games
				  	INNER JOIN users ON games.user_id = users.user_id
				  WHERE game_level=" . $level .
				  "	AND user_name=\"" . $_SESSION['user_name'] . 
			  "\" ORDER BY game_time ASC;";
		$result = mysqli_query($link, $query);
		if($result) {
			$row = mysqli_fetch_array($result);
		}
		
		return $row['game_time'];
	}
?>

<?php include("templateHeader.php");?>
<link rel="stylesheet" href="css/profile.css">
<?php include("templateNav.php");?>

<title>Race to Zero - Profile</title>
<div id='content'>
	<div class='contentactual'>
		<h1>Profile</h1>
		<br>
		<div class='row'>
			<div class = 'col'>
			<?php
				//If user is logged in, display their profile picture
				//If by chance not, 
				if(isset($_SESSION['user_session']))
				{					
					echo
					(
					"<img src='img/profilepics/".$user->getUserProfileImage()."'>"
					);
				} else {
					echo
					(
					"<img src='img/profilepics/setprofilepic.png'>"
					);
				}
			?>
				<p id='changepic'><a href='changepic.php'>Change Your Picture</a></p>
			</div>
		</div>	
		<div class='row'>	
			<div class = 'col'>
			<ul>
	            <li>Username: <?php echo $_SESSION['user_name']; ?></li>
	            <li>&nbsp;</li>
	            <li>Your Best Times:<br><br>
	            	<?php 
	            		echo "<table id='bestTimesTable'>";
	            			echo "<tr>";
	            				echo "<th>Level</th>";
	            				echo "<th>Time</th>";
	            			echo "</tr>";
	            			for ($i = 0; $i <= 4; $i++) { // edit if extra level(s) added
	            				echo "<tr>";
	            					echo "<td>" . (($i == 0) ? "Tutorial" : $i) . "</td>";
	            					$levelScore = getLevelScore($i);
	            					echo "<td>" . (($levelScore == 0) ? "-" : (round($levelScore / 1000.0, 1) . "s")) . "</td>";
	            				echo "</tr>";
	            			}
	            		echo "</table>";
	            	?>
				</li>
	        </ul>
	        </div>
		</div>
	</div>
</div>
<?php include("templateFooter.php");?>