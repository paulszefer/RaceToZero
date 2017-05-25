<!-- This file provides a footer for every page on the website. -->
		<div id='footer'>
			<div class='eefootercontent'>
				<p id="footerp"><marquee behaviour=alternate direction="down">
				<a href="about.php">About Us</a><br>
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				Copyright 2017
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				</marquee></p>
			</div>
			<div class='footercontent'>
				<p>
				<a href="about.php">About Us</a><br><span id="copyright" onClick="trigger()">Copyright 2017</span>
				</p>
			</div>
		</div>

		<script>
			function trigger() {
				var dino = document.createElement("img");
				dino.src = "img/party-dinosaur.gif";
				dino.setAttribute("class", "easteregg");

				var num = document.getElementsByClassName("easteregg").length

				if (num < 20) {
					$(dino).insertBefore("#copyright");
					trigger2();
				} else {
					document.getElementsByClassName("eefootercontent")[0].style.width = "100%";
					document.getElementsByClassName("eefootercontent")[0].style.height = "10vh";
					document.getElementsByClassName("eefootercontent")[0].style.borderTop = "1px solid black";
					document.getElementsByClassName("footercontent")[0].style.display = "none";
				}
			}			
			function trigger2() {
				var dino = document.createElement("img");
				dino.src = "img/party-dinosaur.gif";
				dino.setAttribute("class", "easteregg");			
				$(dino).insertAfter("#copyright");
			}
		</script>
	</body>
</html>
