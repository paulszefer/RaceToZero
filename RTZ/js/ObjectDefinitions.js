/*
 * Defines a level with an ID and dimensions.
 * Also allows a PlayItem to be stored.
 */
class Level {
	/*
	 * Initializes the level ID, width and height. Creates a board based on the level's
	 * width and height, and assigns the board to this.
	 */
    constructor(id, width, height) {      
        this.setID(id);
        this.setWidth(width);
        this.setHeight(height);
        
        // initialize with an empty board (each pixel is air)
        var emptyBoard = new Array(width);
        for (var i = 0; i < emptyBoard.length; i++) {
            emptyBoard[i] = new Array(height);
            for (var j = 0; j < emptyBoard[i].length; j++) {
                emptyBoard[i][j] = new Pixel(AIR);
            }
        }
        this.setBoard(emptyBoard);
    }
    
    /*
     * Sets the level ID if the new level ID is 0 or greater.
     */
    setID(id) {
        if (id >= 0) {
            this._id = id;
        }   
    }
    
    /*
     * Returns the level ID.
     */
    getID() {
        return this._id;
    }
    
    /*
     * Sets the level width if the new level width is 100 or greater.
     */
    setWidth(width) {
    	if (width >= 100) {
        	this._width = width;
        }
    }
    
    /*
     * Returns the level width.
     */
    getWidth() {
        return this._width;
    }
    
    /*
     * Sets the level height if the new level height is 100 or greater.
     */
    setHeight(height) {
    	if (height >= 100) {
        	this._height = height;
        }
    }
    
    /*
     * Returns the level height.
     */
    getHeight() {
        return this._height;
    }
    
    /*
     * Sets the play item of the level.
     */
    setPlayItem(playItem) {
        this._playItem = playItem;
    }
    
    /*
     * Returns the play item of the level.
     */
    getPlayItem() {
        return this._playItem;
    }
    
    /*
     * Sets the board of the level. The board is a 2D array of size width x height.
     */
    setBoard(board) {
        this._board = board;
    }
    
    /*
     * Returns the board of the level.
     */
    getBoard() {
        return this._board;
    }
    
    /*
     * Changes the PlayItem if the new x and y position are within bounds.
     */
    changePlayItem(x, y, dx, dy, foodItem) {
        if (x > 0 && x < _width
            && y > 0 && y < _height) {
                this._playItem = new PlayItem(x, y, dx, dy, foodItem);
        }
    }
    
    /*
     * Adds an object by setting all pixels within a certain range to a certain pixel 
     * type.
     */
    addObject(x1, y1, x2, y2, pixelType) {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                this._board[i][j].setType(pixelType);
            }
        }
    }
    
    /*
     * Moves the play item. Before the play item moves, checks to see if it will collide
     * with anything and adjusts accordingly.
     */
    move() {
            var tempX = this._playItem.getX() + this._playItem.getDX();
            var tempY = this._playItem.getY() + this._playItem.getDY();
            
            // check if next movement causes a collision
            var collision = this.checkCollisions(tempX, tempY);
            if (collision == 0) {
                // no collision, move normally
                this._playItem.move();
                this._playItem.setIsGrounded(false);
            } else if (collision == 1) {
                this.snapToTop(tempX);
                this._playItem.reverseDY();
                this._playItem.setIsGrounded(false);
            } else if (collision == 2) {
                this.snapToRight(tempY);
                this._playItem.reverseDX();
                this._playItem.setIsGrounded(false);
            } else if (collision == 3) {
                this.snapToBottom(tempX);
                if (this._playItem.getDY() < 2) { // SNAPTOGROUND = 2
                    this._playItem.snapToGround();
                } else {
                    this._playItem.reverseDY();
                    this._playItem.setIsGrounded(false);
                }
            } else if (collision == 4) {
                this.snapToLeft(tempY);
                this._playItem.reverseDX();
                this._playItem.setIsGrounded(false);
            }
        this._playItem.applyGravity();
        this._playItem.adjustSpeed();
        this._playItem.round();
    }
    
    snapToTop(tempX) {
    	var move = 0;
        while (this.checkCollisions(tempX, this._playItem.getY() - move) != 1) {
            move++;
        }
        var ratio = this._playItem.getDX() / this._playItem.getDY();
        this._playItem.setX(this._playItem.getX() - (move * ratio));
        this._playItem.setY(this._playItem.getY() - move);
    }
    
    snapToRight(tempY) {
    	var move = 0;
        while (this.checkCollisions(this._playItem.getX() + move, tempY) != 2) {
            move++;
        }
        var ratio = this._playItem.getDY() / this._playItem.getDX();
        this._playItem.setX(this._playItem.getX() + move);
        this._playItem.setY(this._playItem.getY() + (move * ratio));
    }
    
    snapToBottom(tempX) {
    	var move = 0;
        while (this.checkCollisions(tempX, this._playItem.getY() + move) != 3) {
            move++;
        }
        var ratio = this._playItem.getDX() / this._playItem.getDY();
        this._playItem.setX(this._playItem.getX() + (move * ratio));
        this._playItem.setY(this._playItem.getY() + move);
    }
    
    snapToLeft(tempY) {
    	var move = 0;
        while (this.checkCollisions(this._playItem.getX() - move, tempY) != 4) {
            move++;
        }
        var ratio = this._playItem.getDY() / this._playItem.getDX();
        this._playItem.setX(this._playItem.getX() - move);
        this._playItem.setY(this._playItem.getY() - (move * ratio));
    }
    
    /*
     * Checks to see if the object is colliding with anything.
     * Returns 0 if no collision, 1 if top collision, 2 if right-side collision, 3 if 
     * bottom collision, 4 if left-side collision.
     */
    checkCollisions(x, y) {
        var size = this._playItem.getSize();
        var x1 = x;
        var y1 = y;
        var x2 = x + size;
        var y2 = y + size;
        
        if (x1 >= 0 && x2 < this._width && y1 >= 0 && y2 < this._height) {
            if (this._board[x1][y1].getType() == SOLID) {
                return this.topLeftCollision(x1, y1);
            } else if (this._board[x2][y2].getType() == SOLID) {
                return this.bottomRightCollision(x1, y1);
            } else if (this._board[x1][y2].getType() == SOLID) {
               	return this.bottomLeftCollision(x1, y1);
            } else if (this._board[x2][y1].getType() == SOLID) {
               	return this.topRightCollision(x1, y1);
            }
        }
        return 0;
    }
    
    /*
     * Handles the case where the top-left corner of the object collides with a barrier.
     */
    topLeftCollision(x1, y1) {
    	var size = this._playItem.getSize();
    	var x2 = x1 + size;
    	var y2 = y1 + size;
    	var origX1 = x1 - this._playItem.getDX();
        var origY1 = y1 - this._playItem.getDY();
    	
    	if (this._board[x2][y1].getType() == SOLID) {
            return 1;
        } else if (this._board[x1][y2].getType() == SOLID) {
            return 4;
        } else {
            var move = 0;
            while (move < this._playItem.getSize()) {
                if (this._board[origX1 - move][origY1].getType() == SOLID) {
                	return 4;
                } else if (this._board[origX1][origY1 - move].getType() == SOLID) {
                	return 1;
                } else {
                	move++;
                }
            }
            return 0;
        }
    }
    
    /*
     * Handles the case where the bottom-right corner of the object collides with a 
     * barrier.
     */
    bottomRightCollision(x1, y1) {
    	var size = this._playItem.getSize();
    	var x2 = x1 + size;
    	var y2 = y1 + size;
    	var origX2 = x2 - this._playItem.getDX();
        var origY2 = y2 - this._playItem.getDY();
    
    	if (this._board[x2][y1].getType() == SOLID) {
            return 2;
        } else if (this._board[x1][y2].getType() == SOLID) {
            return 3;
        } else {
    		if (this._playItem.getIsGrounded()) {
    			return 3;
    		}
            var move = 0;
            while (move < this._playItem.getSize()) {
                if (this._board[origX2 + move][origY2].getType() == SOLID) {
                	return 2;
                } else if (this._board[origX2][origY2 + move].getType() == SOLID) {
                	return 3;
                } else {
                	move++;
                }
            }
            return 0;
        }
    }
    
    /*
     * Handles the case where the bottom-left corner of the object collides with a 
     * barrier.
     */
    bottomLeftCollision(x1, y1) {
    	var origX1 = x1 - this._playItem.getDX();
    	var origY2 = y1 + this._playItem.getSize() - this._playItem.getDY();
    
    	var move = 0;
        while (move < this._playItem.getSize()) {
            if (this._playItem.getIsGrounded()) {
    			return 3;
    		}
            if (this._board[origX1 - move][origY2].getType() == SOLID) {
            	return 4;
            } else if (this._board[origX1][origY2 + move].getType() == SOLID) {
               	return 3;
            } else {
               	move++;
            }
        }
        return 0;
    }
    
    /*
     * Handles the case where the top-right corner of the object collides with a barrier.
     */
    topRightCollision(x1, y1) {
    	var origX2 = x1 + this._playItem.getSize() - this._playItem.getDX();
    	var origY1 = y1 - this._playItem.getDY();
    
    	var move = 0;
        while (move < this._playItem.getSize()) {
            if (this._board[origX2 + move][origY1].getType() == SOLID) {
            	return 2;
            } else if (this._board[origX2][origY1 - move].getType() == SOLID) {
            	return 1;
            } else {
               	move++;
            }
        }
        return 0;
    }
}

/*
 * Defines a rectangular barrier (a wall, platform or goal).
 */
class Barrier {

	/*
	 * Gives the barrier a name and initializes its coordinates.
	 */
    constructor(name, x1, y1, x2, y2) {
        this.setName(name);
        this.setX1(x1);
        this.setY1(y1);
        this.setX2(x2);
        this.setY2(y2);
    }
    
    /*
     * Sets the name of the barrier.
     */
    setName(name) {
        this._name = name;
    }
    
    /*
     * Returns the name of the barrier.
     */
    getName() {
        return this._name;
    }
    
    /*
     * Sets the x-coordinate of the upper-left vertex of the barrier.
     */
    setX1(x1) {
        this._x1 = x1;
    }
    
    /*
     * Returns the x-coordinate of the upper-left vertex of the barrier.
     */
    getX1() {
        return this._x1;
    }
    
    /*
     * Sets the y-coordinate of the upper-left vertex of the barrier.
     */
    setY1(y1) {
        this._y1 = y1;
    }
    
    /*
     * Returns the y-coordinate of the upper-left vertex of the barrier.
     */
    getY1() {
        return this._y1;
    }
    
    /*
     * Sets the x-coordinate of the lower-right vertex of the barrier.
     */
    setX2(x2) {
        this._x2 = x2;
    }
    
    /*
     * Returns the x-coordinate of the lower-right vertex of the barrier.
     */
    getX2() {
        return this._x2;
    }
    
    /*
     * Sets the y-coordinate of the lower-right vertex of the barrier.
     */
    setY2(y2) {
        this._y2 = y2;
    }
    
    /*
     * Returns the y-coordinate of the lower-right vertex of the barrier.
     */
    getY2() {
        return this._y2;
    }
}

/*
 * Defines the play item (i.e. the item that moves around the screen).
 */
class PlayItem {

	/*
	 * Sets the starting coordinates and velocity vector, as well as the type of food.
	 * Automatically sets the item to be a 50x50 square.
	 */
    constructor(x, y, dx, dy, foodItem) {
        this.setX(x);
        this.setY(y);
        this.setDX(dx);
        this.setDY(dy);
        this.setFoodItem(foodItem);
        this._size = 50;
    }
    
    /*
     * Sets the x-coordinate of the item.
     */
    setX(x) {
        this._x = x;
    }
    
    /*
     * Returns the x-coordinate of the item.
     */
    getX() {
        return this._x;
    }
    
    /*
     * Sets the y-coordinate of the item.
     */
    setY(y) {
        this._y = y;
    }
    
    /*
     * Returns the y-coordinate of the item.
     */
    getY() {
        return this._y;
    }
    
    /*
     * Sets the horizontal component of the velocity vector.
     */
    setDX(dx) {
        this._dx = dx;
    }
    
    /*
     * Reverses the horizontal component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDX() {
    	var adjustedDX = -1 * this._foodItem.bounceMultiplier * this._dx;
        this.setDX(adjustedDX);
    }
    
    /*
     * Returns the horizontal component of the velocity vector.
     */
    getDX() {
        return this._dx;
    }
    
    /*
     * Sets the vertical component of the velocity vector.
     */
    setDY(dy) {
        this._dy = dy;
    }
    
    /*
     * Reverses the vertical component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDY() {
    	var adjustedDY = -1 * this._foodItem.bounceMultiplier * this._dy;
        this.setDY(adjustedDY);
    }
    
    /*
     * Returns the vertical component of the velocity vector.
     */
    getDY() {
        return this._dy;
    }
    
    /*
     * Returns the size of the object (the side-length of the square).
     */
    getSize() {
        return this._size;
    }
    
    /*
     * Sets the grounded status of the object (whether friction and gravity apply to it).
     */
    setIsGrounded(isGrounded) {
        this._isGrounded = isGrounded;
    }
    
    /*
     * Returns the grounded status of the object (whether friction and gravity apply to 
     * it).
     */
    getIsGrounded() {
        return this._isGrounded;
    }
    
    /*
     * Sets the food item.
     */
    setFoodItem(foodItem) {
        this._foodItem = foodItem;
    }
    
    /*
     * Returns the food item.
     */
    getFoodItem() {
        return this._foodItem;
    }
    
    /*
     * Moves the object based on its velocity vector and starting coordinates. Does not 
     * take collisions into account.
     */
    move() {
        this._x += this._dx;
        this._y += this._dy;
    }
    
    /*
     * Alters the vertical component of the item's velocity vector to account for gravity.
     * Object cannot be grounded.
     */
    applyGravity() {
    	if (!this._isGrounded) {
        	this._dy += this._foodItem.gravity;
        }
    }
    
    /*
     * Responds to a mouse click. The mouse click alters the velocity of the object by
     * pushing it away from the location of the cursor.
     */
    clicked(mousePosX, mousePosY) {
    	var xDiff = this._x + (this._size / 2) - mousePosX;
    	var yDiff = this._y + (this._size / 2) - mousePosY;
    	
    	var divisor = 10;
    	
    	this._dx += Math.round(xDiff / divisor);
    	this._dy += Math.round(yDiff / divisor);
        
        // ensures a far away click does not allow the playItem to move
        // illegally
        this.adjustSpeed();
    }

	/*
	 * Ensures that the speed never exceeds 20 in any direction. This method is called 
	 * after every move.
	 */
    adjustSpeed() {
    	if (this._dy > 20) {
    		this._dy = 20;
    	} else if (this._dy < -20) {
    		this._dy = -20;
    	}
    	if (this._dx > 20) {
    		this._dx = 20;
    	} else if (this._dx < -20) {
    		this._dx = -20;
    	}
    }

	/*
	 * If the play item is touching the ground and its vertical speed is less than 2,
	 * it becomes grounded and friction applies.
	 */
    snapToGround() {
    	if (this._dy < 2) {
    		this._isGrounded = true;
    		this._dy = 0;
    		if (this._dx > 0) {
    			this._dx--;
    		} else if (this._dx < 0) {
    			this._dx++;
    		}
    	}
    }
    
    /*
     * Rounds x, y, dx, dy to the nearest integer.
     */
    round() {
    	this._x = Math.round(this._x);
    	this._y = Math.round(this._y);
    	this._dx = Math.round(this._dx);
    	this._dy = Math.round(this._dy);
    }
}

/*
 * Represents a type of food which can be represented by a play item.
 */
class FoodItem {
    
    /*
     * Sets the name and type of food, the URL of its image, and whether it is edible.
     */
    constructor(name, type, imageURL, isEdible) {
        this._name = name;
        this._type = type;
        this.bounceMultiplier = 0.8; // varies by type
        this.gravity = 1; // varies by type
        this._imageURL = imageURL;
        this._isEdible = isEdible;
    }
	
	/*
	 * Returns the URL of the image of the food item.
	 */
    getImageURL() {
        return this._imageURL;
    }
}

/*
 * Defines one individual pixel.
 */
class Pixel {

	/*
	 * Initializes the type of the pixel (air or solid).
	 */
    constructor(type) {
        this.setType(type);
    }
    
    /*
     * Sets the type of the pixel (air or solid).
     */
    setType(type) {
        this._type = type;
    }
    
    /*
     * Returns the type of the pixel (air or solid).
     */
    getType() {
        return this._type;
    }
}

/*
 * Types of pixels.
 */
var AIR = 0;
var SOLID = 1;
