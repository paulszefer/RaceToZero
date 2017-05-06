// adds a click handler for each minimized topic
//
// determines which minimized topic was clicked,
// hides all topics, and then shows the correct
// maximized topic
$(".topicmin").click(function() {
    var count = 0;
    if ($(".topicmin") == this) {
        count++;
        var id = count;
    } else {
        count++;
    }
    hideTopics();
    showTopic(id);
}

// hides all topics
function hideTopics() {
    $(".topic").css("display", "none"); // can animate this instead later
}

function showTopic(id) {
    $(".maxTopic")[id].css("display", "block"); // can animate later
}