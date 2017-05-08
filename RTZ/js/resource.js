// adds a click handler for each minimized topic
// Courtesy of paulszefer
// determines which minimized topic was clicked,
// hides all topics, and then shows the correct
// maximized topic
$(function() {
$(".contentbox").click(function() {
    var index = $(".contentbox").index(this);
    var expanded = $(".expandedcontentbox").get(index);
    hideTopics();
    expanded.style.display = "block";
    expanded.style.minHeight = "100vh";
    expanded.style.height = "100%";
    expanded.style.width = "100%";
});

// adds a click handler for each maximized topic
//
// hides all topics, then shows all minimized topics
$(".expandedcontentbox").click(function() {
    $(this).attr('style', '');
    //resets the inline attr caused by .css()
    $(".contentboxwrapper").attr('style', '');
    $(".contentbox").attr('style', '');
});

function hideTopics() {
    $(".contentboxwrapper").css("display", "none"); // can animate this instead later
    $(".contentbox").css("display", "none");
    $(".expandedcontentbox").attr("style", '');
}

});