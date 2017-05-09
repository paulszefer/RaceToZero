<?php include("templateHeader.php");?>
<!--insert page specific js css here-->
<title>Race to Zero</title>
<link rel="stylesheet" href="css/login.css">
<script src="js/login.js"></script>
<?php include("templateNav.php"); ?>
	
<div id='content'>
	<div class='contentactual'>
		<div id='logintab' class='titletab'>Login</div>
		<div id='logincontent'>
			<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
				<table>
				<tr>
					<td><label class="required" for="UserOrEmail">Username</label></td>
					<td><input type="text" name="UserOrEmail" id="UserOrEmail" oninput="loginUserValid()"></td>
				</tr>	
				<tr>
					<td colspan="3"><p id="UserOrEmailErrorField" style="text-align:center">LoginError</p></td>
				</tr>
				<tr>
					<td><label class="required" for="password">Password</label></td>
					<td colspan="3"><input type="password" name="password" id="password"></td>
				</tr>
				<tr><td colspan="3"><p id="passErrorField" style="text-align:center">PassError</p></td></tr>
					</table>
				<br>
				<button name="login" value="login" type="submit">Login</button>
			</form>
		</div><!--end of logincontent-->
		
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
						<label for="username" class="required">Username (6-10 Characters, lowercase + numbers only)</label>
						<input type="text" id="username" name="username" oninput="userValid()" required>
					</td>
				</tr>
				<tr>
					<td colspan=4 id="usernameErrorField"></td>
				</tr>
				<tr>
					<td colspan=4>
						<label for="password" class="required">Password</label>
						<input type="password" id="regPassword" name="regPassword" required>
					<td/>
				</tr>
				<tr>
					<td colspan=3>
						<label for="cpassword">Confirm Password</label>
						<input type="password" id="cRegPassword" name="cRegPassword" required>
					</td>
					<td>
						<input type="button" id="passcheck" name="passcheck" value="Check" onclick="passwordValid()">
					</td>
				</tr>
				<tr>
					<td colspan=4 id="cpassErrorField"></td>
				</tr>
				</table>

				<br>
				
				<input type="submit" name="register-btn" value="Register"><br><br>
			</form>
		</div>
	</div><!--end of contentactual-->
</div><!--end of content-->

<?php include("templateFooter.php");?>