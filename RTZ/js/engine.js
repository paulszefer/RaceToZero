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
 * TODO - Transfer all game element styling to game.css - in progress
 * TODO - extras should have a class to style z-index
 * TODO - before moving, should be Math.floor(), not Math.round()
 */
$(function () {

    /**
     * Variable declaration for scope.
     */
    let gameContainer;
    let gameWindow;
    let timer;
    let scoreOverlay;
    let game;
    const NUMBER_OF_LEVELS = 5;

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
        gameContainer.className = "unselectable";

        // .contentactual is the div that holds the content on each page
        // TODO - change .contentactual to #contentactual
        document.getElementsByClassName("contentactual")[0].appendChild(gameContainer);

        /**
         * Creates the element that contains the game objects.
         */
        gameWindow = document.createElement("div");
        gameWindow.id = "game_window";
        gameContainer.appendChild(gameWindow);

        /**
         * Creates the element that displays the timer(the user's score).
         */
        timer = document.createElement("p");
        timer.id = "timer";
        gameContainer.appendChild(timer);

        /**
         * Creates the element that stores the end of level score overlay.
         */
        scoreOverlay = document.createElement("div");
        scoreOverlay.id = "score_overlay";
        scoreOverlay.style.width = gameContainer.parentNode.offsetWidth + "px";
        scoreOverlay.style.height = gameContainer.parentNode.offsetHeight + "px";
        gameContainer.appendChild(scoreOverlay);

        /**
         * Creates the game object to store the game's state.
         */
        game = new Game();

    }

    /** Declare/Initialize game variables. */
    let width = gameContainer.offsetWidth;
    let height = gameContainer.offsetHeight;
    let barrierWidth = Math.max(Math.round(width / 20), 30);
    let barrierHeight = Math.max(Math.round(height / 20), 30);
    let playItemSize = Math.max(Math.round(width / 20), 32);
    let goalSize = playItemSize * 3;
    let score = 0;

    /** Declare/Initialize level data. */
    let levelID;
    let level;
    let barriers;
    let airs;
    let extras;
    let wrongs;
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
            new Barrier("top_wall", 0, 0, width, barrierHeight),
            new Barrier("bottom_wall", 0, height - barrierHeight, width, height),
            new Barrier("left_wall", 0, 0, barrierWidth, height),
            new Barrier("right_wall", width - barrierWidth, 0, width, height)
        ];

        airs = [];

        extras = [];

        wrongs = [];

        //levelID = -1;

        /**
         * Load data for the current level.
         */
        if (levelID === -2) {
            // TODO - unused because play button creates extra click, and other reasons
            // initial screen with play button
            let playButton = document.createElement("div");
            playButton.id = "play_button";
            gameWindow.appendChild(playButton);

            $(playButton).click(function() {
                let gameXDisplacement = $(window).width() * 0.5;
                let gameYDisplacement = $(window).height() * 0.5;
                window.scrollTo(gameXDisplacement, gameYDisplacement);
                game.level = -1;
                reInit();
            })
        } else if (levelID === -1) {
            // level select screen
            let levelSelect = document.createElement("div");
            levelSelect.id = "level_select";

            let level;
            for (let i = 0; i < NUMBER_OF_LEVELS; i++) {
                level = document.createElement("div");
                level.id = "level_" + i;
                level.className = "level_select_button";
                if (i === 0) {
                    level.innerHTML = "Tutorial";
                } else {
                    level.innerHTML = "Level " + i;
                }
                level.onclick = function () {
                    game.level = i * 2;
                    let gameContainerOffset = $(gameContainer).offset();
                    window.scrollTo(gameContainerOffset.left, gameContainerOffset.top);
                    reInit();
                };
                levelSelect.appendChild(level);
            }
            gameWindow.appendChild(levelSelect);
        } else if (levelID === 0) {
            // Tutorial Level Game Stage
            barriers.push(
                new Barrier("platform1", 0, height * 0.45, width * 0.45, height * 0.45 + Math.max(barrierHeight, playItemSize))//,
                //new Barrier("forsandbox", 0, height * 0.9, width, height)
            );
            extras.push(
                new Extra("hint_tap_here", width * 0.15, height * 0.3, 0, 0, "p", "Tap here"),
                new Extra("tap_image", width * 0.15, height * 0.35, width * 0.2, height * 0.4, "img", "img/tapimage.png"),
                new Extra("arrow", width * 0.15, height * 0.8, width * 0.2, height * 0.85, "img", "img/arrow.png")
            );
            goal = new Goal("goal", barrierWidth, height - barrierHeight, goalSize + barrierWidth, height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(width * 0.4 - playItemSize, height * 0.2, 0, 0, playItemSize, foodItem);
            //playItem = new PlayItem(barrierSize + 5, height - barrierSize - 5, 0, 0, playItemSize, foodItem);
            //x=107 y=365.5
        } else if (levelID === 1) {
            // Tutorial Level Question Stage
            // TODO - remove row of white pixels at the bottom
            //let question1 = "How much of the food produced";
            //let question2 = "around the world is wasted?";
            let question = "How much of the food produced around the world is wasted?";
            let answer1 = "One half";
            let answer2 = "One third";
            barriers.push(
                new Barrier("platform1", 0, height * 0.45, width * 0.4, height * 0.45 + Math.max(barrierHeight, playItemSize)),
                new Barrier("ground1", 0, height - barrierHeight * 4, width * 0.25, height),
                new Barrier("ground2", width * 0.4, height - barrierHeight * 4, width * 0.6, height),
                new Barrier("ground3", width * 0.75, height - barrierHeight * 4, width, height),
                new Barrier("floor1", width * 0.25, height * 0.9, width * 0.4, height - barrierHeight),
                new Barrier("floor2", width * 0.6, height * 0.9, width * 0.75, height - barrierHeight)
            );
            extras.push(
                //new Extra("question1", Math.round(width * 0.3), Math.round(height * 0.25), 0, 0, "p", question1),
                //new Extra("question2", Math.round(width * 0.3), Math.round(height * 0.30), 0, 0, "p", question2),
                new Extra("tutorialquestion", Math.round(width * 0.25), Math.round(height * 0.30), 0, 0, "p", question),
                new Extra("tutorialanswer1", Math.round(width * 0.25), Math.round(height * 0.75), 0, 0, "p", answer1),
                new Extra("tutorialanswer2", Math.round(width * 0.6), Math.round(height * 0.75), 0, 0, "p", answer2)
            );
            wrongs.push(
                new Wrong("wrong1", width * 0.25, height * 0.85, width * 0.4, height * 0.9, "tutorialanswer1")
            );
            scoreOverlay.innerHTML = "<p class='statement'><span class='answer'>One third</span> of the food produced around the world is wasted.</p>";
            goal = new Goal("goal", width * 0.6, height * 0.85, width * 0.75, height * 0.9);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(width * 0.1, Math.max(height * 0.1, barrierHeight + 5), 0, 0, playItemSize, foodItem);
            //playItem = new PlayItem(188, 621, -7, 8, playItemSize, foodItem);
        } else if (levelID === 2) {
            // Level 1 Game Stage (platform)
            // TODO - add correct level data
            barriers.push(
                new Barrier("platform1", Math.round(width * 0.4), Math.round(height * 0.3), Math.round(width * 0.6), height * 0.3 + Math.max(barrierHeight, playItemSize)),
                new Barrier("wall1", 0, Math.round(height * 0.6), Math.round(width * 0.5 - playItemSize * 0.75), height),
                new Barrier("wall2", Math.round(width * 0.5 + playItemSize * 0.75), Math.round(height * 0.6), width, height)
            );
            //goal = new Goal("goal", Math.round(width * 0.5 - playItemSize * 0.75), height - Math.round(playItemSize * 0.5), Math.round(width * 0.5 + playItemSize * 0.75), height);
            goal = new Goal("goal", Math.round(width * 0.5 - playItemSize * 0.75), height - barrierHeight, Math.round(width * 0.5 + playItemSize * 0.75), height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width / 2 - playItemSize / 2), Math.max(height * 0.1, barrierHeight + 5), 0, 0, playItemSize, foodItem);
        } else if (levelID === 3) {
            // Level 1 Question Stage
            //let question1 = "How much money does a typical";
            //let question2 = "household in Vancouver lose per year";
            //let question3 = "due to food waste?";
            let question = "How much money does a typical household in Vancouver lose per year due to food waste?";
            let answer1 = "$200";
            let answer2 = "$700";
            let answer3 = "$1200";
            let answer4 = "$2100";
            barriers.push(
                new Barrier("platform1", Math.round(width * 0.4), Math.round(height * 0.3), Math.round(width * 0.6), Math.round(height * 0.3) + Math.max(barrierHeight, playItemSize)),
                new Barrier("barrier1", Math.round(width * 0.20), Math.round(height * 0.75), Math.max(width * 0.30, width * 0.20 + playItemSize), Math.round(height * 0.95)),
                new Barrier("barrier2", Math.round(width * 0.45), Math.round(height * 0.75), Math.max(width * 0.55, width * 0.45 + playItemSize), Math.round(height * 0.95)),
                new Barrier("barrier3", Math.min(width * 0.70, width * 0.80 - playItemSize), Math.round(height * 0.75), Math.round(width * 0.80), Math.round(height * 0.95)),
                new Barrier("floor", 0, height * 0.90, width, height - barrierHeight)
            );
            extras.push(
                //new Extra("question1", Math.round(width * 0.25), Math.round(height * 0.40), 0, 0, "p", question1),
                //new Extra("question2", Math.round(width * 0.22), Math.round(height * 0.45), 0, 0, "p", question2),
                //new Extra("question3", Math.round(width * 0.35), Math.round(height * 0.50), 0, 0, "p", question3),
                new Extra("lvl1question", Math.round(width * 0.25), Math.round(height * 0.40), 0, 0, "p", question),
                new Extra("lvl1answer1", barrierWidth, Math.round(height * 0.75), 0, 0, "p", answer1),
                new Extra("lvl1answer2", Math.max(width * 0.30, width * 0.20 + playItemSize), Math.round(height * 0.75), 0, 0, "p", answer2),
                new Extra("lvl1answer3", Math.max(width * 0.55, width * 0.45 + playItemSize), Math.round(height * 0.75), 0, 0, "p", answer3),
                new Extra("lvl1answer4", Math.round(width * 0.80), Math.round(height * 0.75), 0, 0, "p", answer4)
            );
            wrongs.push(
                //new Wrong("wrong1", width * 0.25, height * 0.85, width * 0.4, height * 0.9, "answer1"),
                //new Wrong("wrong2", width * 0.25, height * 0.85, width * 0.4, height * 0.9, "answer1"),
                //new Wrong("wrong3", width * 0.25, height * 0.85, width * 0.4, height * 0.9, "answer1")
                new Wrong("lvl1wrong1", barrierWidth, height * 0.85, width * 0.20, height * 0.9, "lvl1answer1"),
                new Wrong("lvl1wrong3", Math.max(width * 0.55, width * 0.45 + playItemSize), height * 0.85, Math.min(width * 0.70, width * 0.80 - playItemSize), height * 0.9, "lvl1answer3"),
                new Wrong("lvl1wrong4", Math.round(width * 0.80), height * 0.85, width - barrierWidth, height * 0.9, "lvl1answer4")                
            );
            scoreOverlay.innerHTML = "<p class='statement'>The average Vancouver household loses <span class=\"answer\">$700</span> due to food waste every single year!</p>";
            goal = new Goal("goal", Math.max(width * 0.30, width * 0.20 + playItemSize), height * 0.85, width * 0.45, height * 0.9);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width / 2 - playItemSize / 2), barrierHeight + 10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 4) {
            // Level 2 Game Stage (staircase)
            barriers.push(
                new Barrier("step0", Math.round(width * 0.05), Math.round(height * 0.80), Math.round(width * 0.80), Math.round(height)),
                new Barrier("step1", Math.round(width * 0.20), Math.round(height * 0.65), Math.round(width * 0.80), Math.round(height * 0.95)),
                new Barrier("step2", Math.round(width * 0.35), Math.round(height * 0.50), Math.round(width * 0.80), Math.round(height * 0.75)),
                new Barrier("step3", Math.round(width * 0.50), Math.round(height * 0.35), Math.round(width * 0.80), Math.round(height * 0.60)),
                new Barrier("step4", Math.min(width * 0.65, width * 0.80 - playItemSize), Math.round(height * 0.20), Math.round(width * 0.80), Math.round(height * 0.45))
            );
            goal = new Goal("goal", Math.round(width * 0.80), Math.round(height - barrierHeight), Math.round(width - barrierWidth), height);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.10), Math.round(height * 0.30), 0, 0, playItemSize, foodItem);
        } else if (levelID === 5) {
            // Level 2 Question Stage
            //let question1 = "Which of these foods have gone";
            //let question2 = "bad if you've found";
            //let question3 = "mould on them?";
            let question = "Which of these foods have gone bad if you've found mould on them?";
            //let answer1a = "Meat &";
            //let answer1b = "Dairy";
            let answerMeat = "Meat & Dairy";
            let answerBread = "Bread";
            //let answer3a = "Fruits &";
            //let answer3b = "Veggies";
            let answerFruits = "Fruits & Veggies";
            //let answer4a = "All of";
            //let answer4b = "these";
            let answerAll = "All of these";
            barriers.push(
                new Barrier("platform1", Math.round(width * 0.75), Math.round(height * 0.20), Math.max(width * 0.95, width * 0.75 + playItemSize), Math.round(height * 0.30)),
                new Barrier("platform2", Math.max(width * 0.30, width * 0.20 + playItemSize) - 1, Math.round(height * 0.30), Math.max(width * 0.45, width * 0.30 + playItemSize), Math.round(height * 0.35)),
                new Barrier("platform3", Math.round(width * 0.55), Math.round(height * 0.50), Math.max(width * 0.70, width * 0.55 + playItemSize), Math.round(height * 0.55)),
                new Barrier("platform4", Math.max(width * 0.30, width * 0.20 + playItemSize) - 1, Math.round(height * 0.80), Math.max(width * 0.45, width * 0.30 + playItemSize), Math.round(height * 0.85)),
                new Barrier("barrier1", Math.round(width * 0.20), Math.round(height * 0.25), Math.max(width * 0.30, width * 0.20 + playItemSize), Math.round(height * 0.55)),
                new Barrier("barrier2", Math.round(width * 0.05), Math.round(height * 0.45), Math.round(width * 0.20), Math.round(height * 0.55)),
                new Barrier("barrier3", Math.min(width * 0.70, width * 0.80 - playItemSize), Math.round(height * 0.40), Math.round(width * 0.80), Math.round(height * 0.60)),
                new Barrier("barrier4", Math.round(width * 0.80), Math.round(height * 0.50), Math.round(width * 0.95), Math.round(height * 0.60)),
                new Barrier("barrier5", Math.round(width * 0.20), Math.round(height * 0.75), Math.max(width * 0.30, width * 0.20 + playItemSize), Math.round(height * 0.95)),
                new Barrier("barrier6", Math.min(width * 0.70, width * 0.80 - playItemSize), Math.round(height * 0.75), Math.round(width * 0.80), Math.round(height * 0.95)),
                new Barrier("floor", 0, height * 0.9, width, height)
            );
            extras.push(
                //new Extra("question1", Math.round(width * 0.25), Math.round(height * 0.10), 0, 0, "p", question1),
                //new Extra("question2", Math.round(width * 0.33), Math.round(height * 0.15), 0, 0, "p", question2),
                //new Extra("question3", Math.round(width * 0.36), Math.round(height * 0.20), 0, 0, "p", question3),
                new Extra("lvl2question", Math.round(width * 0.25), Math.round(height * 0.10), 0, 0, "p", question),
                //new Extra("answer1a", Math.round(width * 0.07), Math.round(height * 0.20), 0, 0, "p", answer1a),
                //new Extra("answer1b", Math.round(width * 0.08), Math.round(height * 0.25), 0, 0, "p", answer1b),
                new Extra("lvl2answerMeat", barrierWidth, Math.round(height * 0.35), 0, 0, "p", answerMeat),
                new Extra("lvl2answerBread", barrierWidth, Math.round(height * 0.83), 0, 0, "p", answerBread),
                //new Extra("answer3a", Math.round(width * 0.81), Math.round(height * 0.40), 0, 0, "p", answer3a),
                //new Extra("answer3b", Math.round(width * 0.81), Math.round(height * 0.45), 0, 0, "p", answer3b),
                new Extra("lvl2answerFruits", width * 0.80, Math.round(height * 0.40), 0, 0, "p", answerFruits),
                //new Extra("answer4a", Math.round(width * 0.83), Math.round(height * 0.75), 0, 0, "p", answer4a),
                //new Extra("answer4b", Math.round(width * 0.83), Math.round(height * 0.80), 0, 0, "p", answer4b)
                new Extra("lvl2answerAll", width * 0.80, Math.round(height * 0.80), 0, 0, "p", answerAll)
            );
            wrongs.push(
                new Wrong("lvl2wrongMeat", barrierWidth, height * 0.35, Math.round(width * 0.20), height * 0.45, "lvl2answerMeat"),
                new Wrong("lvl2wrongBread", barrierWidth, height * 0.80, Math.round(width * 0.20), height * 0.90, "lvl2answerBread"),
                new Wrong("lvl2wrongFruits", width * 0.80, height * 0.45, width - barrierWidth, Math.round(height * 0.50), "lvl2answerFruits")                
            );
            scoreOverlay.innerHTML = "<p class='statement'>If you've found mould on <span class=\"answer\">any</span> kind of food, it's gone bad!</p>";
            goal = new Goal("goal", width * 0.80, height * 0.85, width - barrierWidth, height * 0.9);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            //playItem = new PlayItem(Math.round(width * 0.85), Math.round(height * 0.10), 0, 0, playItemSize, foodItem);
            playItem = new PlayItem(Math.round(width - Math.max(width * 0.15, barrierWidth + playItemSize + 2)), Math.round(height * 0.10), 0, 0, playItemSize, foodItem);
        } else if (levelID === 6) {
            // Level 3 Game Stage (obstacles)
            let blocks1 = width * 0.50;
            let blocks2 = blocks1 + Math.max(width * 0.05, playItemSize);
            let blocks3 = blocks2 + Math.max(width * 0.05, playItemSize);
            let blocks4 = blocks3 + Math.max(width * 0.10, playItemSize + 10);
            let blocks5 = blocks4 + Math.max(width * 0.05, playItemSize);
            let blocks6 = blocks5 + Math.max(width * 0.05, playItemSize);
            barriers.push(
                new Barrier("platform1", Math.round(width * 0.05), Math.round(height * 0.30), Math.round(width * 0.80), Math.round(height * 0.45)),
                new Barrier("platform2", Math.round(width * 0.25), Math.round(height * 0.65), Math.round(width * 0.95), Math.round(height * 0.80)),
                new Barrier("floor", Math.round(width * 0.05), Math.round(height * 0.90), Math.round(width * 0.80), Math.round(height * 0.95)),
                new Barrier("barrier1", Math.min(width * 0.20, width * 0.30 - playItemSize), Math.round(height * 0.05), Math.round(width * 0.30), Math.round(height * 0.20)),
                new Barrier("barrier2", Math.round(width * 0.40), Math.round(height * 0.15), Math.max(width * 0.50, width * 0.40 + playItemSize), Math.round(height * 0.30)),
                new Barrier("barrier3", Math.round(width * 0.60), Math.round(height * 0.05), Math.max(width * 0.70, width * 0.60 + playItemSize), Math.round(height * 0.18)),
                new Barrier("barrier4", Math.round(width * 0.80), Math.round(height * 0.05), Math.max(width * 0.87, width * 0.80 + playItemSize), Math.round(height * 0.15)),
                new Barrier("lip", Math.round(width * 0.75), Math.round(height * 0.28), Math.min(width * 0.85, width - barrierWidth - playItemSize - 5), Math.round(height * 0.40)),
                new Barrier("barrier6", Math.min(width * 0.30, width * 0.40 - playItemSize), Math.round(height * 0.45), Math.round(width * 0.40), Math.round(height * 0.55)),
                new Barrier("barrier7", Math.round(width * 0.05), Math.min(height * 0.53, height * 0.60 - playItemSize), Math.round(width * 0.15), Math.round(height * 0.60)),
                new Barrier("barrier8", blocks2, Math.round(height * 0.55), blocks3, Math.round(height * 0.65)),
                new Barrier("barrier9", blocks4, Math.round(height * 0.55), blocks5, Math.round(height * 0.65)),
                new Barrier("barrier10", blocks1, Math.round(height * 0.60), blocks2, Math.round(height * 0.65)),
                new Barrier("barrier11", blocks5, Math.round(height * 0.60), blocks6, Math.round(height * 0.65))
            );
            goal = new Goal("goal", Math.round(width * 0.80), Math.round(height - barrierHeight), Math.min(width * 0.95, width - barrierWidth), Math.round(height * 1.00));
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.10), Math.round(height * 0.10), 0, 0, playItemSize, foodItem);
        } else if (levelID === 7) {
            // Level 3 Question Stage
            //let question1 = "What's a good way to make";
            //let question2 = "stale chips taste good again?";
            let question = "What's a good way to make stale chips taste good again?";
            let answerRefrigerate = "Refrigerate them";
            let answerToast = "Toast them";
            let answerSoak = "Soak them in water";
            //let answer4a = "Break them into";
            //let answer4b = "smaller pieces";
            let answerBreak = "Break them into smaller pieces";
            barriers.push(
                new Barrier("mainwall", Math.round(width * 0.70), Math.round(height * 0.05), Math.max(width * 0.80, width * 0.70 + playItemSize), Math.round(height * 0.80)),
                new Barrier("floor", 0, Math.round(height * 0.90), Math.round(width * 0.95), Math.round(height * 0.95)),
                new Barrier("platform1", Math.round(width * 0.05), Math.round(height * 0.20), Math.round(width * 0.30), Math.round(height * 0.30)),
                new Barrier("platform2", Math.round(width * 0.05), Math.round(height * 0.45), Math.round(width * 0.30), Math.round(height * 0.55)),
                new Barrier("platform3", Math.round(width * 0.05), Math.round(height * 0.70), Math.round(width * 0.30), Math.round(height * 0.80)),
                new Barrier("ledge4", Math.round(width * 0.60), Math.min(height * 0.35, height * 0.40 - playItemSize), Math.round(width * 0.70), Math.round(height * 0.40)),
                new Barrier("ledge5", Math.round(width * 0.60), Math.min(height * 0.60, height * 0.65 - playItemSize), Math.round(width * 0.70), Math.round(height * 0.65)),
                new Barrier("floating1", Math.min(width * 0.40, width * 0.49 - playItemSize), Math.min(height * 0.20, height * 0.25 - playItemSize), Math.round(width * 0.49), Math.round(height * 0.25)),
                new Barrier("floating2", Math.min(width * 0.40, width * 0.49 - playItemSize), Math.min(height * 0.45, height * 0.50 - playItemSize), Math.round(width * 0.49), Math.round(height * 0.50)),
                new Barrier("floating3", Math.min(width * 0.40, width * 0.49 - playItemSize), Math.min(height * 0.75, height * 0.80 - playItemSize), Math.round(width * 0.49), Math.round(height * 0.80))
            );
            extras.push(
                //new Extra("question1", Math.round(width * 0.49), Math.round(height * 0.80), 0, 0, "p", question1),
                //new Extra("question2", Math.round(width * 0.49), Math.round(height * 0.85), 0, 0, "p", question2),
                new Extra("lvl3question", Math.min(width * 0.40, width * 0.49 - playItemSize), Math.round(height * 0.81), 0, 0, "p", question),
                new Extra("lvl3answerRefrigerate", barrierWidth, Math.round(height * 0.10), 0, 0, "p", answerRefrigerate),
                new Extra("lvl3answerToast", barrierWidth, Math.round(height * 0.35), 0, 0, "p", answerToast),
                new Extra("lvl3answerSoak", barrierWidth, Math.round(height * 0.60), 0, 0, "p", answerSoak),
                //new Extra("answer4a", Math.round(width * 0.07), Math.round(height * 0.83), 0, 0, "p", answer4a),
                //new Extra("answer4b", Math.round(width * 0.07), Math.round(height * 0.88), 0, 0, "p", answer4b)
                new Extra("lvl3answerBreak", barrierWidth, Math.round(height * 0.81), 0, 0, "p", answerBreak)
            );
            wrongs.push(
                new Wrong("lvl3wrongRefrigerate", barrierWidth, barrierHeight, Math.round(width * 0.20), Math.round(height * 0.20), "lvl3answerRefrigerate"),
                new Wrong("lvl3wrongSoak", barrierWidth, Math.round(height * 0.55), Math.round(width * 0.20), Math.round(height * 0.70), "lvl3answerSoak"),
                new Wrong("lvl3wrongBreak", barrierWidth, Math.round(height * 0.80), Math.round(width * 0.20), Math.round(height * 0.90), "lvl3answerBreak")                
            );
            scoreOverlay.innerHTML = "<p class='statement'>To make stale chips taste good again, just <span class=\"answer\">toast them!</span></p>";
            goal = new Goal("goal", width * 0.05, height * 0.30, width * 0.20, height * 0.45);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.85), Math.round(height * 0.10), 0, 0, playItemSize, foodItem);
        } else if (levelID === 8) {
            // Level 4 Game Stage (maze)
            barriers.push(
                new Barrier("floor", Math.round(width * 0.20), Math.round(height * 0.90), Math.round(width * 0.95), Math.round(height * 0.95)),
                new Barrier("innerbox1", Math.round(width * 0.35), Math.round(height * 0.40), Math.round(width * 0.45), Math.round(height * 0.45)),
                new Barrier("innerbox2", Math.round(width * 0.55), Math.round(height * 0.40), Math.round(width * 0.65), Math.round(height * 0.45)),
                new Barrier("innerbox3", Math.round(width * 0.60), Math.round(height * 0.45), Math.round(width * 0.65), Math.round(height * 0.60)),
                new Barrier("innerbox4", width * 0.35, Math.round(height * 0.55), Math.round(width * 0.60), Math.round(height * 0.60)),
                new Barrier("innerbox5", width * 0.35, Math.round(height * 0.30), Math.round(width * 0.40), Math.round(height * 0.55)),
                new Barrier("outerbox1", Math.round(width * 0.25), Math.round(height * 0.25), Math.round(width * 0.80), Math.round(height * 0.30)),
                new Barrier("outerbox2", Math.round(width * 0.75), Math.round(height * 0.30), Math.round(width * 0.80), Math.round(height * 0.70)),
                new Barrier("outerbox3", Math.round(width * 0.25), Math.round(height * 0.70), Math.round(width * 0.85), Math.round(height * 0.75)),
                new Barrier("outerbox4", Math.min(width * 0.20, width * 0.25 - playItemSize), Math.round(height * 0.55), Math.round(width * 0.25), Math.round(height * 0.75)),
                new Barrier("outerbox5", Math.min(width * 0.20, width * 0.25 - playItemSize), Math.round(height * 0.25), Math.round(width * 0.25), Math.round(height * 0.45)),
                new Barrier("blocker", Math.round(width * 0.05), Math.round(height * 0.65), Math.round(width * 0.20), Math.round(height * 0.70)),
                new Barrier("barrier1", Math.min(width * 0.30, width * 0.35 - playItemSize), Math.round(height * 0.05), Math.round(width * 0.35), Math.round(height * 0.10)),
                new Barrier("barrier2", Math.min(width * 0.30, width * 0.35 - playItemSize), Math.round(height * 0.20), Math.round(width * 0.35), Math.round(height * 0.25)),
                new Barrier("barrier3", Math.round(width * 0.55), Math.round(height * 0.15), Math.max(width * 0.60, width * 0.55 + playItemSize), Math.round(height * 0.25)),
                new Barrier("barrier4", Math.round(width * 0.80), Math.round(height * 0.30), Math.round(width * 0.85), Math.round(height * 0.35)),
                new Barrier("barrier5", Math.round(width * 0.90), Math.round(height * 0.50), Math.round(width * 0.95), Math.round(height * 0.55)),
                new Barrier("barrier6", Math.round(width * 0.70), Math.round(height * 0.75), Math.max(width * 0.75, width * 0.70 + playItemSize), Math.round(height * 0.80)),
                new Barrier("barrier7", Math.round(width * 0.55), Math.round(height * 0.85), Math.max(width * 0.60, width * 0.55 + playItemSize), Math.round(height * 0.90)),
                new Barrier("barrier8", Math.round(width * 0.40), Math.round(height * 0.75), Math.max(width * 0.45, width * 0.40 + playItemSize), Math.round(height * 0.80)),
                new Barrier("barrier9", Math.min(width * 0.28, width * 0.33 - playItemSize), Math.round(height * 0.85), Math.round(width * 0.33), Math.round(height * 0.90))
            );
            goal = new Goal("goal", Math.max(width * 0.05, barrierWidth), Math.round(height - barrierHeight), Math.round(width * 0.20), Math.round(height * 1.00));
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.round(width * 0.45), Math.round(height * 0.48), 0, 0, playItemSize, foodItem);
        } else if (levelID === 9) {
            // Level 4 Question Stage
            //let question1 = "How much money could the world";
            //let question2 = "save every year if there";
            //let question3 = "was zero food waste?";
            let question = "How much money could the world save every year if there was zero food waste?";
            let answerThousand = "$1000";
            let answerMillion = "$1 million";
            let answerBillion = "$1 billion";
            let answerTrillion = "$1 trillion";
            barriers.push(
                new Barrier("topleftwall", Math.round(width * 0.15), Math.round(height * 0.05), Math.round(width * 0.25), Math.round(height * 0.20)),
                new Barrier("topleftfloor", Math.round(width * 0.05), Math.round(height * 0.30), Math.round(width * 0.35), Math.round(height * 0.40)),
                new Barrier("midlefthang", Math.round(width * 0.20), Math.round(height * 0.40), Math.round(width * 0.35), Math.round(height * 0.55)),
                new Barrier("leftwall", Math.round(width * 0.20), Math.round(height * 0.65), Math.round(width * 0.35), Math.round(height * 0.95)),
                new Barrier("botleftlip", Math.round(width * 0.35), Math.round(height * 0.70), Math.round(width * 0.45), Math.round(height * 0.75)),
                //new Barrier("botlefttooth", Math.round(width * 0.35), Math.round(height * 0.75), Math.round(width * 0.40), Math.round(height * 0.80)),
                //new Barrier("botrightchunk", Math.round(width * 0.50), Math.round(height * 0.85), Math.round(width * 0.75), Math.round(height * 0.95)),
                new Barrier("botrightchunk", Math.round(width * 0.55), Math.round(height * 0.85), Math.round(width * 0.75), Math.round(height * 0.95)),
                new Barrier("botrightfloor", Math.round(width * 0.55), Math.round(height * 0.70), Math.round(width * 0.70), Math.round(height * 0.85)),
                new Barrier("botrightlip1", Math.round(width * 0.70), Math.round(height * 0.70), Math.round(width * 0.75), Math.round(height * 0.75)),
                new Barrier("botrightlip2", Math.round(width * 0.90), Math.round(height * 0.70), Math.round(width * 0.95), Math.round(height * 0.75)),
                new Barrier("botright", Math.round(width * 0.90), Math.round(height * 0.85), Math.round(width * 0.95), Math.round(height * 0.95)),
                new Barrier("toprightchunk", Math.round(width * 0.55), Math.round(height * 0.25), Math.round(width * 0.80), Math.round(height * 0.50)),
                new Barrier("toprightfloor", Math.round(width * 0.80), Math.round(height * 0.35), Math.round(width * 0.95), Math.round(height * 0.50)),
                new Barrier("toprightlip", Math.round(width * 0.70), Math.round(height * 0.20), Math.round(width * 0.80), Math.round(height * 0.25)),
                new Barrier("floor", 0, height * 0.90, width, height - barrierHeight)
            );
            extras.push(
                //new Extra("question1", Math.round(width * 0.30), Math.round(height * 0.10), 0, 0, "p", question1),
                //new Extra("question2", Math.round(width * 0.30), Math.round(height * 0.15), 0, 0, "p", question2),
                //new Extra("question3", Math.round(width * 0.30), Math.round(height * 0.20), 0, 0, "p", question3),
                new Extra("lvl4question", Math.round(width * 0.25), Math.round(height * 0.10), 0, 0, "p", question),
                new Extra("lvl4answerThousand", barrierWidth, Math.round(height * 0.46), 0, 0, "p", answerThousand),
                new Extra("lvl4answerMillion", Math.round(width * 0.35), Math.round(height * 0.81), 0, 0, "p", answerMillion),
                new Extra("lvl4answerBillion", Math.round(width * 0.80), Math.round(height * 0.25), 0, 0, "p", answerBillion),
                new Extra("lvl4answerTrillion", Math.round(width * 0.75), Math.round(height * 0.80), 0, 0, "p", answerTrillion)
            );
            wrongs.push(
                new Wrong("lvl4wrongThousand", barrierWidth, Math.round(height * 0.40), Math.round(width * 0.20), Math.round(height * 0.50), "lvl4answerThousand"),
                new Wrong("lvl4wrongMillion", Math.round(width * 0.35), Math.round(height * 0.85), Math.round(width * 0.55), Math.round(height * 0.90), "lvl4answerMillion"),
                new Wrong("lvl4wrongBillion", Math.round(width * 0.80), Math.round(height * 0.25), width - barrierWidth, Math.round(height * 0.35), "lvl4answerBillion")                
            );
            scoreOverlay.innerHTML = "<p class='statement'>The world could save <span class=\"answer\">a trillion dollars</span> every year by eliminating food waste!</p>";
            goal = new Goal("goal", width * 0.75, height * 0.90, width * 0.90, height * 0.95);
            foodItem = new FoodItem("Box", "box", "img/orange.png", true);
            playItem = new PlayItem(Math.max(Math.round(width * 0.10 - playItemSize * 0.5), barrierWidth + 5), Math.round(height * 0.10), 0, 0, playItemSize, foodItem);
        }

        if (levelID >= 0) {

            /**
             * Defines the play area and fills the background with the appropriate colour.
             */
            new Air("playArea", 0, 0, width, height).drawPhysicalObject();

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
             * Displays the extras.
             */
            for (let i = 0; i < extras.length; i++) {
                extras[i].render();
            }

            /**
             * Adds the wrongs to the level object.
             */
            for (let i = 0; i < wrongs.length; i++) {
                wrongs[i].drawPhysicalObject();
                level.addWrong(wrongs[i]);
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

            timer.style.display = "block";

            /**
             * Initializes the timer that handles game ticks.
             */
            intervalId = setInterval(move, 20);
        }
    }

    /**
     * Redraws the food item in the correct place by changing css positioning.
     */
    function drawFoodItem() {
        if (foodImage) {
            foodImage.css("left", level.playItem.x);
            foodImage.css("top", level.playItem.y);
        }
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
        let moveReturnValue = level.move();
        if (moveReturnValue === 5) {
            clearInterval(intervalId);
            if (game.level % 2 === 0) {
                game.level += 1;
                let level_elements = document.getElementById("game_window").children;
                for (let i = level_elements.length - 1; i >= 0; i--) {
                    level_elements[i].parentNode.removeChild(level_elements[i]);
                }
                init();
            } else {
                $(".extra").css("display", "none");

                let time = document.createElement("p");
                time.innerHTML = parseTimeForOverlay(score);

                let actualLevel = game.level / 2;
                let scoreInSeconds = Math.floor(score / 1000);
                scoreInSeconds = scoreInSeconds + (Math.floor((score - (scoreInSeconds * 1000)) / 100) / 10);
                $.post("accessdb.php", {
                    function: "saveGame",
                    level: actualLevel,
                    time: score
                }, function (data) {
                    //alert(data);
                });
				
				let yourTime = document.createElement("p");
				let yourTimeText = document.createTextNode("Your Time:");
				yourTime.appendChild(yourTimeText);
				scoreOverlay.appendChild(yourTime);
                scoreOverlay.appendChild(time);

                let retryButton = document.createElement("div");
                retryButton.id = "retry_button";
                retryButton.className = "score_overlay_button";
                retryButton.innerHTML = "<img src='img/retrylevel.png' alt='Retry'>";
                scoreOverlay.appendChild(retryButton);

                let selectLevelButton = document.createElement("div");
                selectLevelButton.id = "select_level_button";
                selectLevelButton.className = "score_overlay_button";
                selectLevelButton.innerHTML = "<img src='img/levelselect.png' alt='Levels'>";
                scoreOverlay.appendChild(selectLevelButton);

                let nextLevelButton = document.createElement("div");
                nextLevelButton.id = "next_level_button";
                nextLevelButton.className = "score_overlay_button";
                nextLevelButton.innerHTML = "<img src='img/nextlevel.png' alt='Next'>";

                if (game.level / 2 < (NUMBER_OF_LEVELS - 1)) {
                    scoreOverlay.appendChild(nextLevelButton);
                }

                scoreOverlay.style.display = "block";
                timer.style.display = "none";

                retryButton.onclick = function () {
                    game.level -= 1;
                    reInit();
                };

                selectLevelButton.onclick = function () {
                    game.level = -1;
                    reInit();
                };

                nextLevelButton.onclick = function () {
                    game.level += 1;
                    reInit();
                };
            }
        } else if (moveReturnValue === 6) {
            // TODO - somehow display that that is the wrong answer
        }
        drawFoodItem();
        // game timer runs every 20ms, so score should increment by 20
        score += 20;
        // update score display (timer)
        timer.innerHTML = parseTime(score);
    }

    function reInit() {
        scoreOverlay.style.display = "none";
        score = 0;
        if (game.level >= 0) {
            timer.style.display = "block";
        }
        let overlay_elements = scoreOverlay.children;
        for (let i = overlay_elements.length - 1; i >= 0; i--) {
            scoreOverlay.removeChild(overlay_elements[i]);
        }
        let level_elements = document.getElementById("game_window").children;
        for (let i = level_elements.length - 1; i >= 0; i--) {
            level_elements[i].parentNode.removeChild(level_elements[i]);
        }
        init();
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
    $(document.getElementById("content")).click(function (e) {
    	console.log("click");
        // prevents initial input
        if (!clicked && score > 100) {
            let divPosX = $(this).position().left;
            let divPosY = $(this).position().top;
            let mousePosX = e.pageX - divPosX - $(gameContainer).offset().left;
            let mousePosY = e.pageY - divPosY;

            // moves the item based on the click
            playItem.clicked(mousePosX, mousePosY);

            // implements a delay between inputs TODO - choose delay
            // clicked = true;
            // setTimeout(setClicked, 500, false);
        }
    });
});

/**
 * Parses the score to display it on the in-game timer.
 */
function parseTime(ms) {
    let hours = Math.floor(ms / 1000 / 60 / 60);
    let minutes = Math.floor(ms / 1000 / 60 - hours * 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60 - hours * 60 * 60);
    let milliseconds = ms - seconds * 1000 - minutes * 1000 * 60 - hours * 1000 * 60 * 60;

    let strH = ""; // hours === 0 ? "0:" : hours + ":";
    let strM = minutes === 0 ? "0:" : minutes + ":";
    let strS;
    //let strS = seconds === 0 ? "0:" : seconds + ":";
    if (seconds === 0) {
    	strS = "00.";
    } else if (seconds < 10) {
    	strS = "0" + seconds + ".";
    } else {
    	strS = seconds + ".";
    }
    let strMS = ("" + milliseconds).substr(0, 1);

    return strH + strM + strS + strMS;
}

/**
 * Parses the score to display it on the score overlay.
 */
function parseTimeForOverlay(ms) {
	let hours = Math.floor(ms / 1000 / 60 / 60);
    let minutes = Math.floor(ms / 1000 / 60 - hours * 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60 - hours * 60 * 60);
    let milliseconds = ms - seconds * 1000 - minutes * 1000 * 60 - hours * 1000 * 60 * 60;
    
    let strH = ""; // probably won't use
    let optionalS = minutes === 1 ? "" : "s";
    let strM = minutes === 0 ? "" : minutes + " minute" + optionalS + " ";
    let strS = seconds;
    let strMS = milliseconds === 0 ? " seconds" : "." + ("" + milliseconds).substr(0, 1) + " seconds";
    
    return strH + strM + strS + strMS;
}