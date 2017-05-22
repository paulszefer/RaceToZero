// adds a click handler for each minimized topic
// Courtesy of paulszefer
// determines which minimized topic was clicked,
// hides all topics, and then shows the correct
// maximized topic
$(function() {
//When a contentbox is clicked, expand the corresponding content
$(".contentbox").click(function() {
    var index = $(".contentbox").index(this);
    var expanded = $(".expandedcontentbox").get(index);
    hideTopics();
    // expanded.style.display = "block";
    expanded.style.minHeight = "100%";
    if ($(window).width() < 786) {
       expanded.style.width = "100%";
    }
    else {
       expanded.style.width = "80%";
    };
    //Set this timer to the same time as each transition time in the css
    //This calculates the height for contentactual to fit with height of expandedcontent
    setTimeout(function(){ 
        $(".contentactual").css("height", $(".expandedcontentbox").eq(index).height()+''); 
    }, 300);
});

// adds a click handler for each maximized topic
// hides all topics, then shows all minimized topics
$(".xbutton").click(function() {
    $(".expandedcontentbox").attr('style', '');
    //resets the inline attr caused by .css()
    $(".contentboxwrapper").attr('style', '');
    $(".contentactual").attr("style", '');
});

function hideTopics() {
    $(".contentboxwrapper").css("display", "block"); // can animate this instead later
    // $(".contentbox").css("display", "none"); //apparently we dont need this kappa
    //reset all in line style first
    $(".expandedcontentbox").attr("style", '');
    //hide all other expandedcontentbox
    $(".expandedcontentbox").css("overflow", 'hidden');
    //Resets body attribute
}

});

// checks source of button push and changes .correcttext and .incorrecttext spans based on if
// it was a correct answer
function answerCheck(buttonName, value) {

    // validates answer and stores the .correcttext and .incorrecttext arrays in variables
    if (value == "incorrect") {
        // if incorrect store .correcttext in resets (display none)
        // and .incorrecttext in results (display inline-block)
        var results = document.getElementsByClassName("incorrecttext");
        var resets = document.getElementsByClassName("correcttext");
    } else {
        // if correct store .incorrecttext in resets (display none)
        // and .correcttext in results (display inline-block)
        var results = document.getElementsByClassName("correcttext");
        var resets = document.getElementsByClassName("incorrecttext");
    }

    // parses topic number into var
    var topic = parseInt(buttonName.substr(1, 1), 10);
    // parses question number into var
    var question = parseInt(buttonName.substr(3, 2), 10);

    // checks topic number
    // displays either correct or incorrect (determined above) in specified question
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