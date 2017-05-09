<?php
require_once('PDO_conn.php');

if($user->is_loggedin()!=""){
	$user->redirect('home.php');
}
//renamed
if(isset($_POST['register-btn']))
{
	$FormUsername = $_POST['username'];
	$FormEmail = $_POST['email'];
	$FormPassword = $_POST['password'];
	$PhotoURL = "url"; // We'll handle the URL later

	if ($FormUsername == ""){
		$error[] = "no username provided";
	} else if ($FormPassword == "") {
		$error[] = "no password entered";
	} else {
		try 
		{
			$statement = $DB_conn->prepare("SELECT user_name, user_pass 
				FROM users 
				WHERE username=:uname");
			$statement->execute(array(':uname' => $FormUsername));
			//store found rows in $row
			$row = $statement->fetch(PDO::FETCH_ASSOC);

			if ($row['username'] == $FormUsername) {
				$error[] = "username already taken.";
			} else {			
				if ($user->register($FormUsername, $FormPassword, $PhotoURL)) 
				{				
					$user->redirect('login.php');					
				}
			}
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
}
?>
<?php include("ProtoHeader.php"); ?>
<link rel="stylesheet" href="css/registration.css" media="screen">
<script src="css/registration.js"></script>
<title>Registration</title>
<?php include("ProtoNavLogged.php"); ?>

	<div id="mainContent">  <!-- Insert your part of the website here. -->
	<div class="actualContent"> <!--Helps contain individual members' page -->
		<div id="wrapper">
		<div class="content">
			<!---left column in reg page-->
			<div class="leftcol">
				<div class="sitelogo">
					<img src="./images/logo.png" alt="site logo"></div>
				<br>
				<div class="servicedesc">
					<h2>Brief Service Description</h2><br>
					<p>Virtual Tour (VT) is a platform that registered academic facilities from all over the world can access.</p>
					
					<p>It provides a solution for students or employees that wants a preview of facilities on the campus, 
					before they even set foot upon it.</p>
					<p>VT utilizes GPS technology and Google API to determine the exact location on campus,
					it provides a tour builder that will allow individual academic institutions to customize the tour of their campus 
					for specific programs. </p>
					<p>Users of this app can be sent customized routes specific for their needs, by their institution. The mobile version
					of this app keeps track of a progress of each building visited by the user. </p>
					<p>Users can also post comments on specific buildings, and start interacting with other people on tips and tricks of
					how to travel quickly through campus, or where all the "important" places on campus are.</p>
					</div>
			</div>
			
			<!---right column in reg page-->
			<div class="rightcol">
				<div class="regform">
					<!---fill in tde action please-->
					<!---remember to input functions too -->
					<?php 
					if (!empty($error)) {
						foreach($error as $result) {
					    echo $result . '<br>';
						}
					} 

					?>
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
							<h2> Disclaimer</h2>
							<p> By visiting the website Virtual Tour, viewing, accessing or otherwise using any of the services or information created, collected, compiled or submitted to Virtual Tour, you agree to be bound by the following Terms and Conditions of Service. If you do not want to be bound by our Terms your only option is not to visit, view or otherwise use the services of Virtual Tour. You understand, agree and acknowledge that these Terms constitute a legally binding agreement between you and Virtual Tour and that your use of Virtual Tour shall indicate your conclusive acceptance of this agreement.
							</p>
							<br>
							<h2>Terms of Service</h2>
							<p> 
							Last updated: April 11, 2017</p>
							<br>
							Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the VirtualTour.com website (the "Service") operated by Virtual Tour ("us", "we", or "our").
							<br>
							<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
							<br>
							<p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms of Service is licensed by TermsFeed to Virtual Tour.
							</p>
							<br>
							<p> For our full TOS, please visit <a href="http://ourdisclaimer.com/?i=Virtual%20Tour">here.</a></p>
						</div>	
						<br>
						<label for="consent" class="required">Do you agree to the TOS?</label>
						<div>
							<div class="flex1"><input type="radio" id ="consentYes" name="consent" value="Yes" required><br><label for="consentYes">Yes</label></div>
							
							<div class="flex1"><input type="radio" id ="consentNo" name="consent" value="No" required><br><label for="consentNo">No</label></div>

							<div class="flex2"><p id="agreeErrorField"></p></div>
						</div>
						<input type="submit" name="register-btn" value="Register now">
					</form>
				</div>
			</div>
		</div>
		</div>
	</div> <!--End of actualContent-->
	</div>  <!--End of mainContent-->
<?php include ("ProtoFooter.php"); ?>