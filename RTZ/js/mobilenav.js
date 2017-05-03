$("#navburger").click(function() {
    if ($("#mobilenav").css("display") == "none") {
        $("#mobilenav").css("display", "block");
        $("#mobilenav").css("position", "absolute");
        $("#mobilenav").css("left", $("window").width());
        var xPos = $("#mobilenav").css("left");
        while (xPos > 0) {
            xPos--;
            $("#mobilenav").css("left", xPos);
        }
    } else {
        $("#mobilenav").css("display", "none");
    }
});