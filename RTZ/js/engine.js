$(document).ready(function() {
    level = new Level(0, 500, 500);
    foodItem = new FoodItem("Box", "box", "img/orange.png", true);
    playItem = new PlayItem(400, 300, -2, 10, foodItem);
    
    barrier1 = new Barrier("barrier1", 100, 200, 399, 299);
    barrier2 = new Barrier("barrier2", 0, 400, 199, 499);
    barrier3 = new Barrier("barrier3", 300, 400, 499, 499);
    barrier4 = new Barrier("goal", 199, 460, 300, 499);
    
    drawBarrier(barrier1);
    drawBarrier(barrier2);
    drawBarrier(barrier3);
    drawBarrier(barrier4);
    
    function drawBarrier(barrier) {
        width = barrier.getX2() - barrier.getX1();
        height = barrier.getY2() - barrier.getY1();

        document.write(
            "<svg id=\"" + barrier.getName() + "\" width=\"" + width + "\" height=\"" + height + "\">"
                + "<rect width=\"" + width + "\" height=\"" + height + "\" style=\"fill:rgb(50, 255, 100);\">"
            + "</svg>"
        );
        $("#" + barrier.getName()).css("position", "absolute");
        $("#" + barrier.getName()).css("left", barrier.getX1());
        $("#" + barrier.getName()).css("top", barrier.getY1());
        // document.getElementById(barrier.getName()).style.position = "absolute";
        // document.getElementById(barrier.getName()).style.left = barrier.getX1();
        // document.getElementById(barrier.getName()).style.top = barrier.getY1();
    }
        
    // barrierX1 = 100;
    // barrierX2 = 399;
    // barrierY1 = 200;
    // barrierY2 = 299;
    // document.write(
        // "<svg id=\"barrier1\" width=\"" + (barrierX2 - barrierX1) + "\" height=\"" + (barrierY2 - barrierY1) + "\"><rect width=\"" + (barrierX2 - barrierX1) + "\" height=\"" + (barrierY2 - barrierY1) + "\"></svg>"
    // );
    // document.getElementById("barrier1").style.left = barrierX1;
    // document.getElementById("barrier1").style.top = barrierY1;
    level.addObject(100, 200, 399, 299, SOLID);
    level.addObject(0, 400, 199, 499, SOLID);
    level.addObject(300, 400, 499, 499, SOLID);
    level.addObject(200, 460, 300, 499, SOLID);
    
    level.setPlayItem(playItem);
    
    url = level.getPlayItem().getFoodItem().getImageURL();
    document.write("<img id=\"foodimage\" src=" + url + ">");
    $("#foodimage").css("position", "absolute");
    
    function draw() {
        // document.getElementById("foodimage").style.left = level.getPlayItem().getX() + "px";
        // document.getElementById("foodimage").style.top = level.getPlayItem().getY() + "px";
        
       $("#foodimage").css("left", level.getPlayItem().getX());
       $("#foodimage").css("top", level.getPlayItem().getY());
    }
    
    draw();
    
    function move() {
        level.move();
        draw();
    }
    
    var intervalId = setInterval(move, 500);
    
    $("body").click(function(e) {
		var divPosX = $(this).position().left;
		var divPosY = $(this).position().top;
		var mousePosX = e.pageX - divPosX;
		var mousePosY = e.pageY - divPosY;
		
		playItem.clicked(mousePosX, mousePosY);
	});
});

