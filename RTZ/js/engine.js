$(document).ready(function() {
    level = new Level(0, 500, 500);
    foodItem = new FoodItem("Box", "box", "img/orange.png", true);
    playItem = new PlayItem(242, 60, -10, -8, foodItem);
    
    platform = new Barrier("platform", 110, 200, 389, 299);
    floorleft = new Barrier("floorleft", 0, 400, 199, 499);
    floorright = new Barrier("floorright", 300, 400, 499, 499);
    goal = new Barrier("goal", 199, 460, 300, 499);
    rightwall = new Barrier("rightwall", 450, 0, 499, 499);
    leftwall = new Barrier("leftwall", 0, 0, 49, 499);
    ceiling = new Barrier("ceiling", 0, 0, 499, 29);
    
    drawBarrier(platform);
    drawBarrier(floorleft);
    drawBarrier(floorright);
    drawBarrier(goal);
    drawBarrier(rightwall);
    drawBarrier(leftwall);
    drawBarrier(ceiling);
    
    function drawBarrier(barrier) {
        width = barrier.getX2() - barrier.getX1();
        height = barrier.getY2() - barrier.getY1();

        document.write(
            "<svg id=\"" + barrier.getName() + 
            	"\" width=\"" + width + 
            	"\" height=\"" + height + "\">"
                + "<rect width=\"" + width + 
                	"\" height=\"" + height + 
                	"\" style=\"fill:rgb(50, 255, 100);\">"
            + "</svg>"
        );
        $("#" + barrier.getName()).css("position", "absolute");
        $("#" + barrier.getName()).css("left", barrier.getX1());
        $("#" + barrier.getName()).css("top", barrier.getY1());
    }
        
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

