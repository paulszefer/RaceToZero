<?php include("templateHeader.php");?>

<!--insert page specific js css here-->
<title>Resources</title>
<link rel="stylesheet" href="css/resource.css">
<script src="js/resource.js"></script>
<?php include("templateNav.php");?>

<div id='content'>
	<div class='contentactual'>
		<div class='contentwrapper'> <!--whole wrapper for the boxes-->
			<!--throw your tips n stuffs in expandedcontetnbox below-->
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>Impact</h1>
				<ol>
					<li>Which of these is the biggest contributor to food waste?<span class="correcttext">&nbsp;Correct</span><span class="incorrecttext">&nbsp;Incorrect</span><br>
					<ul>
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
			<div class='expandedcontentbox'>	<!-- How to tell if food has gone bad -->
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
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
						<li><button type="button" name="t2q7" value="incorrect" onClick="answerCheck(this.name, this.value)">Only if it looks weird too</button></li>
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
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC3</h1>
			</div>
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC4</h1>
			</div>
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC5</h1>
			</div>
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC6</h1>
			</div>
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC7</h1>
			</div>
			<div class='expandedcontentbox'>
				<img class="xbutton" src="img/tempX.png" height="120" width="120">
				<h1>TOPIC8</h1>
			</div>
			<!--start of the topic box-->
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC1</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>Has your food gone bad?</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC3</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC4</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC5</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC6</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC7</h1>
				</div>
			</div>
			<div class='contentboxwrapper'>
				<div class='contentbox'>
					<h1>TOPIC8</h1>
				</div>
			</div>
		</div>
	</div>
</div>

<?php include("templateFooter.php");?>