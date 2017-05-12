<?php include("templateHeader.php");?>

<title>Leaderboard</title>
<script src="js/leaderboard.js"></script>
<?php include("templateNav.php");?>

<div id='content'>
	<div class='contentactual'>
		<h1>Leaderboard</h1>
		<br>
		<p>Text here</p>
		<table id="besttimes" border="1">
			<!--This table is populated with data using the js/leaderboard.js file.-->
			<tr>
				<th>Placement</th>
				<th>User_id</th>
				<th>Time</th>
			</tr>
		</table>
	</div>
</div>
<div id='footer'>
	<div class='footercontent'>
		<p>Copyright whatever</p>
	</div>
</div>
        
</body>
	

</html>