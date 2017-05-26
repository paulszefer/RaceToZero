<?php
    session_start();
    include("templateHeader.php");
?>

<title>Race To Zero - Leaderboard</title>
<link rel="stylesheet" href="css/leaderboard.css">
<script src="js/leaderboard.js"></script>
<?php include("templateNav.php");?>

<div id='content'>
	<div class='contentactual'>
		<h1>Leaderboard</h1>
		<br>
		<p>&nbsp;</p>
		<table id="besttimes" border="1">
			<!--This table is populated with data using the js/leaderboard.js file.-->
			<tr>
				<th>Placement</th>
				<th>Username</th>
				<th>Time</th>
			</tr>
		</table>
	</div>
</div>
<?php include("templateFooter.php");?>