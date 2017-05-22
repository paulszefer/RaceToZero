<?php
    
	session_start();
	
	if(!isset($_SESSION['user_session'])) {
		header('Location: login.php');
	}
	
	if(isset($_GET['pic'])) {
		setPic($_GET['pic']);
		header('Location: profile.php');
	}

	function setPic($picURL) {
		// Eventually these will be in their own file for convenience.
		$username = "root";
    	$password = "";
   		$host     = "localhost";
    	$database = "comp2910test1";
    	
    	$link = mysqli_connect($host, $username, $password, $database);
		$query = "UPDATE users
				  SET user_photo = \"" . $picURL . "\"
				  WHERE user_name=\"" . $_SESSION['user_name'] . "\"";
		mysqli_query($link, $query);
	}

?>

<?php include("templateHeader.php");?>
<link rel="stylesheet" href="css/changepic.css">
<script src="js/changepic.js"></script>
<?php include("templateNav.php");?>

<title>Race to Zero - Change Your Picture</title>
<div id='content'>
	<div class='contentactual'>
		<h1>Change Your Picture</h1>
		<br>
		<div class='row'>
			<div class = 'col'>
				<h2>Your Current Picture:</h2>
				<?php				
					echo
					(
					"<img src='img/profilepics/".$user->getUserProfileImage()."'>"
					);
				?>
			</div>
		</div>	
		<div class='row'>	
			<div class='col'>
				<p id='explanation'>Click on a picture to make it yours!</p>
				<table id='pictures'>
					<?php
						for ($i = 1; $i <= 10; $i++) {
							if ($i % 5 == 1) {
								echo "<tr>";
							}
							echo "<td>";
								echo "<a href='changepic.php?pic=" . $i . "'>";
								echo "<img src='img/profilepics/" . $i . ".png'>";
							echo "</td>";
							if ($i % 5 == 0) {
								echo "</tr>";
							}
						}
					?>
				</table>
	        </div>
		</div>
	</div>
</div>
<?php include("templateFooter.php");?>