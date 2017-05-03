$("#navburger").click(function() {
    if ($("#mobilenav").css("display") == "none") {
        $("#mobilenav").css("display", "block");
        $("#mobilenav").css("position", "fixed");
        $("#mobilenav").css("right", $("window").width());
        var xPos = $("#mobilenav").css("right");
        while (xPos > 0) {
            xPos--;
            $("#mobilenav").css("left", xPos);
        }
    } else {
        $("#mobilenav").css("display", "none");
    }
});