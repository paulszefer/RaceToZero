$(function() {
    $("#navburger").click(function() {
        $("#mobilenav").css("width", "40vw");
        $("#overlay").css("width", "60vw");
        $("#overlay").css("height", $('body').height());
    });
    //Closes mobilenav when navoverlay is clicked
    $('#overlay').click(function(){
        $("#mobilenav").attr('style', '');
        $("#overlay").attr('style', '');
    });
    //After scrolling down
    var scrolled;

    $(window).scroll(function(event){
        scrolled = true;
    });
    //check to see if scolled is true after 500ms
    setInterval(function(){
        if (scrolled) {
            doIfScrolled();
            scrolled = false;
        }
    }, 500);

    var navContHeight = $('#navCont').outerHeight();
    //if they scrolled more than 10 pixels
    var scrolledPixels = 10;
    //saves current position, updated every doIfScrolled run
    var lastPosition = 0;
    function doIfScrolled(){
        //saves the current scrolled position
        var currentPos = $(this).scrollTop();
    }

});