$("#navburger").click(function() {
    if ($("#mobilenav").css("display") == "none") {
        $("#mobilenav").css("display", "block");

        $("#mobilenav").css("position", "absolute");
        $("#mobilenav").css("left", "400px");//$("window").width());
        var intervalID = setInterval(movenavleft, 4);
        
        function movenavleft() {
            var xPos = $("#mobilenav").css("left").slice(0, -2);
            if (xPos > 0) {
                xPos -= 2;
                $("#mobilenav").css("left", xPos + "px");
            }
            
            if ($("#mobilenav").css("left").slice(0, -2) <= 0) {
                clearInterval(intervalID);
            }
        }
    } else {
        $("#mobilenav").css("display", "none");
    }
});