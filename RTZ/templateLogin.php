<?php include("templateHeader.php");?>
<!--insert page specific js css here-->
<title> Template page title </title>
<link rel="stylesheet" href="css/login.css">
<script src='js/login.js'></script>
<?php include("templateNav.php"); ?>
		
<div id='content'>
	<div class='contentactual'>
		<div id='logintab' class='titletab'>Login</div>
		<div id='logincontent'>
			<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
				<table>
				<tr>
					<td><label class="required" for="UserOrEmail">Username/E-mail</label></td>
					<td><input type="text" name="UserOrEmail" id="UserOrEmail" oninput="userOrEmailValid()"></td>
				</tr>	
				<tr>
					<td colspan="3"><p id="UserOrEmailErrorField"></p></td>
				</tr>
				<tr>
					<td><label class="required" for="password">Password</label></td>
					<td colspan="3"><input type="password" name="password" id="password"></td>
				</tr>
				<tr><td colspan="3"><p id="passErrorField"></p></td></tr>
					</table>
				<br>
				<button name="login" value="login" type="submit">Login</button>
			</form>
		</div><!--end of logincontent-->
		<div id='regtab' class='titletab'>Register</div>
		<div id='regcontent'>
			<form name="registration" method ="post" action="registration.php" id="registration" class="registration" onsubmit="return validateForm()">
				<table>
				<tr>
					<th></th> <!---for making 4 columns-->
					<th></th>
					<th></th>
					<th></th>
				</tr>
				<tr>
					<td colspan=4>
						<label for="username" class="required">Username (6-10 Characters, lowercase and numbers only)</label>
						<input type="text" id="username" name="username" oninput="userValid()" required>
					</td>
				</tr>
				<tr>
					<td colspan=4 id="usernameErrorField"></td>
				</tr>
				<tr>
					<td colspan=3>
						<label for="email" class="required">E-mail (BCIT domain and gmail only.)</label>
						<input type="text" id="email" name="email" value="" required>
					</td>
					<td>
						<input type="button" id="emailcheck" name="emailcheck" value="Check" onclick="emailValid()">
					</td>
				</tr>
				<tr>
					<td colspan=4 id="emailErrorField"></td>
				</tr>

				<tr>
					<td colspan=4>
						<label for="password" class="required">Password (10 characters or less)</label>
						<input type="password" id="password" name="password" required>
					<td/>
				</tr>
				<tr>
					<td colspan=3>
						<label for="cpassword">Confirm Password</label>
						<input type="password" id="cpassword" name="cpassword" required>
					</td>
					<td>
						<input type="button" id="passcheck" name="passcheck" value="Check" onclick="passwordValid()">
					</td>
				</tr>
				<tr>
					<td colspan=4 id="cpassErrorField"></td>
				</tr>
				</table>
				<div class="disclaimtext">
					<h2> Disclaimer</h2><br>
					<p> By visiting the website Race To Zero, viewing, accessing or otherwise using any of the services or information created, collected, compiled or submitted to Race To Zero, you agree to be bound by the following Terms and Conditions of Service. If you do not want to be bound by our Terms your only option is not to visit, view or otherwise use the services of Race To Zero. You understand, agree and acknowledge that these Terms constitute a legally binding agreement between you and Race To Zero and that your use of Race To Zero shall indicate your conclusive acceptance of this agreement.
					</p>
					<br>
					<h2>Terms of Service</h2><br>
					<p>Last updated: April 11, 2017</p>
					<br>
					<p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the racetozero.com website (the "Service") operated by Race To Zero ("us", "we", or "our").</p>
					<br>
					<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
					<br>
					<p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms of Service is licensed by TermsFeed to Race To Zero.
					</p>
					<br>
					<p> For our full TOS, please visit <a href="#">here.</a></p>
				</div>	
				<br>
				<div>
					<label for="consent" class="required">Do you agree to the TOS?</label><br>
					<div class="flex1"><input type="radio" id ="consentYes" name="consent" value="Yes" required><br><label for="consentYes">Yes</label></div>
					
					<div class="flex1"><input type="radio" id ="consentNo" name="consent" value="No" required><br><label for="consentNo">No</label></div>

					<div class="flex2"><p id="agreeErrorField"></p></div>
				</div>
				<br>
				<input type="submit" name="register-btn" value="Register"><br><br>
			</form>
		</div>
	</div><!--end of contentactual-->
</div><!--end of content-->

<?php include("templateFooter.php");?>