<?php
	// Queries the database in order to get the current user's score on the tutorial
	// level.
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
?>

<?php include("templateHeader.php");?>
<link rel="stylesheet" href="css/profile.css">
<?php include("templateNav.php");?>

<div id='content'>
	<div class='contentactual'>
		<h1>Profile</h1>
		<br>
		<div class='row'>
			<div class = 'col half-col'>
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
			</div>
			<div class = 'col half-col'>
			<ul>
	            <li>Username: <?php echo $_SESSION['user_name']; ?></li>
	            <li>&nbsp;</li>
	            <li>High score: <?php echo displayTutorialScore(); ?></li>
	            <li>&nbsp;</li>
	        </ul>
	        </div>
		</div>
	<!--The following is a work in progress. The user will be able to change their
	profile picture to another (random) picture.-->
	<!--<div class'inline'>
    	<img src="img/setprofilepic.png" name="canvas" width="225" height="150" />
	</div>
    <br><br>
	<div class='button'>
		<input onclick="displayImage();" type="button" value="Change Image">
	</div>
	<br><br>
    <br>-->
	</div>
</div>
<div id='footer'>
	<div class='footercontent'>
		<p>Copyright whatever</p>
	</div>
</div>

</body>

</html>