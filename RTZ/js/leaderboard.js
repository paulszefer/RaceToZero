$(document).ready(function() {

	let numberOfLevels;

	$.post("accessdb.php", { function: "getNumberOfLevels" }, function(data) {
		numberOfLevels = data.number;
	}, "json");
	
	let select = document.createElement("select");
	select.setAttribute("id", "levelselect");
	
	for (let i = 0; i < numberOfLevels; i++) {
		let option = document.createElement("option");
		option.setAttribute("value", "level" + i);
		let text = document.createTextNode("Level " + i);
		option.appendChild(text);
		select.appendChild(option);
	}
	
	$(".contentactual").appendChild(select);
	
	let levelSelected;
	
	$("#levelselect").change(function() {
		$("#levelselect option:selected").each(function(){
			let value = $(this).attr("value");
			let substr = value.substring(5);
			levelSelected = parseInt(substr);
		});
		
		console.log(levelSelected);
	});
	
});