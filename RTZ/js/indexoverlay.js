$(function() {
    $("#navburger").click(function() {
        $("#mobilenav").css("width", "40vw");
        $("#overlay").css("width", "60vw");
        $("#overlay").css("height", $('body').height());
    });

    //Closes mobilenav when navoverlay is clicked
    $('#gamediv').click(function(){
        $("#mobilenav").attr('style', '');
        $("#overlay").attr('style', '');
    });
});