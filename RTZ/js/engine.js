$(document).ready(function() {
    level = new Level(0, 500, 500);
    foodItem = new FoodItem("Box", "box", "img/orange.png", true);
    playItem = new PlayItem(242, 40, 0, 1, foodItem);
    
    barrier1 = new Barrier("platform", 110, 200, 389, 299);
    barrier2 = new Barrier("floorleft", 0, 400, 199, 499);
    barrier3 = new Barrier("floorright", 300, 400, 499, 499);
    barrier4 = new Barrier("goal", 199, 460, 300, 499);
    barrier5 = new Barrier("rightwall", 450, 0, 499, 499);
    barrier6 = new Barrier("leftwall", 0, 0, 49, 499);
    barrier7 = new Barrier("ceiling", 0, 0, 499, 29);
    
    drawBarrier(barrier1);
    drawBarrier(barrier2);
    drawBarrier(barrier3);
    drawBarrier(barrier4);
    drawBarrier(barrier5);
    drawBarrier(barrier6);
    drawBarrier(barrier7);
    
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
    level.addObject(110, 200, 389, 299, SOLID);
    level.addObject(0, 400, 199, 499, SOLID);
    level.addObject(300, 400, 499, 499, SOLID);
    level.addObject(200, 460, 300, 499, SOLID);
    level.addObject(450, 0, 499, 499, SOLID);
    level.addObject(0, 0, 49, 499, SOLID);
    level.addObject(0, 0, 499, 29, SOLID);
    
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
    
    var intervalId = setInterval(move, 20);
    
    var clicked = false;
    
    function setClicked(newClicked) {
    	clicked = newClicked;
    }
    
    $("body").click(function(e) {
    	if (!clicked) {
			var divPosX = $(this).position().left;
			var divPosY = $(this).position().top;
			var mousePosX = e.pageX - divPosX;
			var mousePosY = e.pageY - divPosY;
		
			playItem.clicked(mousePosX, mousePosY);
			clicked = true;
			setTimeout(setClicked, 500, false);	
		}
	});
});

