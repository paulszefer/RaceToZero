// adds a click handler for each minimized topic
//
// determines which minimized topic was clicked,
// hides all topics, and then shows the correct
// maximized topic
$(".topicmin").click(function() {
    var index = $(".topicmin").index(this);
    hideTopics();
    $(".topicmax").get(index).style.display = "block"; // can animate later;
});

// adds a click handler for each maximized topic
//
// hides all topics, then shows all minimized topics
$(".topicmax").click(function() {
    hideTopics();
    $(".topicmin").css("display", "block");
});

// hides all topics
function hideTopics() {
    $(".topic").css("display", "none"); // can animate this instead later
}