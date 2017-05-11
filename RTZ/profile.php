<?php
	require_once('PDO_conn.php');
	
	function displayTutorialScore() {
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp1536project";

    	$link = mysqli_connect($host, $username, $password, $database);
    	$query = "SELECT game_time
				  FROM games
				  	INNER JOIN users ON games.user_id = users.user_id
				  WHERE level_id=0
				  	AND user_name=$_POST['user_name']
				  ORDER BY game_time ASC;";
			
		$result = mysqli_query($link, $query);
	
		if($result) {
			$row = mysqli_fetch_array($result)
		}
		
		return $$row['game_time'];
	}
?>
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

	            <div id="mobilenav">
	                <ul>
	                <a href='index.html'><li class='mobilelist'><div>Home</div></li></a>
					<a href='resource.html'><li class='mobilelist'><div>Resources</div></li></a>
					<a href='login.html'><li class='mobilelist'><div>Login/Register</div></li></a>
					<a href='profile.html'><li class='mobilelist'><div>Profile</div></li></a>
					<a href='leaderboard.html'><li class='mobilelist'><div>Leaderboard</div></li></a>
	                </ul>
	            </div><!--end of mobilenav-->

			</div>
		</div>	
		<div id='content'>
			<div class='contentactual'>
				<h1>Profile</h1>
				<br>
    			<br>
			<div class='inline'>
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

</html>