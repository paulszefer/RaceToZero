<?php include("templateHeader.php");?>
<title>Race to Zero</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/game.css">
<link rel="stylesheet" href="css/questionsandanswers.css">

<?php
/* loads 'play' screen first if the user is not logged in */
    if(isset($_SESSION['user_session']))
    {
        $loggedIn = -1;
    } else {
        $loggedIn = -2;
    }
?>
<script>
    let loggedIn = <?php echo $loggedIn; ?>;
</script>

<script src="js/ObjectDefinitions.js"></script>
<script src="js/engine.js"></script>
<?php include("templateNav.php");?>
		
<div id="content">
	<div class='contentactual'>
	</div>
</div>

<?php include("templateFooter.php");?>