<?php
	//require_once('PDO_conn.php');
	
	function displayTutorialScore() {
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
<<<<<<< HEAD
<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="css/masterreset.css">
		<link rel="stylesheet" href="css/template2.css">
        <link rel="stylesheet" href="css/profile.css">
		<script src='js/template.js'></script>
		<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="js/overlaynav.js"></script>
		<script src="js/profile.js"></script>
	</head>
	</html>
	<body>
		<div id=overlay></div>
		<div id="header">
			<div id='navCont'>
				<div class='navlogo'>
					<a href='index.html'><img src='img/logo.png' alt='logo'></a>
					<div class='loginstatus'>
						<p>Welcome, Horse</p>
					</div>
					<div id='navburger'>
						<img src='img/menuicon.png'>
					</div>
				</div> <!--end of navlogo-->
				<div class='navlinks'>
					<ul>
						<a href='index.html'><li class='navbuttonleft'>Home</li></a>
						<a href='resource.html'><li class='navbuttonleft'>Resources</li></a>
						<a href='login.html'><li class='navbuttonright'>Login/Register</li></a>
						<a href='profile.html'><li class='navbuttonright'>Profile</li></a>
						<a href='leaderboard.html'><li class='navbuttonleft'>Leaderboard</li></a>
					</ul>
				</div><!--end ov navlinks-->
=======
>>>>>>> moredb

<?php include("templateHeader.php");?>
<link rel="stylesheet" href="css/profile.css">
<?php include("templateNav.php");?>

<<<<<<< HEAD
			</div>
		</div>	
		<div id='content'>
			<div class='contentactual'>
				<h1>Profile</h1>
				<br>
    			<br>
				<img class='img' src="img/setprofilepic.png" name="canvas" width="225" height="150" />
				<br>
				<br>
				<p>Username: Huehue
				<br>
				High score: 123456
				<br>
				Something: helloitsme
				</p>
				<!--<ul>
                    <li>Username: Huehue</li>
                    <li>&nbsp;</li>
                    <li>High score: <?php displayTutorialScore() ?></li>
                    <li>&nbsp;</li>
                    <li>Something: helloitsme</li>
                </ul>-->
			</div>
			<div class'inline'>
    		<img src="img/setprofilepic.png" name="canvas" width="225" height="150" />
			</div>
    		<br><br>
			<div class='button'>
			<input onclick="displayImage();" type="button" value="Change Image">
			</div>
			<br><br>
                <br>
			</div>
		</div>
		<div id='footer'>
			<div class='footercontent'>
				<p>Copyright whatever</p>
			</div>
		</div>
	</body>
=======
<div id='content'>
	<div class='contentactual'>
		<h1>Profile</h1>
		<br>
        <img src='img/setprofilepic.png'>
		<ul>
            <li>Username: <?php echo $_SESSION['user_name']; ?></li>
            <li>&nbsp;</li>
            <li>High score: <?php echo displayTutorialScore(); ?></li>
            <li>&nbsp;</li>
            <li>Something: helloitsme</li>
        </ul>
        <br>
	</div>
</div>
<div id='footer'>
	<div class='footercontent'>
		<p>Copyright whatever</p>
	</div>
</div>

</body>
>>>>>>> moredb

</html>