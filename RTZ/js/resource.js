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
    expanded.style.width = "99%";
    expanded.style.overflow = "default";
});

// adds a click handler for each maximized topic
//
// hides all topics, then shows all minimized topics
$(".xbutton").click(function() {
    $(".expandedcontentbox").attr('style', '');
    //resets the inline attr caused by .css()
    $(".contentboxwrapper").attr('style', '');
    // $(".contentbox").attr('style', ''); //apparently we dont need this kappa
});

function hideTopics() {
    $(".contentboxwrapper").css("display", "none"); // can animate this instead later
    // $(".contentbox").css("display", "none"); //apparently we dont need this kappa
    //reset all in line style first
    $(".expandedcontentbox").attr("style", '');
    //hide all other expandedcontentbox
    $(".expandedcontentbox").css("overflow", 'hidden');
}

});

function answerCheck(buttonName, value) {
    if (value == "incorrect") {
    var results = document.getElementsByClassName("incorrecttext");
    var resets = document.getElementsByClassName("correcttext");
    } else {
    var results = document.getElementsByClassName("correcttext");
    var resets = document.getElementsByClassName("incorrecttext");
    }

    var topic = parseInt(buttonName.substr(1, 1), 10);
    var question = parseInt(buttonName.substr(3, 2), 10);

    if (topic == 1) {
        resets[question - 1].style.display="none";
        results[question - 1].style.display="inline-block";
    } else if (topic == 2) {
        resets[question - 1 + 4].style.display="none";
        results[question - 1 + 4].style.display="inline-block";
    } else if (topic == 3) {
        resets[question - 1 + 14].style.display="none";
        results[question - 1 + 14].style.display="inline-block";
    } else if (topic == 4) {
        resets[question - 1 + 19].style.display="none";
        results[question - 1 + 19].style.display="inline-block";
    }
}