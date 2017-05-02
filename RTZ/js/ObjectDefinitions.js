/*
 * Defines a level with an ID and dimensions.
 * Also allows a PlayItem to be stored.
 */
class Level {
    constructor(id, width, height) {      
        setID(id);
        setWidth(width);
        setHeight(height);
    }
    
    /*
     * Sets the level ID if the new level ID is 0 or greater.
     */
    function setID(id) {
        if (id >= 0) {
            this._id = id;
        }   
    }
    
    function getID() {
        return this._id;
    }
    
    function setWidth(width) {
        this._width = width;
    }
    
    function getWidth() {
        return this._width;
    }
    
    function setHeight(height) {
        this._height = height;
    }
    
    function getHeight() {
        return this._height;
    }
    
    function setPlayItem(playItem) {
        this._playItem = playItem;
    }
    
    function getPlayItem() {
        return this._playItem;
    }
    
    /*
     * Changes the PlayItem if the new x and y position are within bounds.
     */
    function changePlayItem(x, y, dx, dy, foodItem) {
        if (x > 0 && x < _width
            && y > 0 && y < _height) {
                this._playItem = new PlayItem(x, y, dx, dy, foodItem);
        }
    }
}

class PlayItem {
    constructor(x, y, dx, dy, foodItem) {
        setX(x);
        setY(y);
        setDX(dx);
        setDY(dy);
        setFoodItem(foodItem);
    }
    
    function setX(x) {
        this._x = x;
    }
    
    function setY(y) {
        this._y = y;
    }
    
    function setDX(dx) {
        this._dx = dx;
    }
    
    function setDY(dy) {
        this._dy = dy;
    }
    
    function setFoodItem(foodItem) {
        this._foodItem = foodItem;
    }
}

class FoodItem {
    constructor(name, type, imageURL, isEdible) {
        this._name = name;
        this._type = type;
        this._imageURL = imageURL;
        this._isEdible = isEdible;
    }
}