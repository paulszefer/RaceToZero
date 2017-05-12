$(function () {

    // $("#playButton").click(function () {
    //     $(this).css("display", "none");


        /**
         * Setup
         * - create element to hold game
         * - create game object to hold level
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
         *
         */

        let gameContainer = document.createElement("div");
        gameContainer.id = "game_container";
        gameContainer.style.posititon = "relative";
        document.getElementsByClassName("contentactual")[0].appendChild(gameContainer);

        let gameWindow = document.createElement("div");
        gameWindow.id = "game_window";
        gameWindow.style.position = "absolute";
        gameWindow.style.left = 0;
        gameWindow.style.top = 0;

        let gameWrapper = gameContainer;
        let gameDiv = gameWindow;


        /** Setup. */
        // let gameWrapper = document.getElementById("gamedivwrapper");
        // let gameDivWrapper = document.getElementById("gamediv");
        //let gameDiv;
        let clock;
        let scoreDiv;
        let game = new Game();

        setup();

        function setup() {

            // create div to hold game
            gameWindow = document.createElement("div");
            gameDiv = document.createElement("div");
            gameDiv.id = "game_div";
            gameDiv.style.position = "absolute";
            gameDiv.style.left = 0;
            gameDiv.style.top = 0;
            gameWrapper.appendChild(gameDiv);

            // gameDiv = $("#game_div");
            gameDiv.style.display = "none";

            // create score display
            clock = document.createElement("p");
            clock.style.position = "absolute";
            clock.style.top = 0;
            clock.style.left = 0;

            // create score screen question display


            // create div to hold score screen
            scoreDiv = document.createElement("div");
            scoreDiv.style.display = "none";
            scoreDiv.style.position = "absolute";
            scoreDiv.style.top = 0;
            scoreDiv.style.left = 0;
            scoreDiv.style.zIndex = 10;
            scoreDiv.style.width = gameContainer.parentNode.offsetWidth + "px";
            scoreDiv.style.height = gameContainer.parentNode.offsetHeight + "px";
            scoreDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";

            // add elements to score screen;
            // TODO - add score to score screen

            gameWrapper.appendChild(scoreDiv);

        }

        /** Declare/Initialize variables. */
        let width = Math.round(gameWrapper.offsetWidth); // query from containing div TODO
        let height = Math.round(gameWrapper.offsetHeight); // query from containing div TODO
        let barrierSize = Math.round(width / 10);
        let playItemSize = Math.round(width / 10); // TODO - based on width, make playItem use this value
        let goalSize = playItemSize * 1.5;
        let score = 0;

        // TODO - move functions outside this block

        /** Declare/Initialize level data. */
        let levelID;
        let level;
        let barriers;
        let airs = [];
        let goal;
        let playItem;
        let foodItem;
        let foodImage;
        let intervalId;

        init();

        function init() {

            // set for accessibility
            levelID = game.level;

            // // TODO - override levelID
            // levelID = 0;

            // create the level using the retrieved level
            // width, height incremented by 1 to avoid ArrayOutOfBounds exceptions
            level = new Level(levelID, width + 1, height + 1g);

            // load common level data
            barriers = [
                new Barrier("top_wall", 0, 0, width, barrierSize),
                new Barrier("bottom_wall", 0, height - barrierSize, width, height),
                new Barrier("left_wall", 0, 0, barrierSize, height),
                new Barrier("right_wall", width - barrierSize, 0, width, height)
            ];

            airs = [];

            // define play area
            new Air("playArea", 0, 0, width, height).drawPhysicalObject();

            // load current level data
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
                barriers.push(
                    new Barrier("platform1", Math.round(width * 0.4), Math.round(height * 0.3), Math.round(width * 0.6), Math.round(height * 0.3) + barrierSize),
                    new Barrier("wall1", 0, Math.round(height * 0.6), Math.round(width * 0.5 - playItemSize * 0.75), height),
                    new Barrier("wall2", Math.round(width * 0.5 + playItemSize * 0.75), Math.round(height * 0.6), width, height)
                );
                goal = new Goal("goal", Math.round(width * 0.5 - playItemSize * 0.75), height - Math.round(playItemSize * 0.5), Math.round(width * 0.5 + playItemSize * 0.75), height);
                foodItem = new FoodItem("Box", "box", "img/orange.png", true);
                playItem = new PlayItem(Math.round(width / 2 - playItemSize / 2), barrierSize + 10, 0, 0, playItemSize, foodItem);
            } else if (levelID === 3) {
                barriers.push(
                    new Barrier("platform1", 0, Math.round(height * 2 / 5), Math.round(width * 2 / 5), Math.round(height * 2 / 5) + barrierSize)
                );
                goal = new Goal("goal", barrierSize, height - barrierSize, Math.round(playItemSize * 5 / 2), height);
                foodItem = new FoodItem("Box", "box", "img/orange.png", true);
                playItem = new PlayItem(Math.round(width * 2 / 5) - playItemSize, barrierSize + 10, 0, 0, playItemSize, foodItem);
            }

            // draw, then add barriers to level, then add barrier elements to game div
            for (let i = 0; i < barriers.length; i++) {
                let barrier = barriers[i];
                barrier.drawPhysicalObject();
                level.addBarrier(barrier);
                //document.getElementById("game_div").appendChild(document.getElementById(barrier.name));
            }

            // draw, then add airs to level, then add air elements to game div
            for (let i = 0; i < airs.length; i++) {
                let air = airs[i];
                air.drawPhysicalObject();
                level.addAir(air);
                // document.getElementById("game_div").appendChild(document.getElementById(air.name));
            }

            // draw, then add goal to level, then add goal element to game div
            goal.drawPhysicalObject();
            level.addGoal(goal);
            // document.getElementById("game_div").appendChild(document.getElementById(goal.name));

            level.playItem = playItem;

            let url = level.playItem.foodItem.imageURL;
            let imgElement = document.createElement("img");
            imgElement.id = "foodImage";
            imgElement.src = url;
            imgElement.width = playItemSize;
            imgElement.height = playItemSize;
            imgElement.alt = "food image";
            document.getElementById("game_div").appendChild(imgElement);

            //document.write("<img id=\"foodImage\" src=\"" + url + "\" width=\"" + playItemSize + " height=\"" + playItemSize + "\" alt=\"food image\">");
            foodImage = $("#foodImage");
            foodImage.css("position", "absolute");

            document.getElementById("game_div").appendChild(clock);

            intervalId = setInterval(move, 20);
        }

        function drawFoodItem() {
            foodImage.css("left", level.playItem.x);
            foodImage.css("top", level.playItem.y);
        }

        drawFoodItem();

        game.render();

        function move() {
            if (level.move() === 5) {
                clearInterval(intervalId);
                game.level += 1;
                if (game.level % 2 === 0) {
                    scoreDiv.style.display = "block";

                    // score element for score screen
                    let time = document.createElement("p");
                    time.innerHTML = parseTime(score);
                    time.style.color = "white";
                    // TODO - send score to database
                    time.style.fontSize = "2em";
                    scoreDiv.appendChild(time);

                    clock.parentNode.removeChild(clock);
                } else {
                    let level_elements = document.getElementById("game_div").children;
                    for (let i = level_elements.length - 1; i >= 0; i--) {
                        level_elements[i].parentNode.removeChild(level_elements[i]);
                    }
                    init();
                }
            }
            drawFoodItem();
            score += 20;
            clock.innerHTML = parseTime(score);
        }

        let clicked = false;

        function setClicked(newClicked) {
            clicked = newClicked;
        }

        $(gameContainer).click(function (e) {
            if (!clicked && score > 100) {
                let divPosX = $(this).position().left;
                let divPosY = $(this).position().top;
                let mousePosX = e.pageX - divPosX;
                let mousePosY = e.pageY - divPosY;

                playItem.clicked(mousePosX, mousePosY);
                clicked = true;
                setTimeout(setClicked, 500, false);
            }
        })
    // });
});

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