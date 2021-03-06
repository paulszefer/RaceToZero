$(document).ready(function() {

    let numberOfLevels = 5;

    let select = document.createElement("select"); // creates the select element
    select.setAttribute("id", "levelselect");

    for (let i = 0; i < numberOfLevels; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", "level" + i);
        let text;
        text = (i === 0) ? document.createTextNode("Tutorial") : document.createTextNode("Level " + i);
        option.appendChild(text);
        select.appendChild(option); // adds an option element to the select element
    }

    $(".contentactual p").prepend(select); // adds the select element

    let levelSelected;

    // Takes in a level as a parameter and displays the leaderboard for that level
    // as a table.
    function displayTable($level) {
        console.log($level);
        // Uses the getShortestTimes() function in accessdb.php to query the database
        // and get the shortest times for that level. Then displays those times in
        // a table.
        $.post("accessdb.php", { function: "getShortestTimes", level: $level }, function(data) {
            let users = [];
            let placementNumber = 1;
            for (let i = 0; i < data.length && placementNumber <= 10; i++) {
                let name = data[i]['user_name'];
                if (users.indexOf(name) === -1) {
                    let gameTime = data[i]['game_time'];
                    if (gameTime > 0) {
                        let row = document.createElement("tr"); // creates a row.
                        row.className = 'scoreRow';
                        let placementCell = document.createElement("td");
                        let placement = document.createTextNode(placementNumber);
                        placementCell.appendChild(placement);
                        let usernameCell = document.createElement("td");
                        let username = document.createTextNode(name);
                        usernameCell.appendChild(username);
                        let timeCell = document.createElement("td");
                        let time = document.createTextNode("" + (Math.round(gameTime / 100) / 10) + "s");
                        timeCell.appendChild(time);

                        // adds cells to the row: placement, username, and time.
                        row.appendChild(placementCell);
                        row.appendChild(usernameCell);
                        row.appendChild(timeCell);

                        $("#besttimes").append(row); // adds the row to the table.
                        users.push(name);
                        placementNumber++;
                    }
                }
            }
        }, "json");
    }
	
    // The table for level 0 displays by default.
    displayTable(0);

    // Whenever anyone selects a level from the select menu, the current table
    // disappears and a new one replaces it, using the displayTable() function
    // defined above.
    $("#levelselect").change(function() {
        $("#levelselect option:selected").each(function(){
            let value = $(this).attr("value");
            let substr = value.substring(5);
            levelSelected = parseInt(substr);

            $(".scoreRow").remove();
            displayTable(levelSelected);
        });
    });	
});