<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
	<head>
	<title>Race to Zero</title>
	<link rel="stylesheet" href="css/masterreset.css">
	<link rel="stylesheet" href="css/template2.css">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<script src='js/template.js'></script>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/overlaynav.js"></script>
<!--insert page specific js css here-->
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/game.css">
<script src="js/ObjectDefinitions.js"></script>
<script src="js/engine.js"></script>

</head>
<body>
	<div id="overlay"></div>
	<div id="header">
		<div id='navCont'>
			<div class='navlogo'>
				<a href='index.php'><img src='img/logo.png' alt='logo'></a>
				<div class='loginstatus'>
					<p>
					<?php
						if(isset($_SESSION['user_session']))
						{
							echo 
							'<h2>Welcome, '.$_SESSION['user_name'].'</h2>';
						} else {
							echo 
							'<h2>Currently Not logged in </h2>';
						}
					?>
					</p>
				</div>
				<div id='navburger'>
					<img src='img/menuicon.png'>
				</div>
			</div> <!--end of navlogo-->
			<div class='navlinks'>
				<ul>
					<a href='index.php'><li class='navbuttonleft'>Home</li></a>
					<a href='resource.php'><li class='navbuttonleft'>Resources</li></a>
					<a href='leaderboard.php'><li class='navbuttonleft'>Leaderboard</li></a>
					<?php
						if(isset($_SESSION['user_session']))
						{
							echo 
							"<a href='profile.php'><li class='navbuttonright'>Profile</li></a>
							<a href='logout.php'><li class='navbuttonright'>Logout</li></a>";
						} else {
							echo 
							"<a href='login.php'><li class='navbuttonright'>Login/Register</li></a>";
						}
					?>
				</ul>
			</div><!--end ov navlinks-->

            <div id="mobilenav">
                <ul>
                <a href='index.php'><li class='mobilelist'><div>Home</div></li></a>
				<a href='resource.php'><li class='mobilelist'><div>Resources</div></li></a>
				<a href='leaderboard.php'><li class='mobilelist'><div>Leaderboard</div></li></a>
				<?php
					if(isset($_SESSION['user_session']))
					{
						echo 
						"<a href='profile.php'><li class='mobilelist'><div>Profile</div></li></a>
						<a href='logout.php'><li class='mobilelist'><div>Logout</div></li></a>";
					} else {
						echo 
						"<a href='login.php'><li class='mobilelist'><div>Login/Register</div></li></a>";
					}
				?>
                </ul>
            </div><!--end of mobilenav-->
		</div>
	</div>
		
<div id="content">
	<div class='contentactual'>
	</div>
</div>

<?php include("templateFooter.php");?>