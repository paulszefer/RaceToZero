<?php
	session_start();
	
    if (isset($_SESSION['user_session'])) {
        header("Location: index.php");
    }
    
    require_once('PDO_conn.php');
    
    //if login is pressed
    if (isset($_POST['login'])) {
        //Setting variables
        $FormLoginUsername = $_POST['loginUsername'];
        $FormLoginPassword = $_POST['loginPassword'];

        //if the doLogin function returns true.
        if ($user->doLogin($FormLoginUsername, $FormLoginPassword)) {
            header("Location: index.php");
        } else {
            echo '<p style="text-align:center">'.$user->displayloginError().'</p>';
        }
    }
    
    //if register-btn is pressed
    if (isset($_POST['register-btn'])) {
        $FormRegUsername = $_POST['regUsername'];
        $FormRegPassword = $_POST['regPassword'];
        $PhotoURL = rand(1,10); // takes random integer for disp image
        if ($user->register($FormRegUsername, $FormRegPassword, $PhotoURL)) {
            $user->doLogin($FormRegUsername, $FormRegPassword);
            header("Location: index.php");
        }
    }
?>

<?php include("templateHeader.php"); ?>
<!--insert page specific js css here-->
<title>Race to Zero - Login</title>
<link rel="stylesheet" href="css/login.css">
<script src="js/login.js"></script>
<?php include("templateNav.php"); ?>
	
<div id='content'>
    <div class='contentactual'>
        <!--Login section of the php-->
        <div id='tabwrapper'>
        <div id='logintab' class='titletab activetab'>Login</div>
        <div id='regtab' class='titletab inactivetab'>Register</div>
    </div>
		<div id='logincontent'>
			<form id="loginform" method="post" onsubmit="return loginvalidation()" action="login.php">
				<table>
				<tr>
					<td colspan="4"><label for="loginUsername">Username:</label>
					<input type="text" name="loginUsername" id="loginUsername" oninput="loginUserValid()" value=<?php if (isset($_POST['loginUsername'])) echo $_POST['loginUsername'];?>></td>
				</tr>	
				<tr>
					<td colspan="4"><p id="loginUsernameErrorField"> &nbsp;</p></td>
				</tr>
				<tr><td>&nbsp;</td></tr>
				<tr>
					<td colspan="4"><label for="password">Password:</label>
					<input type="password" name="loginPassword" id="loginPassword"></td>
				</tr>
				<tr><td colspan="4"><p id="loginPassErrorField">&nbsp;</p></td></tr>
				<tr><td>&nbsp;</td></tr>
					</table>
				<br>
				<!--<button name="login" value="login" type="submit">Login</button>-->
				<input type="submit" name="login" value="Login">
			</form>
		</div><!--end of logincontent-->
		
		<!--registration section of the php-->
		<div id='regcontent'>
			<form name="registration" method="post" action="login.php" id="registration" class="registration" onsubmit="return validateForm()">
                <script type = "text/javascript">
                    var insert = "<p id='regRetError' style='text-align:center; color:red;'>"+<?php echo "'".$user->displayRegError()."'"?>+"</p>";
                    $(insert).insertAfter("#registration");
                    if ($('#regRetError').html()!==''){
                        // Autoclicks the regtab if #regRetError has text
                        $("#regcontent").css("display", "block");
                        $("#logincontent").css("display", "none");
                    }
                </script>
                <table>
                    <tr>
                        <th></th> <!-- for making 4 columns -->
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <label for="regUsername">Username:</label>
                            <input type="text" id="regUsername" placeholder="(4-16 letters or numbers)" name="regUsername" oninput="userValid()" required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" id="regUsernameErrorField">&nbsp;</td>
                    </tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr>
                        <td colspan="4">
                            <label for="regPassword">Password:</label>
                            <input type="password" id="regPassword" placeholder="(6+ letters or numbers)" name="regPassword" required>
                        </td>
                    </tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr>
                        <td colspan="4">
                            <label for="cRegPassword">Confirm Password</label>
                            <input type="password" id="cRegPassword" name="cRegPassword" required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" id="cRegPassErrorField"></td>
                    </tr>
				</table>
				<br>
				<input type="submit" name="register-btn" value="Register"><br><br>
			</form>
		</div>
	</div><!--end of contentactual-->
</div><!--end of content-->

<?php include("templateFooter.php");?>