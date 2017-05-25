<?php
    session_start();

    if (!isset($_SESSION['user_session'])) {
        header('Location: login.php');
    }
?>

<?php include("templateHeader.php");?>
<link rel="stylesheet" href="css/about.css">
<?php include("templateNav.php");?>

<title>Race to Zero - About</title>
<div id='content'>
    <div class='contentactual'>
        <h1>About</h1>
        <br>
        <p class="aboutParagraph">Check out the official <a href="https://twitter.com/RaceToZero2017">Race to Zero Twitter account!</a></p>
        <p class="aboutParagraph">In-game music is thanks to BENSOUND.</p>
        <p class="aboutParagraph">Music by BENSOUND <a href="http://www.bensound.com/royalty-free-music">http://www.bensound.com/royalty-free-music</a></p>
        <p class="aboutParagraph">Creative Commons -- Attribution 3.0 Unported -- CC BY 3.0</p>
        <p class="aboutParagraph"><a href="http://creativecommons.org/licenses/by/3.0/">http://creativecommons.org/licenses/by/3.0/</a></p>
        <p class="aboutParagraph">Music provided by Audio Library <a href="https://goo.gl/YJz9BK">https://goo.gl/YJz9BK</a></p>
    </div>
</div>
<?php include("templateFooter.php");?>