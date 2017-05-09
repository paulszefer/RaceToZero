<?php
require_once('PDO_conn.php');

if($user->is_loggedin()) {
	$user->redirect('glossary.php');
}

if(isset($_POST['login'])) {
	//Setting variables
	$FormUsername = $_POST['UserOrEmail'];
	$FormEmail = $_POST['UserOrEmail'];
	$FormPassword = $_POST['password'];

	//if the doLogin function returns true.
	if($user->doLogin($FormUsername, $FormEmail, $FormPassword)) {
		//IDK REDIRECT IT SOMEHWER ELSE?! - how 2 redirect to loggedin index plshalp
		$user->redirect('index.php');
	} 
	else {
		$error = "Login info wrong";
	}
}
?>
<?php include("ProtoHeader.php"); ?>
	<link rel="stylesheet" href="css/login.css" media="screen">
	<script src="css/login.js"></script>
	<title>Login</title>
<?php include("ProtoNavLogged.php"); ?>

		<div id="mainContent">  <!-- Insert your part of the website here. -->
			<div class="Body_Area">
				<div class="content">				
					<div id="userimage">
						<!--- yo parse dis -->
						<img src="images/profile.png" alt="You">
					</div>
					<br>
						<?php
				        if(isset($error))
				        {
				              ?>
				              <div>
				                  <?php echo $error; ?>
				              </div>
				              <?php
				        }
				        ?>
					<div>
						<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
							<div>
								<label class="required" for="UserOrEmail">Username/E-mail</label>
								<input type="text" name="UserOrEmail" id="UserOrEmail" oninput="userOrEmailValid()">
							</div> 
							<p id="UserOrEmailErrorField"></p>
							<br>
							<div>
								<label class="required" for="password">Password</label>
								<input type="password" name="password" id="password" oninput="passwordValid()">
							</div>
							<p id="passErrorField"></p>
							<br>
							<button name="login" value="login" type="submit">Login</button>
						</form>
					</div>
					<div>
						<a href= "forgot.php">Forgot Password?</a>
					</div>
			
					<div>
						<a href= "registration.php">Register Now</a>
					</div>
					<br>
					<div class = "disclaimer">
						<h3>DISCLAIMER</h3>
						<p id="disclaimtext">Ubique veritus probatus ut nec. Eum ex meis detraxit honestatis. Vivendum deserunt delicata no mei. His persius menandri an, at sea inani apeirian necessitatibus. Habeo ubique pro te, has dicant docendi moderatius ei.
						</p>
					</div>
				</div> <!--end of content-->
			</div> <!--end of bodyarea-->
		</div>  <!--End of mainContent-->

<?php include ("ProtoFooter.php"); ?>