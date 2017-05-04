<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" href="css/theme.css" media="screen">
			<link rel="stylesheet" href="css/print.css" media="print">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
			<script>
				$(document).ready(function(){
					$("nav").click(function(){
						//$(this).css("background-color", "#922B21");
						//$(".userControl").css("background-color", "#922B21");
						$(this).toggleClass("navColor");
						$("div.userControl").toggleClass("userControlColor");
					});
				});
			</script>
