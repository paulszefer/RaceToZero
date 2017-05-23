<?php include("templateHeader.php");?>

<!--insert page specific js css here-->
<title>Race To Zero - Resources</title>
<link rel="stylesheet" href="css/resource.css">
<script src="js/resource.js"></script>
<?php include("templateNav.php");?>

<div id='content'>
	<div class='contentactual'>
		<div class='contentwrapper'> <!--whole wrapper for the boxes-->
			<div class='expandedcontentbox'>    <!-- Impact box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Impact</h1>
				<ol>
					<li>Which of these is the biggest contributor to food waste?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Retail waste</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Not enough storage or packaging</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Consumer waste</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Production waste</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>How much money does a typical household in Vancouver lose due to food waste each year?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">$200</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$700</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$1200</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$2100</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>How does food waste hurt the environment?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">It creates landfills</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It feeds bugs</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It stinks</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>Which of these can we save by reducing food waste?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">People</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Energy</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">School</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Computers</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- How to tell if food has gone bad box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Has your food gone bad?</h1><br>
				<ol>
					<li>Do the best before dates found on food packaging tell you when it’s unsafe to eat the food?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Depends on the food</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>Which of these foods have gone bad if you’ve found mold on them?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Meat &amp; Dairy</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Bread</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Fruits &amp; Vegetables</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">All of these</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>How safe is it to eat an apple that’s very soft on the inside?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">It's safe</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It depends</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It's not safe</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>Is a coating of slime on meat a sign of bad food?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>Are fruits and vegetables with slightly odd coloring safe to eat?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Only fruits are</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Only vegetables are</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>When you put an egg in water and it’s unsafe to eat, what happens to the egg?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">It sinks</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It floats</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">It stays in the middle</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>Is a food still safe if it smells weird?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Only if it looks fine</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>If green vegetables have turned yellow are they safe to eat?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>Are bruised fruits and vegetables safe to eat?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">If you remove the bruised portion</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Only in small amounts</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>Is lettuce with brown discoloration safe to eat?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Yes</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">No</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- Food 911 box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Food 911</h1>
				<ol>
					<li>What’s a good way to make stale chips taste good again?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Refrigerating them</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Toasting them</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Soaking them in water</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Breaking them into smaller pieces</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>How can you heal wilted or wrinkled vegetables?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Chopping it up</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Freezing it</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Putting it in ice water</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Cooking it</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>What should you do with apples you don’t want to eat?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Give them away</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Throw them away</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Make apple sauce</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>Which of these is the best use for stale bread?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Making breadcrumbs</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Feeding ducks</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Making compost</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>What should you do with browning bananas?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">Compost them</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Throw them away</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">Make a banana smoothie</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- Facts box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Facts</h1>
				<ol>
					<li>How many apples are thrown out every day in Metro Vancouver?<span class="correcttext">&nbsp;Correct&nbsp;<img class="correctIcon" src="img/correctIcon1.png"></span><span class="incorrecttext">&nbsp;Incorrect&nbsp;<img class="incorrectIcon" src="img/incorrectIcon1.png"></span><br>
					<ul>
						<li><button type="button" onclick="displayIcon(this);">1,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">13,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">29,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">55,000</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
					<li>How many loaves of bread are wasted every day in Metro Vancouver?<span class="correcttext">&nbsp;Correct&nbsp;<img class="correctIcon" src="img/correctIcon1.png"></span><span class="incorrecttext">&nbsp;Incorrect&nbsp;<img class="incorrectIcon" src="img/incorrectIcon1.png"></span><br>
					<ul>
						<li><button type="button" onclick="displayIcon(this);">800</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">15,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">32,000</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">41,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>How much of the food produced around the world is wasted?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">One fifth</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">One quarter</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">One third</button><img class="answerIcon" src="img/correctIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">One half</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
					</ul></li><br>
					<li>How much money could we save if there was zero food waste around the world?
					<ul>
						<li><button type="button" onclick="displayIcon(this);">$1,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$1,000,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$1,000,000,000</button><img class="answerIcon" src="img/incorrectIcon1.png"></li>
						<li><button type="button" onclick="displayIcon(this);">$1,000,000,000,000</button><img class="answerIcon" src="img/correctIcon1.png"></li>
					</ul></li><br>
			</div>
<!-- AFFILIATED APPS BOX -->
			<div class='expandedcontentbox bigexpandedcontentbox'>	<!-- Affiliated Apps -->
				<img class="xbutton" id="bigone" src="img/tempX.png">
				<h1>AFFILIATED APPS</h1>
				<p id=centeraffappstext>
				Here are some other apps that we have connection with!
				</p>
				<br>
	            <hr>
				<h2>Food Factory Zero</h2>
				<br>
				<img src='img/foodfactorylogo.png' height='150' width='150' alt='food factory logo'>
	            <br><br>
	            <p><a href='https://foodfactoryzero.firebaseapp.com/'>Food Factory Zero</a> is a time-based drag and drop game. All you need to do is pick and match the ingredients with recipes.</p>
				<br>
	            <hr>
				<h2>Captin Plan-It</h2>
				<br>
				<img src='img/cp3v2.png' height='150' width='150' alt='captain plan-it logo'>
				<br><br>
	            <p><a href='http://students.bcitdev.com/A01009216/Captain-Plan-It/index.php'>Captain Plan-It</a> is an educational quiz game where you can answer questions related to food groups. Answer correctly to earn keys which can unlock accessories for your own personal hero!</p>
				<br>
	            <hr>
	            <h2>Food Fall</h2>
	            <br>
				<img src='img/foodfallartwork.jpg' height='150' width='150' alt='food fall logo'>
				<br><br>
	            <p><a href='http://FoodFall.ca'>Food Fall</a> is a game that teaches you the effects of food waste - and to have fun too!</p>
	            <br>
				</div>
			<!--start of the topic boxes-->
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>Impact</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>Has your food gone bad?</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>Food 911</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>Facts</h1>
				</div>
			</div>
			<div class='contentboxwrapper bigcontentboxwrapper'>
				<div class='contentbox bigcontentbox'>
					<h1>Affiliated Apps</h1>
					<br>
					<div class='affimg'>
						<img src='img/affiliatedlogo.png'>
					</div>
				</div>
			</div>
		</div><!--end of contentwrapper-->
	</div><!--end of contentactual-->
</div><!--end of #content-->

<?php include("templateFooter.php");?>