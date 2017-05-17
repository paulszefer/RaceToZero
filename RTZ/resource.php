<?php include("templateHeader.php");?>

<!--insert page specific js css here-->
<title>Resources</title>
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
					<li>Which of these is the biggest contributor to food waste?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br><!-- these spans are for displaying whether or not an answer is coorect -->
					<ul>
						<!-- buttons have names: t is topic number, q is question number, all buttons on same question have same name. Value is either correct or incorrect. Name and value is sent to answerCheck function in resource.js -->
						<li><button type="button" name="t1q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Retail waste</button></li>
						<li><button type="button" name="t1q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Not enough storage or packaging</button></li>
						<li><button type="button" name="t1q1" value="correct" onClick="answerCheck(this.name, this.value)">Consumer waste</button></li>
						<li><button type="button" name="t1q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Production waste</button></li>
					</ul></li><br>
					<li>How much money does a typical household in vancouver lose due to food waste?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t1q2" value="incorrect" onClick="answerCheck(this.name, this.value)">$200</button></li>
						<li><button type="button" name="t1q2" value="correct" onClick="answerCheck(this.name, this.value)">$700</button></li>
						<li><button type="button" name="t1q2" value="incorrect" onClick="answerCheck(this.name, this.value)">$1200</button></li>
						<li><button type="button" name="t1q2" value="incorrect" onClick="answerCheck(this.name, this.value)">$2100</button></li>
					</ul></li><br>
					<li>How does food waste hurt the environment?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t1q3" value="correct" onClick="answerCheck(this.name, this.value)">It creates landfills</button></li>
						<li><button type="button" name="t1q3" value="incorrect" onClick="answerCheck(this.name, this.value)">It feeds bugs</button></li>
						<li><button type="button" name="t1q3" value="incorrect" onClick="answerCheck(this.name, this.value)">It stinks</button></li>
					</ul></li><br>
					<li>Which of these can we save by reducing food waste?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t1q4" value="incorrect" onClick="answerCheck(this.name, this.value)">People</button></li>
						<li><button type="button" name="t1q4" value="correct" onClick="answerCheck(this.name, this.value)">Energy</button></li>
						<li><button type="button" name="t1q4" value="incorrect" onClick="answerCheck(this.name, this.value)">School</button></li>
						<li><button type="button" name="t1q4" value="incorrect" onClick="answerCheck(this.name, this.value)">Computers</button></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- How to tell if food has gone bad box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Has your food gone bad?</h1><br>
				<ol>
					<li>Do the best before dates found on food packaging tell you when it’s unsafe to eat the food?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q1" value="correct" onClick="answerCheck(this.name, this.value)">No</button></li>
						<li><button type="button" name="t2q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Depends on the food</button></li>
					</ul></li><br>
					<li>Which of these foods have gone bad if you’ve found mold on them?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q2" value="incorrect" onClick="answerCheck(this.name, this.value)">Meat &amp; Dairy</button></li>
						<li><button type="button" name="t2q2" value="incorrect" onClick="answerCheck(this.name, this.value)">Bread</button></li>
						<li><button type="button" name="t2q2" value="incorrect" onClick="answerCheck(this.name, this.value)">Fruits &amp; Vegetables</button></li>
						<li><button type="button" name="t2q2" value="correct" onClick="answerCheck(this.name, this.value)">All of them</button></li>
					</ul></li><br>
					<li>How safe is it to eat an apple that’s very soft on the inside?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q3" value="incorrect" onClick="answerCheck(this.name, this.value)">It's safe</button></li>
						<li><button type="button" name="t2q3" value="incorrect" onClick="answerCheck(this.name, this.value)">It depends</button></li>
						<li><button type="button" name="t2q3" value="correct" onClick="answerCheck(this.name, this.value)">It's not safe</button></li>
					</ul></li><br>
					<li>Is a coating of slime on meat a sign of bad food?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q4" value="correct" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q4" value="incorrect" onClick="answerCheck(this.name, this.value)">No</button></li>
					</ul></li><br>
					<li>Are fruits and vegetables with slightly odd coloring safe to eat?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q5" value="correct" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q5" value="incorrect" onClick="answerCheck(this.name, this.value)">No</button></li>
						<li><button type="button" name="t2q5" value="incorrect" onClick="answerCheck(this.name, this.value)">Only fruits are</button></li>
						<li><button type="button" name="t2q5" value="incorrect" onClick="answerCheck(this.name, this.value)">Only vegetables are</button></li>
					</ul></li><br>
					<li>When you put an egg in water and it’s unsafe to eat, what happens to the egg?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q6" value="incorrect" onClick="answerCheck(this.name, this.value)">It sinks</button></li>
						<li><button type="button" name="t2q6" value="correct" onClick="answerCheck(this.name, this.value)">It floats</button></li>
						<li><button type="button" name="t2q6" value="incorrect" onClick="answerCheck(this.name, this.value)">It stays in the middle</button></li>
					</ul></li><br>
					<li>Is a food still safe if it smells weird?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q7" value="incorrect" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q7" value="correct" onClick="answerCheck(this.name, this.value)">No</button></li>
						<li><button type="button" name="t2q7" value="incorrect" onClick="answerCheck(this.name, this.value)">Only if it looks fine</button></li>
					</ul></li><br>
					<li>If green vegetables have turned yellow are they safe to eat?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q8" value="incorrect" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q8" value="correct" onClick="answerCheck(this.name, this.value)">No</button></li>
					</ul></li><br>
					<li>Are bruised fruits and vegetables safe to eat?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q9" value="incorrect" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q9" value="incorrect" onClick="answerCheck(this.name, this.value)">No</button></li>
						<li><button type="button" name="t2q9" value="correct" onClick="answerCheck(this.name, this.value)">As long as you remove the bruised portion</button></li>
						<li><button type="button" name="t2q9" value="incorrect" onClick="answerCheck(this.name, this.value)">Only in small amounts</button></li>
					</ul></li><br>
					<li>Is lettuce with brown discoloration safe to eat?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t2q10" value="correct" onClick="answerCheck(this.name, this.value)">Yes</button></li>
						<li><button type="button" name="t2q10" value="incorrect" onClick="answerCheck(this.name, this.value)">No</button></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- Food 911 box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Food 911</h1>
				<ol>
					<li>What’s a good way to make stale chips taste good again?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t3q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Refrigerating them</button></li>
						<li><button type="button" name="t3q1" value="correct" onClick="answerCheck(this.name, this.value)">Toasting them</button></li>
						<li><button type="button" name="t3q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Soaking them in water</button></li>
						<li><button type="button" name="t3q1" value="incorrect" onClick="answerCheck(this.name, this.value)">Breaking them into smaller pieces</button></li>
					</ul></li><br>
					<li>How can you heal wilted or wrinkled vegetables?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t3q2" value="incorrect" onClick="answerCheck(this.name, this.value)">Chopping it up</button></li>
						<li><button type="button" name="t3q2" value="incorrect" onClick="answerCheck(this.name, this.value)">Freezing it</button></li>
						<li><button type="button" name="t3q2" value="correct" onClick="answerCheck(this.name, this.value)">Putting it in ice water</button></li>
						<li><button type="button" name="t3q2" value="correct" onClick="answerCheck(this.name, this.value)">Cooking it</button></li>
					</ul></li><br>
					<li>What should you do with apples you don’t want to eat?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t3q3" value="incorrect" onClick="answerCheck(this.name, this.value)">Give them away</button></li>
						<li><button type="button" name="t3q3" value="incorrect" onClick="answerCheck(this.name, this.value)">Throw them away</button></li>
						<li><button type="button" name="t3q3" value="correct" onClick="answerCheck(this.name, this.value)">Make apple sauce</button></li>
					</ul></li><br>
					<li>Which of these is the best use for stale bread?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t3q4" value="correct" onClick="answerCheck(this.name, this.value)">Making breadcrumbs</button></li>
						<li><button type="button" name="t3q4" value="incorrect" onClick="answerCheck(this.name, this.value)">Feeding ducks</button></li>
						<li><button type="button" name="t3q4" value="incorrect" onClick="answerCheck(this.name, this.value)">Making compost</button></li>
					</ul></li><br>
					<li>What should you do with browning bananas?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t3q5" value="incorrect" onClick="answerCheck(this.name, this.value)">Compost them</button></li>
						<li><button type="button" name="t3q5" value="incorrect" onClick="answerCheck(this.name, this.value)">Throw them away</button></li>
						<li><button type="button" name="t3q5" value="correct" onClick="answerCheck(this.name, this.value)">Make a banana smoothie</button></li>
					</ul></li><br>
				</ol>
			</div>
			<div class='expandedcontentbox'>	<!-- Facts box -->
				<img class="xbutton" src="img/tempX.png">
				<h1>Facts</h1>
				<ol>
					<li>How many apples are thrown out every day in Metro Vancouver?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t4q1" value="incorrect" onClick="answerCheck(this.name, this.value)">1,000</button></li>
						<li><button type="button" name="t4q1" value="incorrect" onClick="answerCheck(this.name, this.value)">13,000</button></li>
						<li><button type="button" name="t4q1" value="incorrect" onClick="answerCheck(this.name, this.value)">29,000</button></li>
						<li><button type="button" name="t4q1" value="correct" onClick="answerCheck(this.name, this.value)">55,000</button></li>
					</ul></li><br>
					<li>How many loaves of bread are wasted every day in Metro Vancouver?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t4q2" value="incorrect" onClick="answerCheck(this.name, this.value)">800</button></li>
						<li><button type="button" name="t4q2" value="incorrect" onClick="answerCheck(this.name, this.value)">15,000</button></li>
						<li><button type="button" name="t4q2" value="correct" onClick="answerCheck(this.name, this.value)">32,000</button></li>
						<li><button type="button" name="t4q2" value="incorrect" onClick="answerCheck(this.name, this.value)">41,000</button></li>
					</ul></li><br>
					<li>How much of the food produced around the world is wasted?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t4q3" value="incorrect" onClick="answerCheck(this.name, this.value)">One fifth</button></li>
						<li><button type="button" name="t4q3" value="incorrect" onClick="answerCheck(this.name, this.value)">One quarter</button></li>
						<li><button type="button" name="t4q3" value="correct" onClick="answerCheck(this.name, this.value)">One third</button></li>
						<li><button type="button" name="t4q3" value="incorrect" onClick="answerCheck(this.name, this.value)">One half</button></li>
					</ul></li><br>
					<li>How much money could we save if there was zero food waste around the world?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
						<li><button type="button" name="t4q4" value="incorrect" onClick="answerCheck(this.name, this.value)">$1,000</button></li>
						<li><button type="button" name="t4q4" value="incorrect" onClick="answerCheck(this.name, this.value)">$1,000,000</button></li>
						<li><button type="button" name="t4q4" value="incorrect" onClick="answerCheck(this.name, this.value)">$1,000,000,000</button></li>
						<li><button type="button" name="t4q4" value="correct" onClick="answerCheck(this.name, this.value)">$1,000,000,000,000</button></li>
					</ul></li><br>
			</div>
<!-- AFFILIATED APPS BOX -->
			<div class='expandedcontentbox bigexpandedcontentbox'>	<!-- Affiliated Apps -->
				<img class="xbutton" id="bigone" src="img/tempX.png">
				<h1>AFFILIATED APPS</h1>
				<p>
				Here are some other apps that we have connection with!
				</p>
				<br>
	            <hr>
				<h2>Food Factory Zero</h2>
				<br>
				<img src='img/foodfactorylogo.png' height='150' width='150' alt='food factory logo'>
	            <br><br>
	            <p>Food Factory Zero is a time-based drag and drop game. All you need to do is pick and match the ingredients with recipes.</p>
				<br>
	            <p>Link: <a href='https://foodfactoryzero.firebaseapp.com/'>Check it out here!</a></p>
	            <br>
	            <hr>
				<h2>Captin Plan-It</h2>
				<br>
				<img src='img/cp3v2.png' height='150' width='150' alt='captin plan-it logo'>
				<br><br>
	            <p>Captain Plan-It is an educational quiz game where you can answer questions related to food groups. Answer correctly to earn keys which can unlock accessories for your own personal hero!</p>
				<br>
				<p>Link: <a href='http://students.bcitdev.com/A01009216/Captain-Plan-It/index.php'>Check it out here!</a></p>
				<br>
	            <hr>
	            <h2>Food Fall</h2>
	            <br>
				<img src='img/foodfallartwork.jpg' height='150' width='150' alt='food fall logo'>
				<br><br>
	            <p>Food Fall is a game that teaches you the effects of food waste - and to have fun too!</p>
	            <br>
				<p>Link: <a href='http://FoodFall.com'>Check it out here!</a></p>
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
					<img src='img/affiliatedlogo.png'>
				</div>
			</div>
		</div><!--end of contentwrapper-->
	</div><!--end of contentactual-->
</div><!--end of #content-->

<?php include("templateFooter.php");?>