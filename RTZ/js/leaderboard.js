$(document).ready(function() {

	let numberOfLevels;

	$.post("accessdb.php", { function: "getNumberOfLevels" }, function(data) {
		numberOfLevels = parseInt(data.number);
		
		let select = document.createElement("select");
		select.setAttribute("id", "levelselect");
	
		for (let i = 0; i < numberOfLevels; i++) {
			let option = document.createElement("option");
			option.setAttribute("value", "level" + i);
			let text = document.createTextNode("Level " + i);
			option.appendChild(text);
			select.appendChild(option);
		}
	
		$(".contentactual").append(select);
	
		let levelSelected;
	
		function displayTable($level) {
			$.post("accessdb.php", { function: "getShortestTimes", level: $level }, function(data) {
				console.log($level);
				for (let i = 0; i < data.length; i++) {
					let row = document.createElement("tr");
					let cell1 = document.createElement("td");
					let placement = document.createTextNode(i + 1);
					cell1.appendChild(placement);
					let cell2 = document.createElement("td");
					let userid = document.createTextNode(data[i]['user_id']);
					cell2.appendChild(userid);
					let cell3 = document.createElement("td");
					let time = document.createTextNode(data[i]['game_time']);
					cell3.appendChild(time);
					
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					
					$("#besttimes").append(row);
				}
			}, "json");
		}
	
		displayTable(0);
	
		$("#levelselect").change(function() {
			$("#levelselect option:selected").each(function(){
				let value = $(this).attr("value");
				let substr = value.substring(5);
				levelSelected = parseInt(substr);
				
				$("table td").remove();
				displayTable(levelSelected);
			});
		});
	}, "json");
	
});

