$(function() {
    $("#navburger").click(function() {
        $("#mobilenav").css("width", "40vw");
        $("#overlay").css("width", "60vw");
        $("#overlay").css("height", $('body').height());
        $("#overlay").css("height", $('body').height());
    });

    //Closes mobilenav when navoverlay is clicked
    $('.expandedcontentbox').click(function(){
        $(".expandedcontentbox").attr('style', '');
    });
});