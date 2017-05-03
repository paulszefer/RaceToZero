$("#navburger").click(function() {
    if ($("#mobilenav").css("display") == "none") {
        $("#mobilenav").css("display", "block");
        $("#mobilenav").css("position", "absolute");
        $("#mobilenav").css("left", 400);//$("window").width());
        intervalID = window.setInterval(movenav, 200);
        while (
    } else {
        $("#mobilenav").css("display", "none");
    }
});

function movenav() {
    var xPos = $("#mobilenav").css("left");
    if (xPos > 0) {
        xPos--;
        $("#mobilenav").css("left", xPos);
    } else {
        window.clearInterval(intervalID);
    }
}