<!-- This file provides the header and nav bar for all the pages in the site. -->
</head>
<body>
	<div id="overlay"></div>
	<div id="header">
		<div id='navCont'>
			<div class='navlogo'>
				<a href='index.php'><img src='img/logo.png' alt='logo'></a>
				<div class='loginstatus'>
					<p>
					<?php
						if(isset($_SESSION['user_session']))
						{
							echo 
							'<h2>Welcome, '.$_SESSION['user_name'].'</h2>';
						} else {
							echo 
							'<h2>Currently Not logged in </h2>';
						}
					?>
					</p>
				</div>
				<div id='navburger'>
					<img src='img/menuicon.png'>
				</div>
			</div> <!--end of navlogo-->
			
			<!-- This div is used for the nav on desktop. -->
			<div class='navlinks'>
				<ul>
					<a href='index.php'><li class='navbuttonleft'>Home</li></a>
					<a href='resource.php'><li class='navbuttonleft'>Resources</li></a>
					<a href='leaderboard.php'><li class='navbuttonleft'>Leaderboard</li></a>
					<?php
						if(isset($_SESSION['user_session']))
						{
							echo 
							"<a href='profile.php'><li class='navbuttonright'>Profile</li></a>
							<a href='logout.php'><li class='navbuttonright'>Logout</li></a>";
						} else {
							echo 
							"<a href='login.php'><li class='navbuttonright'>Login/Register</li></a>";
						}
					?>
				</ul>
			</div><!--end of navlinks-->

			<!-- This div is used for the nav on mobile. -->
            <div id="mobilenav">
                <ul>
                <a href='index.php'><li class='mobilelist'><div>Home</div></li></a>
				<a href='resource.php'><li class='mobilelist'><div>Resources</div></li></a>
				<a href='leaderboard.php'><li class='mobilelist'><div>Leaderboard</div></li></a>
				<?php
					if(isset($_SESSION['user_session']))
					{
						echo 
						"<a href='profile.php'><li class='mobilelist'><div>Profile</div></li></a>
						<a href='logout.php'><li class='mobilelist'><div>Logout</div></li></a>";
					} else {
						echo 
						"<a href='login.php'><li class='mobilelist'><div>Login/Register</div></li></a>";
					}
				?>
                </ul>
            </div><!--end of mobilenav-->
		</div>
	</div>