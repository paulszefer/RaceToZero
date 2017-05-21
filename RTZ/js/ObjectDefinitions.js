/**
 * Contains definitions for all of the objects used in the game.
 */

/**
 * Constants.
 */
const BACKGROUND_COLOUR = "rgb(255, 255, 255)";
const BARRIER_COLOUR = "rgb(50, 255, 100)";
const SNAP_TO_GROUND = 0.5;

/**
 * Types of pixels.
 */
const AIR = 0;
const SOLID = 1;
const GOAL = 2;
const WRONG = 3;
const RIGHT_ANSWER = 4;

let BOUNCE_MULTIPLIER = 0.4;

// Changes the bounce multiplier if the user types "bounce".
let keyNumber = 0;
$(document).keypress(function (event) {
    if (keyNumber === 0) {
        if (event.which === 98) { // "b"
            keyNumber++;
        } else {
            keyNumber = 0;
        }
    } else if (keyNumber === 1) {
        if (event.which === 111) { // "o"
            keyNumber++;
        } else {
            keyNumber = 0;
        }
    } else if (keyNumber === 2) {
        if (event.which === 117) { // "u"
            keyNumber++;
        } else {
            keyNumber = 0;
        }
    } else if (keyNumber === 3) {
        if (event.which === 110) { // "n"
            keyNumber++;
        } else {
            keyNumber = 0;
        }
    } else if (keyNumber === 4) {
        if (event.which === 99) { // "c"
            keyNumber++;
        } else {
            keyNumber = 0;
        }
    } else if (keyNumber === 5) {
        if (event.which === 101) { // "e"
            if (BOUNCE_MULTIPLIER === 0.6) {
                BOUNCE_MULTIPLIER = 2;
            } else {
                BOUNCE_MULTIPLIER = 0.6;
            }
        } else {
            keyNumber = 0;
        }
    }
});


/**
 * A game object that keeps track of the current level.
 */
class Game {

    /**
     * Creates a game object that stores the current game screen and its properties.
     * Used to display the correct screen and to transition between levels.
     */
    constructor() {
        this.level = this.retrieveLevel();
        this.elements;
    }

    /**
     * Sets the current level of the game.
     */
    set level(id) {
        this._level = id;
    }

    /**
     * Returns the current level of the game.
     */
    get level() {
        return this._level;
    }

    /**
     * Sets the elements of the game.
     */
    set elements(elements) {
        this._elements = elements;
    }

    /**
     * Returns the elements of the game.
     */
    get elements() {
        return this._elements;
    }

    /**
     * Adds an element to the set of elements.
     */
    addElement(element) {
        this.elements.push(element);
    }

    /**
     * Returns the user's current level. Currently the user always starts from level -1 (level select).
     * TODO - this function should be renamed
     */
    retrieveLevel() {
        return -1;
    }

    /**
     * Displays the game.
     */
    render() {
        document.getElementById("game_window").style.display = "block";
    }
}

/**
 * Defines a level with an ID and dimensions.
 * Also allows a PlayItem to be stored.
 */
class Level {

    /**
     * Initializes the level ID, width and height. Creates a board based on the level's
     * width and height, and assigns the board to this. Keeps an array of barriers.
     */
    constructor(levelID, width, height) {
        this._levelID = levelID;
        this._width = width;
        this._height = height;

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

    /**
     * Sets the level ID if the new level ID is 0 or greater.
     */
    set levelID(levelID) {
        if (levelID >= 0) {
            this._levelID = levelID;
        }
    }

    /**
     * Returns the level ID.
     */
    get levelID() {
        return this._levelID;
    }

    /**
     * Sets the level width if the new level width is 100 or greater.
     * TODO - maybe unnecessary
     */
    set width(width) {
        if (width >= 100) {
            this._width = width;
        }
    }

    /**
     * Returns the level width.
     */
    get width() {
        return this._width;
    }

    /**
     * Sets the level height if the new level height is 100 or greater.
     */
    set height(height) {
        if (height >= 100) {
            this._height = height;
        }
    }

    /**
     * Returns the level height.
     */
    get height() {
        return this._height;
    }

    /**
     * Sets the play item of the level.
     */
    set playItem(playItem) {
        this._playItem = playItem;
    }

    /**
     * Returns the play item of the level.
     */
    get playItem() {
        return this._playItem;
    }

    /**
     * Sets the board of the level. The board is a 2D array of size width x height.
     */
    set board(board) {
        this._board = board;
    }

    /**
     * Returns the board of the level.
     */
    get board() {
        return this._board;
    }

    /**
     * Changes the PlayItem if the new x and y position are within bounds.
     */
    changePlayItem(x, y, dx, dy, foodItem) {
        if (x > 0 && x < this._width
            && y > 0 && y < this._height) {
            this._playItem = new PlayItem(x, y, dx, dy, foodItem);
        }
    }

    /**
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

    /**
     * Adds a barrier by setting all pixels within the given barrier's range to solid.
     */
    addBarrier(barrier) {
        this.addPhysicalObject(barrier.x1, barrier.y1, barrier.x2, barrier.y2, SOLID);
    }

    /**
     * Adds a section of air by setting all pixels within the given barrier's range to air.
     */
    addAir(air) {
        this.addPhysicalObject(air.x1, air.y1, air.x2, air.y2, AIR);
    }

    /**
     * Adds a goal by setting all pixels within the given barrier's range to goal.
     */
    addGoal(goal) {
        this.addPhysicalObject(goal.x1, goal.y1, goal.x2, goal.y2, GOAL);
    }

    /**
     * Adds a wrong answer section.
     */
    addWrong(wrong) {
        let x1 = wrong.x1;
        let y1 = wrong.y1;
        let x2 = wrong.x2;
        let y2 = wrong.y2;
        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                this._board[i][j].type = WRONG;
                this._board[i][j].answerID = wrong.answerID;
            }
        }
    }

    /**
     * Moves the play item. Before the play item moves, checks to see if it will collide
     * with anything and adjusts accordingly.
     * TODO - check incrementally to fix bugs with moving through thin barriers
     */
    move() {


        // don't move if out of bounds
        if (this.playItem.x < 0 || this.playItem.y < 0 || this.playItem.x + this.playItem.size > this.width || this.playItem.y + this.playItem.size > this.height) {
            console.log("Error: The item is out of bounds.");
            return;
        }

        let tempX = this.playItem.x + this.playItem.dx;
        let tempY = this.playItem.y + this.playItem.dy;
        let collision = this.checkCollisions(tempX, tempY);

        // logs for testing purposes
        //console.log("x: " + this.playItem.x + " y: " + this.playItem.y + " dx: " + this.playItem.dx + " dy: " + this.playItem.dy + " coll: " + collision);

        if (this.checkCollisions(this.playItem.x, this.playItem.y + 1) === 3 && Math.abs(this.playItem.dy) < SNAP_TO_GROUND) {
            this.playItem.isGrounded = true;
            if (collision === 2) {
                // right side collision
                this.snapToRight(tempY);
                this.playItem.reverseDX();
            } else if (collision === 4) {
                // left side collision
                this.snapToLeft(tempY);
                this.playItem.reverseDX();
            } else {
                this.playItem.move();
            }
            this.playItem.dy = 0;
            if (this.playItem.dx > 0) {
                this.playItem.dx *= 0.9;
            } else if (this.playItem.dx < 0) {
                this.playItem.dx *= 0.9;
            }
        } else {
            // check if next movement causes a collision
            if (collision === 0) {
                // no collision, move normally
                this.playItem.move();
                this.playItem.isGrounded = false;
            } else if (collision === 1) {
                // top-side collision
                this.snapToTop(tempX);
                this.playItem.reverseDY();
                this.playItem.isGrounded = false;
            } else if (collision === 2) {
                // right-side collision
                this.snapToRight(tempY);
                this.playItem.reverseDX();
                this.playItem.isGrounded = false;
            } else if (collision === 3) {
                // bottom-side collision
                if (!this.playItem.isGrounded) {
                    this.snapToBottom(tempX);
                }
                if (Math.abs(this.playItem.dy) < SNAP_TO_GROUND) {
                    this.playItem.snapToGround();
                    this.playItem.move();
                } else {
                    this.playItem.reverseDY();
                    this.playItem.isGrounded = false;
                }
            } else if (collision === 4) {
                // left-side collision
                this.snapToLeft(tempY);
                this.playItem.reverseDX();
                this.playItem.isGrounded = false;
            } else if (collision === 5) {
                // collision with a goal
                this.playItem.move();
                return 5;
            } else if (collision === 6) {
                // collision with a wrong answer section
                this.playItem.move();

                // find associated wrong answer
                let x1 = Math.round(this.playItem.x);
                let y1 = Math.round(this.playItem.y);
                let x2 = x1 + this.playItem.size;
                let y2 = y1 + this.playItem.size;

                let topLeftPixel = this.board[x1][y1];
                let topRightPixel = this.board[x2][y1];
                let bottomLeftPixel = this.board[x1][y2];
                let bottomRightPixel = this.board[x2][y2];
                let wrongPixelX;
                let wrongPixelY;

                if (topLeftPixel.type === WRONG) {
                    document.getElementById(topLeftPixel.answerID).style.color = "red";
                    document.getElementById(topLeftPixel.answerID).style.textDecoration = "line-through";
                    wrongPixelX = x1;
                    wrongPixelY = y1;
                } else if (topRightPixel.type === WRONG) {
                    document.getElementById(topRightPixel.answerID).style.color = "red";
                    document.getElementById(topRightPixel.answerID).style.textDecoration = "line-through";
                    wrongPixelX = x2;
                    wrongPixelY = y1;
                } else if (bottomLeftPixel.type === WRONG) {
                    document.getElementById(bottomLeftPixel.answerID).style.color = "red";
                    document.getElementById(bottomLeftPixel.answerID).style.textDecoration = "line-through";
                    wrongPixelX = x1;
                    wrongPixelY = y2;
                } else if (bottomRightPixel.type === WRONG) {
                    document.getElementById(bottomRightPixel.answerID).style.color = "red";
                    document.getElementById(bottomRightPixel.answerID).style.textDecoration = "line-through";
                    wrongPixelX = x2;
                    wrongPixelY = y2;
                }

                // replace "wrong" section with air to prevent further triggers
                let wrongX1;
                let wrongY1;
                let wrongX2;
                let wrongY2;

                while (wrongPixelX >= 0 && this.board[wrongPixelX][wrongPixelY].type === WRONG) {
                    wrongPixelX--;
                }
                wrongPixelX++;
                wrongX1 = wrongPixelX;
                while (wrongPixelY >= 0 && this.board[wrongPixelX][wrongPixelY].type === WRONG) {
                    wrongPixelY--;
                }
                wrongPixelY++;
                wrongY1 = wrongPixelY;
                while (wrongPixelX <= this.width && this.board[wrongPixelX][wrongPixelY].type === WRONG) {
                    wrongPixelX++;
                }
                wrongPixelX--;
                wrongX2 = wrongPixelX;
                while (wrongPixelY <= this.height && this.board[wrongPixelX][wrongPixelY].type === WRONG) {
                    wrongPixelY++;
                }
                wrongPixelY--;
                wrongY2 = wrongPixelY;

                this.addAir(new Air("air" + wrongX1, wrongX1, wrongY1, wrongX2, wrongY2));
                return 6;
            }
        }
        this.playItem.applyGravity();
        this.playItem.adjustSpeed();
    }

    // TODO - group/normalize these snap functions?

    /**
     * Snaps the playItem to its top side to simulate the object moving until it collides with its top.
     */
    snapToTop(tempX) {
        let move = 0;
        while (this.checkCollisions(tempX, this._playItem.y - move) === 0) {
            move++;
        }
        move--;
        if (this.playItem.dy !== 0) {
            let ratio = this._playItem.dx / this._playItem.dy;
            this._playItem.x = this._playItem.x - (move * ratio);
            this._playItem.y = this._playItem.y - move;
        }
    }

    /**
     * Snaps the playItem to its right side to simulate the object moving until it collides with its right.
     */
    snapToRight(tempY) {
        let move = 0;
        while (this.checkCollisions(this._playItem.x + move, tempY) === 0) {
            move++;
        }
        move--;
        if (this.playItem.dx !== 0) {
            let ratio = this._playItem.dy / this._playItem.dx;
            this._playItem.x = this._playItem.x + move;
            this._playItem.y = this._playItem.y + (move * ratio);
        }
    }

    /**
     * Snaps the playItem to its bottom side to simulate the object moving until it collides with its bottom.
     */
    snapToBottom(tempX) {
        let move = 0;
        while (this.checkCollisions(tempX, this._playItem.y + move) === 0) {
            move++;
        }
        move--;
        if (this.playItem.dy !== 0) {
            let ratio = this._playItem.dx / this._playItem.dy;
            this._playItem.x = this._playItem.x + (move * ratio);
            this._playItem.y = this._playItem.y + move;
        }
    }

    /**
     * Snaps the playItem to its left side to simulate the object moving until it collides with its left.
     */
    snapToLeft(tempY) {
        let move = 0;
        while (this.checkCollisions(this._playItem.x - move, tempY) === 0) {
            move++;
        }
        move--;
        if (this.playItem.dx !== 0) {
            let ratio = this._playItem.dy / this._playItem.dx;
            this._playItem.x = this._playItem.x - move;
            this._playItem.y = this._playItem.y - (move * ratio);
        }
    }

    /**
     * Checks to see if the object is currently colliding with anything.
     * Returns 0 if no collision, 1 if top collision, 2 if right-side collision, 3 if
     * bottom collision, 4 if left-side collision, 5 if it collides with a goal,
     * 6 if it collides with a wrong answer section.
     */
    checkCollisions(x, y) {
        let size = this._playItem.size;
        let x1 = Math.round(x);
        let y1 = Math.round(y);
        let x2 = x1 + size;
        let y2 = y1 + size;

        if (x1 >= 0 && x2 < this._width && y1 >= 0 && y2 < this._height) {
            if (this._board[x1][y1].type === SOLID) {
                return this.topLeftCollision(x1, y1);
            } else if (this._board[x2][y1].type === SOLID) {
                return this.topRightCollision(x1, y1);
            } else if (this._board[x1][y2].type === SOLID) {
                return this.bottomLeftCollision(x1, y1);
            } else if (this._board[x2][y2].type === SOLID) {
                return this.bottomRightCollision(x1, y1);
            } else if (this._board[x1][y1].type === GOAL) {
                return 5;
            } else if (this._board[x2][y2].type === GOAL) {
                return 5;
            } else if (this._board[x1][y2].type === GOAL) {
                return 5;
            } else if (this._board[x2][y1].type === GOAL) {
                return 5;
            } else if (this._board[x1][y1].type === WRONG) {
                return 6;
            } else if (this._board[x2][y2].type === WRONG) {
                return 6;
            } else if (this._board[x1][y2].type === WRONG) {
                return 6;
            } else if (this._board[x2][y1].type === WRONG) {
                return 6;
            }
        }
        return 0;
    }

    /**
     * Handles the case where the top-left corner of the object collides with a barrier.
     */
    topLeftCollision(x1, y1) {
        let size = this._playItem.size;
        let halfSize = Math.round(this.playItem.size / 2);
        let x2 = x1 + size;
        let y2 = y1 + size;
        let origX1 = x1 - this._playItem.dx;
        let origY1 = y1 - this._playItem.dy;

        if (this._board[x2 - halfSize][y1].type === SOLID) {
            return 1;
        } else if (this._board[x1][y2 - halfSize].type === SOLID) {
            return 4;
        } else {
            if (this._playItem.dx > 0) {
                return 1;
            }
            if (this._playItem.dy > 0) {
                return 4;
            }
            /*let move = 0;
             while (move < this._playItem.size) {
             if (this._board[origX1 - move][origY1].type === SOLID) {
             return 4;
             } else if (this._board[origX1][origY1 - move].type === SOLID) {
             return 1;
             } else {
             move++;
             }
             }*/
            let biggerComponent = Math.max(Math.abs(this.playItem.dx), Math.abs(this.playItem.dy));
            for (let i = 1; i <= biggerComponent; i++) {
                let currentX1 = Math.round(origX1 + this.playItem.dx * i / biggerComponent);
                let currentY1 = Math.round(origY1 + this.playItem.dy * i / biggerComponent);
                if (this.board[currentX1][currentY1].type === SOLID) {
                    let move = 0;
                    while (move < this.playItem.size) {
                        if (this.board[currentX1 + move][currentY1].type !== SOLID) {
                            return 4;
                        }
                        if (this.board[currentX1][currentY1 + move].type !== SOLID) {
                            return 1;
                        }
                        else {
                            move++;
                        }
                    }
                }
            }
            return 0;
        }
    }

    /**
     * Handles the case where the top-right corner of the object collides with a barrier.
     */
    topRightCollision(x1, y1) {
        let origX2 = x1 + this._playItem.size - this._playItem.dx;
        let origY1 = y1 - this._playItem.dy;

        if (this._playItem.dx < 0) {
            return 1;
        }
        if (this._playItem.dy > 0) {
            return 2;
        }
        /*let move = 0;
         while (move < this._playItem.size) {
         if (this._board[origX2 + move][origY1].type === SOLID) {
         return 2;
         } else if (this._board[origX2][origY1 - move].type === SOLID) {
         return 1;
         } else {
         move++;
         }
         }*/
        let biggerComponent = Math.max(Math.abs(this.playItem.dx), Math.abs(this.playItem.dy));
        for (let i = 1; i <= biggerComponent; i++) {
            let currentX2 = Math.round(origX2 + this.playItem.dx * i / biggerComponent);
            let currentY1 = Math.round(origY1 + this.playItem.dy * i / biggerComponent);
            if (this.board[currentX2][currentY1].type === SOLID) {
                let move = 0;
                while (move < this.playItem.size) {
                    if (this.board[currentX2 - move][currentY1].type !== SOLID) {
                        return 2;
                    }
                    if (this.board[currentX2][currentY1 + move].type !== SOLID) {
                        return 1;
                    }
                    else {
                        move++;
                    }
                }
            }
        }
        return 0;
    }

    /**
     * Handles the case where the bottom-right corner of the object collides with a
     * barrier.
     */
    bottomRightCollision(x1, y1) {
        let size = this._playItem.size;
        let halfSize = Math.round(size / 2);
        let x2 = x1 + size;
        let y2 = y1 + size;
        let origX2 = x2 - this._playItem.dx;
        let origY2 = y2 - this._playItem.dy;
        if (this._board[x2][y1 + halfSize].type === SOLID) {
            return 2;
        } else if (this._board[x1 + halfSize][y2].type === SOLID) {
            return 3;
        } else {
            if (this._playItem.isGrounded) {
                return 3;
            }
            if (this._playItem.dx < 0) {
                return 3;
            }
            if (this._playItem.dy < 0) {
                return 2;
            }
            /*let move = 0;
             while (move < this._playItem.size) {
             if (this._board[origX2 + move][origY2].type === SOLID) {
             return 2;
             } else if (this._board[origX2][origY2 + move].type === SOLID) {
             return 3;
             } else {
             move++;
             }
             }*/
            let biggerComponent = Math.max(Math.abs(this.playItem.dx), Math.abs(this.playItem.dy));
            for (let i = 1; i <= biggerComponent; i++) {
                let currentX2 = Math.round(origX2 + this.playItem.dx * i / biggerComponent);
                let currentY2 = Math.round(origY2 + this.playItem.dy * i / biggerComponent);
                if (this.board[currentX2][currentY2].type === SOLID) {
                    let move = 0;
                    while (move < this.playItem.size) {
                        if (this.board[currentX2 - move][currentY2].type !== SOLID) {
                            return 2;
                        }
                        if (this.board[currentX2][currentY2 - move].type !== SOLID) {
                            return 3;
                        }
                        else {
                            move++;
                        }
                    }
                }
            }
            return 0;
        }
    }

    /**
     * Handles the case where the bottom-left corner of the object collides with a
     * barrier.
     */
    bottomLeftCollision(x1, y1) {
        let size = this._playItem.size;
        let halfSize = Math.round(size / 2);
        let x2 = x1 + size;
        let y2 = y1 + size;
        let origX1 = x1 - this._playItem.dx;
        let origY2 = y2 - this._playItem.dy;

        if (this._board[x1][y1 + halfSize].type === SOLID) {
            return 4;
        } else if (this._board[x2 - halfSize][y2].type === SOLID) {
            return 3;
        } else {
            if (this._playItem.isGrounded) {
                return 3;
            }
            // either left side or bottom side
            if (this._playItem.dx > 0) {
                return 3;
            }
            if (this._playItem.dy < 0) {
                return 4;
            }
            /*let move = 0;
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
             }*/
            let biggerComponent = Math.max(Math.abs(this.playItem.dx), Math.abs(this.playItem.dy));
            for (let i = 1; i <= biggerComponent; i++) {
                let currentX1 = Math.round(origX1 + this.playItem.dx * i / biggerComponent);
                let currentY2 = Math.round(origY2 + this.playItem.dy * i / biggerComponent);
                if (this.board[currentX1][currentY2].type === SOLID) {
                    let move = 0;
                    while (move < this.playItem.size) {
                        if (this.board[currentX1 + move][currentY2].type !== SOLID) {
                            return 4;
                        }
                        if (this.board[currentX1][currentY2 - move].type !== SOLID) {
                            return 3;
                        }
                        else {
                            move++;
                        }
                    }
                }
            }
        }
        return 0;
    }
}

/**
 * Defines a physical object that will display within the game.
 */
class PhysicalObject {

    /**
     * Creates the physical object.
     *
     * @param name object name used to name HTML element
     * @param x1 x coordinate of top-left corner
     * @param y1 y coordinate of top-left corner
     * @param x2 x coordinate of bottom-right corner
     * @param y2 y coordinate of bottom-right corner
     * @param pixelType the type of pixel
     */
    constructor(name, x1, y1, x2, y2, pixelType) {
        this._name = name;
        this._x1 = Math.round(x1);
        this._y1 = Math.round(y1);
        this._x2 = Math.round(x2);
        this._y2 = Math.round(y2);
        this._pixelType = pixelType;
    }

    /**
     * Returns the name.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name.
     */
    set name(name) {
        this._name = name;
    }

    /**
     * Returns the x coordinate of the top-left corner.
     */
    get x1() {
        return this._x1;
    }

    /**
     * Sets the x coordinate of the top-left corner.
     */
    set x1(x) {
        this._x1 = Math.round(x);
    }

    /**
     * Returns the y coordinate of the top-left corner.
     */
    get y1() {
        return this._y1;
    }

    /**
     * Sets the y coordinate of the top-left corner.
     */
    set y1(y) {
        this._y1 = Math.round(y);
    }

    /**
     * Returns the x coordinate of the bottom-right corner.
     */
    get x2() {
        return this._x2;
    }

    /**
     * Sets the x coordinate of the bottom-right corner.
     */
    set x2(x) {
        this._x2 = Math.round(x);
    }

    /**
     * Returns the y coordinate of the bottom-right corner.
     */
    get y2() {
        return this._y2;
    }

    /**
     * Sets the y coordinate of the bottom-right corner.
     */
    set y2(y) {
        this._y2 = Math.round(y);
    }

    /**
     * Returns the pixel type.
     */
    get pixelType() {
        return this._pixelType;
    }

    /**
     * Sets the pixel type.
     */
    set pixelType(pixelType) {
        this._pixelType = pixelType;
    }

    /**
     * Creates an svg element to draw this object on the game window.
     */
    drawPhysicalObject() {
        let objectWidth = this._x2 - this._x1;
        let objectHeight = this._y2 - this._y1;
        let objectColour = "";

        // TODO - Old barriers made with SVG shapes
        /*

         if (this._pixelType === SOLID) {
         objectColour = BARRIER_COLOUR;
         } else if (this._pixelType === AIR) {
         objectColour = BACKGROUND_COLOUR;
         } else if (this._pixelType === GOAL) {
         objectColour = BACKGROUND_COLOUR;
         } else if (this._pixelType === WRONG) {
         objectColour = BARRIER_COLOUR;
         }

         let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
         svgElement.id = this.name;
         svgElement.style.width = objectWidth;
         svgElement.style.height = objectHeight;
         $(svgElement).css("width", objectWidth);
         $(svgElement).css("height", objectHeight);
         svgElement.innerHTML = "<rect width=\"" + objectWidth
         + "\" height=\"" + objectHeight
         + "\" style=\"fill:" + objectColour + ";\">";
         document.getElementById("game_window").appendChild(svgElement);

         // TODO - move this up to match other css styling
         // TODO - OR move to external stylesheet - better solution
         let element = $("#" + this._name);
         element.css("position", "absolute");
         element.css("left", this._x1);
         element.css("top", this._y1);
         */

        // object visual based on single section of image
        let objectImage = document.createElement("div");
        objectImage.id = this.name;
        objectImage.style.width = objectWidth + "px";
        objectImage.style.height = objectHeight + "px";
        objectImage.style.position = "absolute";
        objectImage.style.left = this.x1 + "px";
        objectImage.style.top = this.y1 + "px";


        /* For Firefox */
        $(objectImage).css("width", objectWidth);
        $(objectImage).css("height", objectHeight);
        $(objectImage).css("position", "absolute");
        $(objectImage).css("left", this.x1);
        $(objectImage).css("top", this.y1);

        if (this.pixelType === SOLID) {
            objectImage.style.background = "url('img/barrier1.jpg') " + -this.x1 + "px " + -this.y1 + "px";
        } else if (this.pixelType === GOAL) {
            objectImage.style.background = "url('img/gamebg.png') " + -this.x1 + "px " + -this.y1 + "px";
        } else if (this.pixelType === AIR) {
            objectImage.style.background = "url('img/gamebg.png') " + -this.x1 + "px " + -this.y1 + "px";
        } else if (this.pixelType === RIGHT_ANSWER) {
        	//objectImage.style.background = "url('img/gamebg.png') " + -this.x1 + "px " + -this.y1 + "px";
        	objectImage.style.backgroundColor = "rgba(0,127,255,0.5)";
        } else if (this.pixelType === WRONG) {
        	//objectImage.style.background = "url('img/gamebg.png') " + -this.x1 + "px " + -this.y1 + "px";
        	objectImage.style.backgroundColor = "rgba(0,127,255,0.5)";
        }
        document.getElementById("game_window").appendChild(objectImage);
    }
}

/**
 * Defines a rectangular barrier (a wall, or platform).
 */
class Barrier extends PhysicalObject {
    constructor(name, x1, y1, x2, y2) {
        super(name, x1, y1, x2, y2, SOLID);
    }
}

/**
 * Defines a section of air.
 */
class Air extends PhysicalObject {
    constructor(name, x1, y1, x2, y2) {
        super(name, x1, y1, x2, y2, AIR);
    }
}

/**
 * Defines a goal.
 */
class Goal extends PhysicalObject {
    constructor(name, x1, y1, x2, y2, rightAnswer) {
    	if (rightAnswer) {
    		super(name, x1, y1, x2, y2, RIGHT_ANSWER);
    	} else {
        	super(name, x1, y1, x2, y2, GOAL);
        }
    }
}

/**
 * Defines a wrong. Keeps track of a corresponding element's ID that holds the text for this wrong answer.
 */
class Wrong extends PhysicalObject {
    constructor(name, x1, y1, x2, y2, answerID) {
        super(name, x1, y1, x2, y2, WRONG);
        this._answerID = answerID;
    }

    /**
     * Returns the ID of the element holding the text for this wrong answer.
     * Used to create visual effects when a wrong answer is selected.
     */
    get answerID() {
        return this._answerID;
    }

    /**
     * Sets the ID.
     */
    set answerID(id) {
        this._answer = id;
    }
}

/**
 * Defines an extra object. This could be a question, answer, hint.
 */
class Extra {
    constructor(name, x1, y1, x2, y2, elementType, elementData) {
        this._name = name;
        this._x1 = Math.round(x1);
        this._y1 = Math.round(y1);
        this._x2 = Math.round(x2);
        this._y2 = Math.round(y2);
        this._elementType = elementType;
        this._elementData = elementData;
    }

    render() {
        let extra = document.createElement(this.elementType);
        extra.id = this.name;
        extra.className = "extra";
        extra.style.top = this.y1 + "px";
        extra.style.left = this.x1 + "px";
        extra.style.width = this.x2 - this.x1;
        extra.style.height = this.y2 - this.y1;

        if (this.elementType === "p") {
            //extra.style.fontSize = "2em";
            extra.style.fontSize = "2.5vh";
            extra.innerHTML = this.elementData;
        } else if (this.elementType === "img") {
            extra.alt = this.name;
            extra.src = this.elementData;
            // makes image square
            extra.width = this.y2 - this.y1;
            extra.height = this.y2 - this.y1;
        }
        document.getElementById("game_window").appendChild(extra);
    }

    /**
     * Returns the name.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name.
     */
    set name(name) {
        this._name = name;
    }

    /**
     * Returns the x coordinate of the top-left corner.
     */
    get x1() {
        return this._x1;
    }

    /**
     * Sets the x coordinate of the top-left corner.
     */
    set x1(x) {
        this._x1 = Math.round(x);
    }

    /**
     * Returns the y coordinate of the top-left corner.
     */
    get y1() {
        return this._y1;
    }

    /**
     * Sets the y coordinate of the top-left corner.
     */
    set y1(y) {
        this._y1 = Math.round(y);
    }

    /**
     * Returns the x coordinate of the bottom-right corner.
     */
    get x2() {
        return this._x2;
    }

    /**
     * Sets the x coordinate of the bottom-right corner.
     */
    set x2(x) {
        this._x2 = Math.round(x);
    }

    /**
     * Returns the y coordinate of the bottom-right corner.
     */
    get y2() {
        return this._y2;
    }

    /**
     * Sets the y coordinate of the bottom-right corner.
     */
    set y2(y) {
        this._y2 = y;
    }

    /**
     * Returns the element type.
     */
    get elementType() {
        return this._elementType;
    }

    /**
     * Sets the element type.
     */
    set elementType(type) {
        this._elementType = type;
    }

    /**
     * Returns the element-specific data.
     */
    get elementData() {
        return this._elementData;
    }

    /**
     * Sets the element-specific data.
     */
    set elementData(data) {
        this._elementData = data;
    }
}

/**
 * Defines the play item (i.e. the item that moves around the screen).
 */
class PlayItem {

    /**
     * Sets the starting coordinates and velocity vector, as well as the type of food.
     */
    constructor(x, y, dx, dy, size, foodItem) {
        this._x = Math.round(x);
        this._y = Math.round(y);
        this._dx = dx;
        this._dy = dy;
        this._size = size;
        this._foodItem = foodItem;
        this._isGrounded = false;
    }

    /**
     * Returns the x coordinate.
     */
    get x() {
        return this._x;
    }

    /**
     * Sets the x coordinate.
     */
    set x(x) {
        this._x = Math.round(x);
    }

    /**
     * Returns the y coordinate.
     */
    get y() {
        return this._y;
    }

    /**
     * Sets the y coordinate.
     */
    set y(y) {
        this._y = Math.round(y);
    }

    /**
     * Returns the current horizontal speed.
     */
    get dx() {
        return this._dx;
    }

    /**
     * Sets the current horizontal speed.
     * TODO - set bounds?
     */
    set dx(value) {
        this._dx = value;
    }

    /**
     * Returns the current horizontal speed.
     */
    get dy() {
        return this._dy;
    }

    /**
     * Sets the current horizontal speed.
     * TODO - set bounds?
     */
    set dy(value) {
        this._dy = value;
    }

    /**
     * Returns the size.
     */
    get size() {
        return this._size;
    }

    /**
     * Sets the size.
     */
    set size(value) {
        this._size = value;
    }

    /**
     * Returns the food item.
     */
    get foodItem() {
        return this._foodItem;
    }

    /**
     * Sets the food item.
     */
    set foodItem(value) {
        this._foodItem = value;
    }

    /**
     * Returns whether this is grounded.
     */
    get isGrounded() {
        return this._isGrounded;
    }

    /**
     * Sets whether this is grounded.
     */
    set isGrounded(isGrounded) {
        this._isGrounded = isGrounded;
    }

    /**
     * Reverses the horizontal component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDX() {
        let adjustedDX = -1 * this._foodItem.bounceMultiplier * this._dx;
        this.dx = adjustedDX;
    }

    /**
     * Reverses the vertical component of the velocity vector and applies the bounce
     * multiplier to it.
     */
    reverseDY() {
        let adjustedDY = -1 * this._foodItem.bounceMultiplier * this._dy;
        this.dy = adjustedDY;
    }

    /**
     * Moves the object based on its velocity vector and starting coordinates. Does not
     * take collisions into account.
     */
    move() {
        this._x += this._dx;
        this._y += this._dy;
    }

    /**
     * Alters the vertical component of the item's velocity vector to account for gravity.
     * Object cannot be grounded.
     */
    applyGravity() {
        if (!this._isGrounded) {
            this._dy += this._foodItem.gravity;
        }
    }

    /**
     * Responds to a mouse click. The mouse click alters the velocity of the object by
     * pushing it away from the location of the cursor.
     */
    clicked(mousePosX, mousePosY) {
        let xDiff = this._x + (this._size / 2) - mousePosX;
        let yDiff = this._y + (this._size / 2) - mousePosY;

        // used to slow movement so clicks do not shoot the object off at high speeds
        let divisor = 28;

        this._dx += Math.round(xDiff / divisor);
        this._dy += Math.round(yDiff / divisor);

        // ensures a far away click does not allow the playItem to move illegally
        this.adjustSpeed();
    }

    /**
     * Ensures that the speed never exceeds 20 in any direction. This method is called
     * before and after every move.
     */
    adjustSpeed() {
        let maxSpeed = 4;
        if (this._dy > maxSpeed) {
            this._dy = maxSpeed;
        } else if (this._dy < -1 * maxSpeed) {
            this._dy = -1 * maxSpeed;
        }
        if (this._dx > maxSpeed) {
            this._dx = maxSpeed;
        } else if (this._dx < -1 * maxSpeed) {
            this._dx = -1 * maxSpeed;
        }
    }

    /**
     * If the play item is touching the ground and its vertical speed is less than 2,
     * it becomes grounded and friction applies.
     */
    snapToGround() {
        if (this._dy < SNAP_TO_GROUND) {
            this._isGrounded = true;
            this._dy = 0;
        }
    }

    /**
     * Rounds x, y, dx, dy to the nearest integer.
     */
    round() {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        this._dx = Math.round(this._dx);
        this._dy = Math.round(this._dy);
    }
}

/**
 * Represents a type of food which can be represented by a play item.
 */
class FoodItem {

    /**
     * Sets the name and type of food, the URL of its image, and whether it is edible.
     */
    constructor(name, type, imageURL, isEdible) {
        this._name = name;
        this._type = type;
        this.bounceMultiplier = BOUNCE_MULTIPLIER; // varies by type
        this.gravity = 0.05; // varies by type
        this._imageURL = imageURL;
        this._isEdible = isEdible;
    }

    set imageURL(imageURL) {
        this._imageURL = imageURL;
    }

    /**
     * Returns the URL of the image of the food item.
     */
    get imageURL() {
        return this._imageURL;
    }
}

/**
 * Defines one individual pixel.
 */
class Pixel {

    /**
     * Initializes the type of the pixel (air or solid).
     */
    constructor(type) {
        this._type = type;
    }

    /**
     * Sets the type of the pixel (air or solid).
     */
    set type(type) {
        this._type = type;
    }

    /**
     * Returns the type of the pixel (air or solid).
     */
    get type() {
        return this._type;
    }

    /**
     * Sets the answerID of the pixel.
     */
    set answerID(id) {
        this._answerID = id;
    }

    /**
     * Returns the answerID of the pixel.
     */
    get answerID() {
        return this._answerID;
    }
}