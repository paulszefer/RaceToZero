<!-- This file provides a footer for every page on the website. -->
		<div id='footer'>
			<div class='footercontent'><div><p id="footerp">
				<span id="copyright" onClick="trigger()">Copyright whatever</span>
			</div>
		</div>

		<script>
			function trigger() {
				var dino = document.createElement("img");
				dino.src = "img/party-dinosaur.gif";
				dino.setAttribute("class", "easteregg");

				var num = document.getElementsByClassName("easteregg").length

				if (num < 10) {
				$(dino).insertBefore("#copyright");
				trigger2();
				}
			}			
			function trigger2() {
				var dino = document.createElement("img");
				dino.src = "img/party-dinosaur.gif";
				dino.setAttribute("class", "easteregg");			
				$(dino).insertAfter("#copyright");
			}
// 			function img_create() {
//     var img = IEWIN ? new Image() : document.createElement('img');
//     img.src = "img/party-dinosaur.gif";
//     img.alt = "party";
// 	img.class = "easteregg"
//     return img;
// }
		</script>
	</body>
</html>
