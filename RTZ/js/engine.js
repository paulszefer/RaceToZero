//$(document).ready(function() {
    level = new Level(0, 500, 500);
    foodItem = new FoodItem("Box", "box", "img/orange.png", true);
    playItem = new PlayItem(300, 10, 0, 10, foodItem);
    
    barrierX1 = 100;
    barrierX2 = 399;
    barrierY1 = 200;
    barrierY2 = 299;
    document.write(
        "<svg id=\"barrier1\" width=\"" + (barrierX2 - barrierX1) + "\" height=\"" + (barrierY2 - barrierY1) + "\"><rect width=\"" + (barrierX2 - barrierX1) + "\" height=\"" + (barrierY2 - barrierY1) + "\"></svg>"
    );
    document.getElementById("barrier1").style.left = barrierX1;
    document.getElementById("barrier1").style.top = barrierY1;
    level.addObject(100, 200, 399, 299, SOLID);
    level.addObject(0, 400, 199, 499, SOLID);
    level.addObject(300, 400, 499, 499, SOLID);
    
    level.setPlayItem(playItem);
    
    url = level.getPlayItem().getFoodItem().getImageURL();
    document.write("<img id=\"foodimage\" src=" + url + ">");
    
    function draw() {
        document.getElementById("foodimage").style.left = level.getPlayItem().getX() + "px";
        document.getElementById("foodimage").style.top = level.getPlayItem().getY() + "px";
        
       // $("#foodimage").css("left", level.getPlayItem.getX());
       // $("#foodimage").css("top", level.getPlayItem.getY());
    }
    
    draw();
    
    function move() {
        level.move();
        draw();
    }
    
    var intervalId = setInterval(move, 50);
//});