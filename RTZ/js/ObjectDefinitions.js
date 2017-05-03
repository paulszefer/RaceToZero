/*
 * Defines a level with an ID and dimensions.
 * Also allows a PlayItem to be stored.
 */
class Level {
    constructor(id, width, height) {      
        this.setID(id);
        this.setWidth(width);
        this.setHeight(height);
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
    
    getID() {
        return this._id;
    }
    
    setWidth(width) {
        this._width = width;
    }
    
    getWidth() {
        return this._width;
    }
    
    setHeight(height) {
        this._height = height;
    }
    
    getHeight() {
        return this._height;
    }
    
    setPlayItem(playItem) {
        this._playItem = playItem;
    }
    
    getPlayItem() {
        return this._playItem;
    }
    
    setBoard(board) {
        this._board = board;
    }
    
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
    
    addObject(x1, y1, x2, y2, pixelType) {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                this._board[i][j].setType(pixelType);
            }
        }
    }
    
    move() {
        if (this.checkCollisions(this._playItem.getX(), this._playItem.getY()) != 0 && !this._playItem.getIsGrounded()) {
            this._playItem.move();
        } else {
            var tempX = this._playItem.getX() + this._playItem.getDX();
            var tempY = this._playItem.getY() + this._playItem.getDY();
            
            var collision = this.checkCollisions(tempX, tempY);
            if (collision == 0) {
                this._playItem.move();
            } else if (collision == 1) {
                this._playItem.setDY(-1 * this._playItem.getDY());
                var move = 0;
                while (this.checkCollisions(tempX, this._playItem.getY() - move) != 1) {
                    move++;
                }
                this._playItem.setX(tempX); // later there will be death by trig
                this._playItem.setY(this._playItem.getY() - move);
            } else if (collision == 2) {
                this._playItem.setDX(-1 * this._playItem.getDX());
                var move = 0;
                while (this.checkCollisions(this._playItem.getX() + move, tempY) != 2) {
                    move++;
                }
                this._playItem.setX(this._playItem.getX() + move); // later there will be death by trig
                this._playItem.setY(tempY);
            } else if (collision == 3) {
                if (this._playItem.getDY() < 2) { // SNAPTOGROUND = 5
                    this._playItem.setIsGrounded(true);
                    this._playItem.setDY(0);
                } else {
                    var roundedDY = Math.round(-1 * this._playItem.getFoodItem().bounceMultiplier * this._playItem.getDY());
                    this._playItem.setDY(roundedDY);
                }
                var move = 0;
                while (this.checkCollisions(tempX, this._playItem.getY() + this._playItem.getSize() + move) != 1) {
                    move++;
                }
                this._playItem.setX(tempX); // later there will be death by trig
                this._playItem.setY(this._playItem.getY() + move);
            } else if (collision == 4) {
                this._playItem.setDX(-1 * this._playItem.getDX());
                var move = 0;
                while (this.checkCollisions(this._playItem.getX() - move, tempY) != 2) {
                    move++;
                }
                this._playItem.setX(this._playItem.getX() - move); // later there will be death by trig
                this._playItem.setY(tempY);
            }
        }
        if (!this._playItem.getIsGrounded()) {
            this._playItem.applyGravity();
        }
    }
    
    checkCollisions(x, y) {
        var size = this._playItem.getSize();
        var x1 = x;
        var y1 = y;
        var x2 = x + size;
        var y2 = y + size;
        
        // console.log(this._playItem.getDY());
        // console.log("x1 = " + x1 + "; y1 = " + y1);
        // console.log(this._board[x1][y1].getType());
        if (x1 >= 0 && x2 < this._width && y1 >= 0 && y2 < this._height) {
            if (this._board[x1][y1].getType() == SOLID) {
                if (this._board[x2][y1].getType() == SOLID) {
                    return 1;
                } else if (this._board[x1][y2].getType() == SOLID) {
                    return 4;
                } else {
                    return 0; //for now, until objects can collide on part of a side
                }
            } else if (this._board[x2][y2].getType() == SOLID) {
                if (this._board[x2][y1].getType() == SOLID) {
                    return 2;
                } else if (this._board[x1][y2].getType() == SOLID) {
                    return 3;
                } else {
                    return 0; //for now, until objects can collide on part of a side
                }
            }
        }
        
        return 0;
    }
}

class Barrier {
    constructor(name, x1, y1, x2, y2) {
        this.setName(name);
        this.setX1(x1);
        this.setY1(y1);
        this.setX2(x2);
        this.setY2(y2);
    }
    
    setName(name) {
        this._name = name;
    }
    
    getName() {
        return this._name;
    }
    
    setX1(x1) {
        this._x1 = x1;
    }
    
    getX1() {
        return this._x1;
    }
    
    setY1(y1) {
        this._y1 = y1;
    }
    
    getY1() {
        return this._y1;
    }
    
    setX2(x2) {
        this._x2 = x2;
    }
    
    getX2() {
        return this._x2;
    }
    
    setY2(y2) {
        this._y2 = y2;
    }
    
    getY2() {
        return this._y2;
    }
}

class PlayItem {
    constructor(x, y, dx, dy, foodItem) {
        this.setX(x);
        this.setY(y);
        this.setDX(dx);
        this.setDY(dy);
        this.setFoodItem(foodItem);
        this._size = 50;
    }
    
    setX(x) {
        this._x = x;
    }
    
    getX() {
        return this._x;
    }
    
    setY(y) {
        this._y = y;
    }
    
    getY() {
        return this._y;
    }
    
    setDX(dx) {
        this._dx = dx;
    }
    
    getDX() {
        return this._dx;
    }
    
    setDY(dy) {
        this._dy = dy;
    }
    
    getDY() {
        return this._dy;
    }
    
    getSize() {
        return this._size;
    }
    
    setIsGrounded(isGrounded) {
        this._isGrounded = isGrounded;
    }
    
    getIsGrounded() {
        return this._isGrounded;
    }
    
    setFoodItem(foodItem) {
        this._foodItem = foodItem;
    }
    
    getFoodItem() {
        return this._foodItem;
    }
    
    move() {
        this._x += this._dx;
        this._y += this._dy;
    }
    
    applyGravity() {
        this._dy += this._foodItem.gravity;
    }
}

class FoodItem {
    
    constructor(name, type, imageURL, isEdible) {
        this._name = name;
        this._type = type;
        this.bounceMultiplier = 0.8; // varies by type
        this.gravity = 1; // varies by type
        this._imageURL = imageURL;
        this._isEdible = isEdible;
    }
    
    
    getImageURL() {
        return this._imageURL;
    }
}

class Pixel {
    constructor(type) {
        this.setType(type);
    }
    
    setType(type) {
        this._type = type;
    }
    
    getType() {
        return this._type;
    }

    setIsImportant(isImportant) {
        this._isImportant = isImportant;
    }
    
    getIsImportant() {
        return this._isImportant;
    }
}

       var AIR = 0;
        var SOLID = 1;
