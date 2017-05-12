/**
 * The engine that runs the game.
 *
 * Sets up the required HTML elements to hold and display the game.
 * Initializes the game objects required to store the game's state
 * to display the game and to handle collisions.
 *
 * Runs after the HTML document is fully loaded.
 *
 * Flow:
 *
 * Setup
 * - create div element to contain game window
 * - create div element to contain game objects
 * - create p element to display the timer
 * - create div element to display end of level score overlay
 * - create game object to store game state
 *
 * Level Initialization
 * - create level object to hold level data/handle collisions
 * - create foodItem object
 * - create playItem object to handle player position/movement
 * - add level data to level object
 * - create additional required elements (text, graphics, Q/A)
 * - add ^ to game object
 * - start game timer
 *
 * TODO - Transfer all game element styling to game.css
 */
$(function () {

    /**
     * Begins the game once the play button is clicked.
     *
     * @Unused game starts on page launch
     */
    // $("#playButton").click(function () {
    //     $(this).css("display", "none");

    /**
     * Variable declaration for scope.
     */
    let gameContainer;
    let gameWindow;
    let timer;
    let scoreOverlay;
    let game;

    setup();

    /**
     * Sets up the required HTML elements to display the game
     * and the game object to store game data.
     */
    function setup() {

        /**
         * Creates the element that contains the game window.
         */
        gameContainer = document.createElement("div");
        gameContainer.id = "game_container";
        gameContainer.style.posititon = "relative";

        // .contentactual is the div that holds the content on each page
        // TODO - change .contentactual to #contentactual
        document.getElementsByClassName("contentactual")[0].appendChild(gameContainer);

        /**
         * Creates the element that contains the game objects.
         */
        gameWindow = document.createElement("div");
        gameWindow.id = "game_window";
        gameWindow.style.display = "none";
        gameWindow.style.position = "absolute";
        gameWindow.style.left = 0;
        gameWindow.style.top = 0;
        gameContainer.appendChild(gameWindow);

        /**
         * Creates the element that displays the timer(the user's score).
         * TODO - currently hidden, changing z-index should fix it
         */
        timer = document.createElement("p");
        timer.id = "timer";
        timer.style.position = "absolute";
        timer.style.top = 0;
        timer.style.left = 0;
        gameWindow.appendChild(timer);

        /**
         * Creates the element that stores the end of level score overlay.
         * TODO - Add all information to overlay
         * TODO - Style overlay with CSS
         */
        scoreOverlay = document.createElement("div");
        scoreOverlay.id = "score_overlay";
        scoreOverlay.style.display = "none";
        scoreOverlay.style.position = "absolute";
        scoreOverlay.style.top = 0;
        scoreOverlay.style.left = 0;
        scoreOverlay.style.width = gameContainer.parentNode.offsetWidth + "px";
        scoreOverlay.style.height = gameContainer.parentNode.offsetHeight + "px";
        scoreOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        gameContainer.appendChild(scoreOverlay);

        /**
         * Creates the game object to store the game's state.
         */
        game = new Game();

    }

    /** Declare/Initialize game variables. */
    let width = gameContainer.parentNode.offsetWidth;
    let height = gameContainer.parentNode.offsetHeight;
    let barrierSize = Math.round(width / 10);
    let playItemSize = Math.round(width / 10); // TODO - make playItem use this value
    let goalSize = playItemSize * 1.5;
    let score = 0;

    /** Declare/Initialize level data. */
    let levelID;
    let level;
    let barriers;
    let airs;
    let goal;
    let playItem;
    let foodItem;
    let foodImage;
    let intervalId;

    init();

    /**
     * Loads level data and displays the appropriate level. Initializes the timer
     * to run the game.
     */
    function init() {

        // the current level - the level to load
        levelID = game.level;

        // create the level using the retrieved level
        // width, height incremented by 1 to avoid ArrayOutOfBounds exceptions
        // TODO - find more elegant solution than incrementing by 1
        // TODO - because it creates an extra column of pixels when it displays
        level = new Level(levelID, width + 1, height + 1);

        /**
         * Loads the data common to all levels.
         */
        barriers = [
            new Barrier("top_wall", 0, 0, width, barrierSize),
            new Barrier("bottom_wall", 0, height - barrierSize, width, height),
            new Barrier("left_wall", 0, 0, barrierSize, height),
            new Barrier("right_wall", width - barrierSize, 0, width, height)
        ];

        airs = [];

        /**
         * Defines the play area and fills the background with the appropriate colour.
         */
        new Air("playArea", 0, 0, width, height).drawPhysicalObject();

        /**
         * Load data for the current level.
         */
        if (levelID === 0) {
            barriers.push(
                new Barrier("platform1", 0, Math.round(height * 0.4), Math.round(width * 0.4), Math.round(height * 0.4) + barrierSize)
            );
            airs.push(
                new Air("air1", barrierSize, height - Math.round(playItemSize), goalSize + barrierSize, height)
            );
            goal = new Goal("goal", barrierSize, height - Math.round(playItemSize * 0.5), goalSize + barrierSize, height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.4) - playItemSize, barrierSize + 10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 1) {
            // TODO - remove row of white pixels at the bottom
            barriers.push(
                new Barrier("platform1", 0, Math.round(height * 0.4), Math.round(width * 0.4), Math.round(height * 0.4) + barrierSize),
                new Barrier("platform2", 0, height - playItemSize * 2, Math.round(width * 0.2), height - playItemSize),
                new Barrier("platform3", Math.round(width * 0.35), height - playItemSize * 2, Math.round(width * 0.65), height - playItemSize),
                new Barrier("platform4", Math.round(width * 0.8), height - playItemSize * 2, width, height - playItemSize)
            );
            goal = new Goal("goal", Math.round(width * 0.65), height - playItemSize * 1.5, Math.round(width * 0.8), height - playItemSize);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.4) - playItemSize, barrierSize + 10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 2) {
            // TODO - add correct level data
            barriers.push(
                new Barrier("platform1", Math.round(width * 0.4), Math.round(height * 0.3), Math.round(width * 0.6), Math.round(height * 0.3) + barrierSize),
                new Barrier("wall1", 0, Math.round(height * 0.6), Math.round(width * 0.5 - playItemSize * 0.75), height),
                new Barrier("wall2", Math.round(width * 0.5 + playItemSize * 0.75), Math.round(height * 0.6), width, height)
            );
            goal = new Goal("goal", Math.round(width * 0.5 - playItemSize * 0.75), height - Math.round(playItemSize * 0.5), Math.round(width * 0.5 + playItemSize * 0.75), height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width / 2 - playItemSize / 2), barrierSize + 10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 3) {
            // TODO - add correct level data
            barriers.push(
                new Barrier("platform1", 0, Math.round(height * 2 / 5), Math.round(width * 2 / 5), Math.round(height * 2 / 5) + barrierSize)
            );
            goal = new Goal("goal", barrierSize, height - barrierSize, Math.round(playItemSize * 5 / 2), height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 2 / 5) - playItemSize, barrierSize + 10, 0, 0, playItemSize, foodItem);
        }

        /**
         * Displays the barriers, then adds the barriers to the level object.
         */
        for (let i = 0; i < barriers.length; i++) {
            barriers[i].drawPhysicalObject();
            level.addBarrier(barriers[i]);
        }

        /**
         * Displays the airs, then adds the airs to the level object.
         */
        for (let i = 0; i < airs.length; i++) {
            airs[i].drawPhysicalObject();
            level.addAir(airs[i]);
        }

        /**
         * Displays the goal, then adds the goal to the level object.
         */
        goal.drawPhysicalObject();
        level.addGoal(goal);

        /**
         * Adds the play item to the level object.
         */
        level.playItem = playItem;

        /**
         * Creates the img element to display the play item, then adds it to the game window.
         */
        let url = level.playItem.foodItem.imageURL;
        let imgElement = document.createElement("img");
        imgElement.id = "food_image";
        imgElement.src = url;
        imgElement.width = playItemSize;
        imgElement.height = playItemSize;
        imgElement.alt = "food image";
        document.getElementById("game_window").appendChild(imgElement);

        foodImage = $("#food_image");
        foodImage.css("position", "absolute");

        /**
         * Initializes the timer that handles game ticks.
         */
        intervalId = setInterval(move, 20);
    }

    /**
     * Redraws the food item in the correct place by changing css positioning.
     */
    function drawFoodItem() {
        foodImage.css("left", level.playItem.x);
        foodImage.css("top", level.playItem.y);
    }

    drawFoodItem();

    /**
     * Shows the currently hidden div that holds the game.
     */
    game.render();

    /**
     * Moves the object.
     */
    function move() {
        // occurs when there is a collision with the goal i.e. level is complete
        // TODO - move to separate function
        if (level.move() === 5) {
            clearInterval(intervalId);
            game.level += 1;
            if (game.level % 2 === 0) {
                scoreOverlay.style.display = "block";

                // score element for score screen
                let time = document.createElement("p");
                time.innerHTML = parseTime(score);
                time.style.color = "white";
                // TODO - send score to database
                let actualLevel = game.level / 2;
                let scoreInSeconds = Math.floor(score / 1000);
                scoreInSeconds = scoreInSeconds + (Math.floor((score - (scoreInSeconds * 1000)) / 100) / 10);
                $.post("accessdb.php", {
                    function: "saveGame",
                    level: actualLevel,
                    time: scoreInSeconds
                }, function (data) {
                    //alert(data);
                });
                time.style.fontSize = "2em";
                scoreOverlay.appendChild(time);

                timer.parentNode.removeChild(timer);
            } else {
                let level_elements = document.getElementById("game_window").children;
                for (let i = level_elements.length - 1; i >= 0; i--) {
                    level_elements[i].parentNode.removeChild(level_elements[i]);
                }
                init();
            }
        }
        drawFoodItem();
        // game timer runs every 20ms, so score should increment by 20
        score += 20;
        // update score display (timer)
        timer.innerHTML = parseTime(score);
    }

    // TODO - redundant? is it not false by default?
    let clicked = false;

    /**
     * Sets the clicked variable. Used to implement a delay between inputs.
     */
    function setClicked(newClicked) {
        clicked = newClicked;
    }

    /**
     * Adds a click handler to the game container that handles clicks within the game.
     */
    $(gameContainer).click(function (e) {
        // prevents initial input
        // TODO - remove "if statement" if play button is not used because it is unnecessary
        if (!clicked && score > 100) {
            let divPosX = $(this).position().left;
            let divPosY = $(this).position().top;
            let mousePosX = e.pageX - divPosX;
            let mousePosY = e.pageY - divPosY;

            // implements a delay between inputs
            playItem.clicked(mousePosX, mousePosY);
            clicked = true;
            setTimeout(setClicked, 500, false);
        }
    })
    // });
});

/**
 * Parses the score to display it.
 */
function parseTime(ms) {
    let hours = Math.floor(ms / 1000 / 60 / 60);
    let minutes = Math.floor(ms / 1000 / 60 - hours * 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60 - hours * 60 * 60);
    let milliseconds = ms - seconds * 1000 - minutes * 1000 * 60 - hours * 1000 * 60 * 60;

    let strH = ""; // hours === 0 ? "0:" : hours + ":";
    let strM = minutes === 0 ? "0:" : minutes + ":";
    let strS = seconds === 0 ? "0:" : seconds + ":";
    let strMS = ("" + milliseconds).substr(0, 1);

    return strH + strM + strS + strMS;
}