$(function() {
    //After scrolling down, save var
    var scrolled;
    //sets scrolled to true if scroll happened
    $(window).scroll(function(event){
        scrolled = true;
    });
    //check to see if scolled is true after 500ms
    //call function if scrolled happened
    setInterval(function(){
        if (scrolled) {
            doIfScrolled();
            scrolled = false;
        }
    }, 300);
    //parses the height of navCont
    var navContHeight = $('#navCont').outerHeight();
    //if they scrolled more than 10 pixels
    var scrolledPixels = 10;
    //saves current position, updated every doIfScrolled run
    var lastPosition = 0;
    function doIfScrolled(){
        //saves the current scrolled position
        var currentPos = $(this).scrollTop();
        //Check if below navContHeight
        if (currentPos>navContHeight && ($(window).width() < 980)){
            //if below navContHeight -> #navburger shall be fixed
            if (currentPos > lastPosition){
                //they hath scrolled down
                // $("#navburger").fadeOut();
            }
            else
            {
                if(currentPos + $(window).height() < $(document).height()){
                    $("#navburger").fadeIn();
                }
            }
        } 
        else 
        {
            //When not below navContHeight
            if(($(window).width() < 980)){
                $("#navburger").fadeIn();
            }
        }
        lastPosition = currentPos;
    }
});