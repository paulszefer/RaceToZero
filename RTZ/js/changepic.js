$(document).ready(function() {

    $("#pictures").css("max-width", "100%");
    let tableWidth = $("#pictures").width();
    $("td").css("width", tableWidth / 5);
    $("td").css("height", tableWidth / 5);

});