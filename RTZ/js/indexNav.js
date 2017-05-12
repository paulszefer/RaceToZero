//only execute when page is done loading
$(function() {
    //when #navburger is clicked, expand out mobilenav and overlay
    $("#navburger").click(function() {
        $("#mobilenav").css("width", "40vw");
        $("#overlay").css("width", "70vw");
        $("#overlay").css("height", $('body').height());
    });
    //Closes mobilenav when navoverlay is clicked- resets all css
    $('#overlay').click(function(){
        $("#mobilenav").attr('style', '');
        $("#overlay").attr('style', '');
    });
});