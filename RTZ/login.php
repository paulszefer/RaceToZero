<?php include("templateHeader.php");?>
<?php
require_once('PDO_conn.php');

//if user is logged in, redirect em to index.php
if(isset($_SESSION['user_session'])){
	$user->redirect('index.php');
}
//renamed
//if register-btn is pressed
if(isset($_POST['register-btn']))
{
	$FormRegUsername = $_POST['regUsername'];
	$FormRegPassword = $_POST['regPassword'];
	$PhotoURL = "url"; // We'll handle the URL later

	//Error handling
	if ($FormRegUsername == ""){
		$error[] = "no username provided";
	} else if ($FormRegPassword == "") {
		$error[] = "no password entered";
	} else {
		//Now if they actually entered things
		try 
		{
			$statement = $DB_conn->prepare("SELECT user_name, user_password
				FROM users 
				WHERE user_name=:uname");
			$statement->execute(array(':uname' => $FormRegUsername));
			//store found rows in $row
			$row = $statement->fetch(PDO::FETCH_ASSOC);
			//Check if username is already taken
			if ($row['user_name'] == $FormRegUsername) {
				$error[] = "username already taken.";
			} else {			
				//If username available, then register the user, and automatically login
				if ($user->register($FormRegUsername, $FormRegPassword, $PhotoURL)) 
				{				
					echo "<script type='text/javascript'>alert('Registration successful');</script>";
					// $user->redirect('login.php');
					if($user->doLogin($FormRegUsername, $FormRegPassword))
						{
							//Optional redirect
							// $user->redirect('index.php');
						} 
						else 
						{
							echo "<script type='text/javascript'>alert('Unknown reg error');</script>";
						}
				}
			}
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
}

//if login is pressed
if(isset($_POST['login']))
{
	//Setting variables
	$FormLoginUsername = $_POST['loginUsername'];
	$FormLoginPassword = $_POST['loginPassword'];

	//if the doLogin function returns true.
	if($user->doLogin($FormLoginUsername, $FormLoginPassword))
	{
		$user->redirect('login.php');
	} 
	else
	{
		$error = "Login info wrong";
	}
}

?>
<!--insert page specific js css here-->
<title>Login/Registration</title>
<link rel="stylesheet" href="css/login.css">
<script src="js/login.js"></script>
<?php include("templateNav.php");?>
	
<div id='content'>
	<div class='contentactual'>
		<!--Login section of the php-->
		<div id='logintab' class='titletab'>Login</div>
		<div id='logincontent'>
			<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
				<table>
				<tr>
					<td><label class="required" for="loginUsername">Username</label></td>
					<td><input type="text" name="loginUsername" id="loginUsername" oninput="loginUserValid()"></td>
				</tr>	
				<tr>
					<td colspan="3"><p id="loginUsernameErrorField" style="text-align:center">&nbsp</p></td>
				</tr>
				<tr>
					<td><label class="required" for="password">Password</label></td>
					<td colspan="3"><input type="password" name="loginPassword" id="loginPassword"></td>
				</tr>
				<tr><td colspan="3"><p id="loginPassErrorField" style="text-align:center">&nbsp</p></td></tr>
					</table>
				<br>
				<button name="login" value="login" type="submit">Login</button>
			</form>
		</div><!--end of logincontent-->
		
		<!--registration section of the php-->
		<div id='regtab' class='titletab'>Register</div>
		<div id='regcontent'>
			<form name="registration" method ="post" action="login.php" id="registration" class="registration" onsubmit="return validateForm()">
				<table>
				<tr>
					<th></th> <!---for making 4 columns-->
					<th></th>
					<th></th>
					<th></th>
				</tr>
				<tr>
					<td colspan=4>
						<label for="regUsername" class="required">Username (6-10 Characters, lowercase + numbers only)</label>
						<input type="text" id="regUsername" name="regUsername" oninput="userValid()" required>
					</td>
				</tr>
				<tr>
					<td colspan=4 id="regUsernameErrorField"></td>
				</tr>
				<tr>
					<td colspan=4>
						<label for="regPassword" class="required">Password (6+ characters, letter and numbers only)</label>
						<input type="password" id="regPassword" name="regPassword" required>
					<td/>
				</tr>
				<tr>
					<td colspan=3>
						<label for="cRegPassword">Confirm Password</label>
						<input type="password" id="cRegPassword" name="cRegPassword" required>
					</td>
					<td>
						<input type="button" id="passcheck" name="passcheck" value="Check" onclick="passwordValid()">
					</td>
				</tr>
				<tr>
					<td colspan=4 id="cRegPassErrorField"></td>
				</tr>
				</table>
				<br>
				<input type="submit" name="register-btn" value="Register"><br><br>
			</form>
		</div>
	</div><!--end of contentactual-->
</div><!--end of content-->

<?php include("templateFooter.php");?>