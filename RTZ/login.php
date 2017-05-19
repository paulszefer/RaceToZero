<?php include("templateHeader.php");?>
<?php
require_once('PDO_conn.php');

//if user is logged in, redirect em to index.php
if($user->is_loggedin()){
	$user->redirect('index.php');
}

?>
<!--insert page specific js css here-->
<title>Race to Zero - Login</title>
<link rel="stylesheet" href="css/login.css">
<script src="js/login.js"></script>
<?php include("templateNav.php");?>
	
<div id='content'>
	<div class='contentactual'>
		<!--Login section of the php-->
		<div id='tabwrapper'>
		<div id='logintab' class='titletab'>Login</div>
		<div id='regtab' class='titletab'>Register</div>
		</div>
		<div id='logincontent'>
			<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
				<table>
				<tr>
					<td><label class="required" for="loginUsername">Username</label></td>
					<td><input type="text" name="loginUsername" id="loginUsername" oninput="loginUserValid()" value=<?php if (isset($_POST['loginUsername'])) echo $_POST['loginUsername'];?>></td>
				</tr>	
				<tr>
					<td colspan="3"><p id="loginUsernameErrorField" style="text-align:center"> &nbsp;</p></td>
				</tr>
				<tr>
					<td><label class="required" for="password">Password</label></td>
					<td colspan="3"><input type="password" name="loginPassword" id="loginPassword"></td>
				</tr>
				<tr><td colspan="3"><p id="loginPassErrorField" style="text-align:center">&nbsp;</p></td></tr>
					</table>
				<br>
				<button name="login" value="login" type="submit">Login</button>
			</form>
			<?php
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
					echo '<p style="text-align:center">'.$user->displayloginError().'</p>';
				}
			}
			?>
		</div><!--end of logincontent-->
		
		<!--registration section of the php-->
		<div id='regcontent'>
			<form name="registration" method ="post" action="login.php" id="registration" class="registration" onsubmit="return validateForm()">
			<p>
				<?php
					//if register-btn is pressed
					if(isset($_POST['register-btn']))
					{
						$FormRegUsername = $_POST['regUsername'];
						$FormRegPassword = $_POST['regPassword'];
						$PhotoURL = rand(0,10); // takes random integer for disp image
						$user->register($FormRegUsername, $FormRegPassword, $PhotoURL);
					}
				?>
			</p>
			<script type = "text/javascript">
				var insert = "<p style='text-align:center'>"+<?php echo "'".$user->displayRegError()."'"?>+"</p>";
				$(insert).insertAfter("#loginform");
			</script>
				<table>
				<tr>
					<th></th> <!---for making 4 columns-->
					<th></th>
					<th></th>
					<th></th>
				</tr>
				<tr>
					<td colspan=4>
						<label for="regUsername" class="required">Username (4-16 letters or numbers only)</label>
						<input type="text" id="regUsername" name="regUsername" oninput="userValid()" required>
					</td>
				</tr>
				<tr>
					<td colspan=4 id="regUsernameErrorField"></td>
				</tr>
				<tr><td>&nbsp;</td></tr>
				<tr>
					<td colspan=4>
						<label for="regPassword" class="required">Password (6+ letters or numbers only)</label>
						<input type="password" id="regPassword" name="regPassword" required>
					<td/>
				</tr>
				<tr><td>&nbsp;</td></tr>
				<tr>
					<td colspan=4>
						<label for="cRegPassword">Confirm Password</label>
						<input type="password" id="cRegPassword" name="cRegPassword" required>
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