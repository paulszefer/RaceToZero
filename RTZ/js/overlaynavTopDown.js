$(function() {
    //#navburger clicked, expand #mobilenav and #overylay
    $("#navburger").click(function() {
        $("#mobilenav").css("height", "80vh");
        $("#overlay").css("width", "100%");
        $("#overlay").css("height", $('body').height());
    });
    //resets mobilenav when navoverlay is clicked
    $('#overlay').click(function(){
        $("#mobilenav").attr('style', '');
        $("#overlay").attr('style', '');
    });
    //reset when xButton is pressed
    $('#xButton').click(function(){
        $("#mobilenav").attr('style', '');
        $("#overlay").attr('style', '');
    });

//     //After scrolling down, save var
//     var scrolled;
//     //sets scrolled to true if scroll happened
//     $(window).scroll(function(event){
//         scrolled = true;
//     });
//     //check to see if scolled is true after 500ms
//     //call function if scrolled happened
//     setInterval(function(){
//         if (scrolled) {
//             doIfScrolled();
//             scrolled = false;
//         }
//     }, 300);
//     //parses the height of navCont
//     var navContHeight = $('#navCont').outerHeight();
//     //if they scrolled more than 10 pixels
//     var scrolledPixels = 10;
//     //saves current position, updated every doIfScrolled run
//     var lastPosition = 0;
//     function doIfScrolled(){
//         //saves the current scrolled position
//         var currentPos = $(this).scrollTop();
//         //Check if below navContHeight
//         if (currentPos>navContHeight && ($(window).width() < 980)){
//             //if below navContHeight -> #navburger shall be fixed
//             if (currentPos > lastPosition){
//                 //they hath scrolled down
//                 $("#navburger").fadeOut();
//             }
//             else
//             {
//                 if(currentPos + $(window).height() < $(document).height()){
//                     $("#navburger").fadeIn();
//                 }
//             }
//         } 
//         else 
//         {
//             //When not below navContHeight
//             if(($(window).width() < 980)){
//                 $("#navburger").fadeIn();
//             }
//         }
//         lastPosition = currentPos;
//     }
    var harunyaCounter = 0;
    $("#mobilenav").click(function(){
        harunyaCounter++;
        if(harunyaCounter > 5){
            $("#mobilenav > ul > a:nth-child(2) > li > div:nth-child(1)").html('Haruna');
            $("#mobilenav > ul > a:nth-child(2) > li > div.mobilelistimg").html('<img src="img/profilepics/haruna.png">');
        }
    });

});