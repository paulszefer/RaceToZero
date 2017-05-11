/*
 * Constants.
 */
const BACKGROUND_COLOUR = "rgb(255, 255, 255)";
const BARRIER_COLOUR = "rgb(50, 255, 100)";

/*
 * Game states.
 */
const LEVEL = 0;
const QUESTION = 1;

/*
 * Types of pixels.
 */
const AIR = 0;
const SOLID = 1;
const GOAL = 2;
const WRONG = 3;

class Game {
    /**
     * Creates a game object that stores the current game screen and its properties.
     * Used to display the correct screen and to transition between levels.
     */
    constructor() {
        this.level = this.retrieveLevel();
        this.state = 0;
        this.elements;
        this.createHTML();
    }

    set level(id) {
        this._level = id;
    }

    get level() {
        return this._level;
    }

    set state(state) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    set elements(elements) {
        this._elements = elements;
    }

    get elements() {
        return this._elements;
    }

    addElement(element) {
        this.elements.push(element);
    }

    retrieveLevel() {
        // TODO - get last level from database
        return 0;
    }

    createHTML() {
    }

    render() {
        document.getElementById("game_div").style.display = "block";
       // $("#game_div").css("display", "block");
    }
}

/*
 * Defines a level with an ID and dimensions.
 * Also allows a PlayItem to be stored.
 */
class Level {
    /*
     * Initializes the level ID, width and height. Creates a board based on the level's
     * width and height, and assigns the board to this. Keeps an array of barriers.
     */
    constructor(levelID, width, height) {
        this._levelID = levelID;
        this._width = width;
        this._height = height;
        this._state = 0;

        // initialize with an empty board (each pixel is air)
        let emptyBoard = new Array(width);
        for (let i = 0; i < emptyBoard.length; i++) {
            emptyBoard[i] = new Array(height);
            for (let j = 0; j < emptyBoard[i].length; j++) {
                emptyBoard[i][j] = new Pixel(AIR);
            }
        }
        this._board = emptyBoard;
    }

    /*
     * Sets the level ID if the new level ID is 0 or greater.
     */
    set levelID(levelID) {
        if (levelID >= 0) {
            this._levelID = levelID;
        }
    }

    /*
     * Returns the level ID.
     */
    get levelID() {
        return this._levelID;
    }

    /*
     * Sets the level width if the new level width is 100 or greater.
     */
    set width(width) {
        if (width >= 100) {
            this._width = width;
        }
    }

    /*
     * Returns the level width.
     */
    get width() {
        return this._width;
    }

    /*
     * Sets the level height if the new level height is 100 or greater.
     */
    set height(height) {
        if (height >= 100) {
            this._height = height;
        }
    }

    /*
     * Returns the level height.
     */
    get height() {
        return this._height;
    }

    set state(state) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    /*
     * Sets the play item of the level.
     */
    set playItem(playItem) {
        this._playItem = playItem;
    }

    /*
     * Returns the play item of the level.
     */
    get playItem() {
        return this._playItem;
    }

    /*
     * Sets the board of the level. The board is a 2D array of size width x height.
     */
    set board(board) {
        this._board = board;
    }

    /*
     * Returns the board of the level.
     */
    get board() {
        return this._board;
    }

    /*
     * Changes the PlayItem if the new x and y position are within bounds.
     */
    changePlayItem(x, y, dx, dy, foodItem) {
        if (x > 0 && x < this._width
            && y > 0 && y < this._height) {
            this._playItem = new PlayItem(x, y, dx, dy, foodItem);
        }
    }

    /*
     * Adds an object by setting all pixels within a certain range to a certain pixel 
     * type.
     */
    addPhysicalObject(x1, y1, x2, y2, pixelType) {
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                this._board[i][j].type = pixelType;
            }
        }
    }

    /*
     * Adds a barrier by setting all pixels within the given barrier's range to solid.
     */
    addBarrier(barrier) {
        this.addPhysicalObject(barrier.x1, barrier.y1, barrier.x2, barrier.y2, SOLID);
    }

    /*
     * Adds a section of air.
     */
    addAir(air) {
        this.addPhysicalObject(air.x1, air.y1, air.x2, air.y2, AIR);
    }

    /*
     * Adds a goal by setting all pixels within the given barrier's range to goal.
     */
    addGoal(goal) {
        this.addPhysicalObject(goal.x1, goal.y1, goal.x2, goal.y2, GOAL);
    }

    /*
     * Moves the play item. Before the play item moves, checks to see if it will collide
     * with anything and adjusts accordingly.
     */
    move() {

        // don't move if out of bounds
        if (this.playItem.x1 < 0 || this.playItem.y1 < 0 || this.playItem.x2 > this.width || this.playItem.y2 > this.height) {
            return;
        }
        //console.log(this._playItem.getDX());
        let tempX = this.playItem.x + this.playItem.dx;
        let tempY = this.playItem.y + this.playItem.dy;

        // check if next movement causes a collision
        let collision = this.checkCollisions(tempX, tempY);
        if (collision === 0) {
            // no collision, move normally
            this.playItem.move();
            this.playItem.isGrounded = false;
        } else if (collision === 1) {
            this.snapToTop(tempX);
            this.playItem.reverseDY();
            this.playItem.isGrounded = false;
        } else if (collision === 2) {
            this.snapToRight(tempY);
            this.playItem.reverseDX();
            this.playItem.isGrounded = false;
        } else if (collision === 3) {
            if (!this.playItem.isGrounded) {
                this.snapToBottom(tempX);
            }
            if (this.playItem.dy < 2) { // SNAPTOGROUND = 2
                this.playItem.snapToGround();
                this.playItem.move();
            } else {
                this.playItem.reverseDY();
                this.playItem.isGrounded = false;
            }
        } else if (collision === 4) {
            this.snapToLeft(tempY);
            this.playItem.reverseDX();
            this.playItem.isGrounded = false;
        } else if (collision === 5) {
            this.playItem.move();
            return 5;
        }
        this.playItem.applyGravity();
        this.playItem.adjustSpeed();
        this.playItem.round();
    }

    snapToTop(tempX) {
        let move = 0;
        while (this.checkCollisions(tempX, this._playItem.y - move) !== 1) {
            move++;
        }
        let ratio = this._playItem.dx / this._playItem.dy;
        this._playItem.x = this._playItem.x - (move * ratio);
        this._playItem.y = this._playItem.y - move;
    }

    snapToRight(tempY) {
        let move = 0;
        while (this.checkCollisions(this._playItem.x + move, tempY) !== 2) {
            move++;
        }
        let ratio = this._playItem.dy / this._playItem.dx;
        this._playItem.x = this._playItem.x + move;
        this._playItem.y = this._playItem.y + (move * ratio);
    }

    snapToBottom(tempX) {
        let move = 0;
        while (this.checkCollisions(tempX, this._playItem.y + move) !== 3) {
            move++;
        }
        let ratio = this._playItem.dx / this._playItem.dy;
        this._playItem.x = this._playItem.x + (move * ratio);
        this._playItem.y = this._playItem.y + move;
    }

    snapToLeft(tempY) {
        let move = 0;
        while (this.checkCollisions(this._playItem.x - move, tempY) !== 4) {
            move++;
        }
        let ratio = this._playItem.dy / this._playItem.dx;
        this._playItem.x = this._playItem.x - move;
        this._playItem.y = this._playItem.y - (move * ratio);
    }

    /*
     * Checks to see if the object is colliding with anything.
     * Returns 0 if no collision, 1 if top collision, 2 if right-side collision, 3 if 
     * bottom collision, 4 if left-side collision.
     */
    checkCollisions(x, y) {
        let size = this._playItem.size;
        let x1 = x;
        let y1 = y;
        let x2 = x + size;
        let y2 = y + size;

        if (x1 >= 0 && x2 < this._width && y1 >= 0 && y2 < this._height) {
            if (this._board[x1][y1].type === SOLID) {
                return this.topLeftCollision(x1, y1);
            } else if (this._board[x2][y2].type === SOLID) {
                return this.bottomRightCollision(x1, y1);
            } else if (this._board[x1][y2].type === SOLID) {
                return this.bottomLeftCollision(x1, y1);
            } else if (this._board[x2][y1].type === SOLID) {
                return this.topRightCollision(x1, y1);
            } else if (this._board[x1][y1].type === GOAL) {
                return 5;
            } else if (this._board[x2][y2].type === GOAL) {
                return 5;
            } else if (this._board[x1][y2].type === GOAL) {
                return 5;
            } else if (this._board[x2][y1].type === GOAL) {
                return 5;
            }
        }
        return 0;
    }

    /*
     * Handles the case where the top-left corner of the object collides with a barrier.
     */
    topLeftCollision(x1, y1) {
        let size = this._playItem.size;
        let x2 = x1 + size;
        let y2 = y1 + size;
        let origX1 = x1 - this._playItem.dx;
        let origY1 = y1 - this._playItem.dy;

        if (this._board[x2][y1].type === SOLID) {
            return 1;
        } else if (this._board[x1][y2].type === SOLID) {
            return 4;
        } else {
            let move = 0;
            while (move < this._playItem.size) {
                if (this._board[origX1 - move][origY1].type === SOLID) {
                    return 4;
                } else if (this._board[origX1][origY1 - move].type === SOLID) {
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
        let size = this._playItem.size;
        let x2 = x1 + size;
        let y2 = y1 + size;
        let origX2 = x2 - this._playItem.dx;
        let origY2 = y2 - this._playItem.dy;

        if (this._board[x2][y1].type === SOLID) {
            return 2;
        } else if (this._board[x1][y2].type === SOLID) {
            return 3;
        } else {
            if (this._playItem.isGrounded) {
                return 3;
            }
            let move = 0;
            while (move < this._playItem.size) {
                if (this._board[origX2 + move][origY2].type === SOLID) {
                    return 2;
                } else if (this._board[origX2][origY2 + move].type === SOLID) {
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
        let origX1 = x1 - this._playItem.dx;
        let origY2 = y1 + this._playItem.size - this._playItem.dy;

        let move = 0;
        while (move < this._playItem.size) {
            if (this._playItem.isGrounded) {
                return 3;
            }
            if (this._board[origX1 - move][origY2].type === SOLID) {
                return 4;
            } else if (this._board[origX1][origY2 + move].type === SOLID) {
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
        let origX2 = x1 + this._playItem.size - this._playItem.dx;
        let origY1 = y1 - this._playItem.dy;

        let move = 0;
        while (move < this._playItem.size) {
            if (this._board[origX2 + move][origY1].type === SOLID) {
                return 2;
            } else if (this._board[origX2][origY1 - move].type === SOLID) {
                return 1;
            } else {
                move++;
            }
        }
        return 0;
    }
}

class PhysicalObject {

    constructor(name, x1, y1, x2, y2, pixelType) {
        this._name = name;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._pixelType = pixelType;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get x1() {
        return this._x1;
    }

    set x1(x) {
        this._x1 = x;
    }

    get y1() {
        return this._y1;
    }

    set y1(y) {
        this._y1 = y;
    }

    get x2() {
        return this._x2;
    }

    set x2(x) {
        this._x2 = x;
    }

    get y2() {
        return this._y2;
    }

    set y2(y) {
        this._y2 = y;
    }

    get pixelType() {
        return this._pixelType;
    }

    set pixelType(pixelType) {
        this._pixelType = pixelType;
    }

    drawPhysicalObject() {
        let objectWidth = this._x2 - this._x1;
        let objectHeight = this._y2 - this._y1;
        let objectColour = "";

        if (this._pixelType === SOLID) {
            objectColour = BARRIER_COLOUR;
        } else if (this._pixelType === AIR) {
            objectColour = BACKGROUND_COLOUR;
        } else if (this._pixelType === GOAL) {
            objectColour = BACKGROUND_COLOUR;
        }

        // TODO - write to appropriate element
        let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.id = this.name;
        svgElement.style.width = objectWidth;
        svgElement.style.height = objectHeight;
        svgElement.innerHTML = "<rect width=\"" + objectWidth
            + "\" height=\"" + objectHeight
            + "\" style=\"fill:" + objectColour + ";\">";
        document.getElementById("game_div").appendChild(svgElement);

        // document.write(
        //     "<svg id=\"" + this._name + "some" +
        //     "\" width=\"" + objectWidth +
        //     "\" height=\"" + objectHeight + "\">"
        //     + "<rect width=\"" + objectWidth
        //     + "\" height=\"" + objectHeight
        //     + "\" style=\"fill:" + objectColour + ";\">" +
        //     "</svg>"
        // );

        let element = $("#" + this._name);
        element.css("position", "absolute");
        element.css("left", this._x1);
        element.css("top", this._y1);

    }
}

/*
 * Defines a rectangular barrier (a wall, or platform).
 */
class Barrier extends PhysicalObject {
    constructor(name, x1, y1, x2, y2) {
        super(name, x1, y1, x2, y2, SOLID);
    }
}

class Air extends PhysicalObject {
    constructor(name, x1, y1, x2, y2) {
        super(name, x1, y1, x2, y2, AIR);
    }
}

class Goal extends PhysicalObject {
    constructor(name, x1, y1, x2, y2) {
        super(name, x1, y1, x2, y2, GOAL);
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
    constructor(x, y, dx, dy, size, foodItem) {
        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;
        this._size = size;
        this._foodItem = foodItem;
        this._isGrounded = false;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get dx() {
        return this._dx;
    }

    set dx(value) {
        this._dx = value;
    }

    get dy() {
        return this._dy;
    }

    set dy(value) {
        this._dy = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get foodItem() {
        return this._foodItem;
    }

    set foodItem(value) {
        this._foodItem = value;
    }

    get isGrounded() {
        return this._isGrounded;
    }

    set isGrounded(isGrounded) {
        this._isGrounded = isGrounded;
    }

    /*
     * Reverses the horizontal component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDX() {
        let adjustedDX = -1 * this._foodItem.bounceMultiplier * this._dx;
        this.dx = adjustedDX;
    }

    /*
     * Reverses the vertical component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDY() {
        let adjustedDY = -1 * this._foodItem.bounceMultiplier * this._dy;
        this.dy = adjustedDY;
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
        let xDiff = this._x + (this._size / 2) - mousePosX;
        let yDiff = this._y + (this._size / 2) - mousePosY;

        let divisor = 10;

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

    set imageURL(imageURL) {
        this._imageURL = imageURL;
    }

    /*
     * Returns the URL of the image of the food item.
     */
    get imageURL() {
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
        this._type = type;
    }

    /*
     * Sets the type of the pixel (air or solid).
     */
    set type(type) {
        this._type = type;
    }

    /*
     * Returns the type of the pixel (air or solid).
     */
    get type() {
        return this._type;
    }
}