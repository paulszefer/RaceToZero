<!-- This file provides a footer for every page on the website. -->
		<div id='footer'>
			<div class='eefootercontent'>
				<p id="footerp"><marquee behaviour=alternate direction="down">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				Copyright whatever
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				<img class="easteregg" src="img/party-dinosaur.gif">
				</marquee></p>
			</div>
			<div class='footercontent'>
				<p>
				<span id="copyright" onClick="trigger()">Copyright whatever</span>
				</p>
			</div>
		</div>

		<script>
			function trigger() {
				var dino = document.createElement("img");
				dino.src = "img/party-dinosaur.gif";
				dino.setAttribute("class", "easteregg");

				var num = document.getElementsByClassName("easteregg").length

				if (num < 12) {
					$(dino).insertBefore("#copyright");
					trigger2();
				} else {
					document.getElementsByClassName("eefootercontent")[0].style.width = "100%";
					document.getElementsByClassName("eefootercontent")[0].style.height = "10vh";
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
