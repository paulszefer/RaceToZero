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
    let musicPlayer;
    let navBurger = document.getElementById("navburger");
    let navImage = navBurger.firstElementChild;
    let retryButton;
    let retryImage;
    let muteButton;
    let muteImage;
    let timer;
    let loginOverlay;
    let finalScore;
    let scoreOverlay;
    let game;
    
    let musicStarted = false;
    let soundEnabled = getSoundSettings();
    let processing;

    const NUMBER_OF_LEVELS = 5;
    const musicURLs = ["music/cute.mp3",
        "music/happiness.mp3",
        "music/ukulele.mp3",
        "music/littleidea.mp3",
        "music/buddy.mp3",
        "music/acousticbreeze.mp3",
        "music/anewbeginning.mp3"];

    setup();

    /**
     * Sets up the required HTML elements to display the game
     * and the game object to store game data.
     */
    function setup() {

        /**
         * Creates the element that plays music.
         */
        musicPlayer = document.createElement("audio");
        musicPlayer.volume = 0.2;
        musicPlayer.onended = newTrack;
        musicPlayer.pause();

        /**
         * Creates the element that contains the game window.
         */
        gameContainer = document.createElement("div");
        gameContainer.id = "game_container";
        gameContainer.className = "unselectable";

        // .contentactual[0] is the div that holds the content on each page
        // TODO - change .contentactual to #contentactual
        document.getElementsByClassName("contentactual")[0].appendChild(gameContainer);

        /**
         * Creates the element that contains the game objects.
         */
        gameWindow = document.createElement("div");
        gameWindow.id = "game_window";
        gameContainer.appendChild(gameWindow);

        /**
         * Creates the retry button within the level.
         */
        retryButton = document.createElement("div");
        retryButton.id = "retry_button";
        $(retryButton).click(function () {
            clearInterval(intervalId);
            if (game.level % 2 === 1) {
                game.level--;
            }
            reInit();
        });
        retryImage = document.createElement("img");
        retryImage.id = "retrylevel";
        retryImage.src = "img/retrylevel.png";
        retryImage.alt = "Retry Level";
        retryButton.appendChild(retryImage);
        gameContainer.appendChild(retryButton);

        /**
         * Creates the audio mute button within the level.
         */
        muteButton = document.createElement("div");
        muteButton.id = "mute_button";
        muteImage = document.createElement("img");
        muteImage.id = "mute_image";
        muteImage.src = soundEnabled ? "img/soundon.png" : "img/soundoff.png";
        muteButton.appendChild(muteImage);
        gameContainer.appendChild(muteButton);
        $(muteButton).click(function () {
                if (soundEnabled) {
                    muteImage.src = "img/soundoff.png";
                    soundEnabled = false;
                    musicPlayer.pause();
                    document.getElementById("successsound").muted = true;
                    setSoundSettings(false);
                } else {
                    muteImage.src = "img/soundon.png";
                    soundEnabled = true;
                    musicStarted = true;
                    newTrack();
                    document.getElementById("successsound").muted = false;
                    setSoundSettings(true);
                }
            }
        );

        /**
         * Creates the element that displays the timer(the user's score).
         */
        timer = document.createElement("p");
        timer.id = "timer";
        gameContainer.appendChild(timer);

        /**
         * Creates the element that stores the end of level login overlay.
         */
        let promptLogin = loggedIn === -2;
        loginOverlay = document.createElement("div");
        loginOverlay.id = "login_overlay";
        // incremented to match level width
        loginOverlay.style.width = (gameContainer.parentNode.offsetWidth + 1) + "px";
        loginOverlay.style.height = gameContainer.parentNode.offsetHeight + "px";

        let scoreDisplay = document.createElement("p");
        scoreDisplay.id = "score_display";
        scoreDisplay.innerHTML = "Your time:";

        finalScore = document.createElement("p");
        finalScore.id = "final_score";

        let saveScorePrompt = document.createElement("p");
        saveScorePrompt.id = "save_score_prompt";
        saveScorePrompt.innerHTML = "To save your score, login or register.";

        let loginRegisterNow = document.createElement("div");
        loginRegisterNow.id = "login_register_now";
        loginRegisterNow.className = "login_overlay_button";
        loginRegisterNow.innerHTML = "<p>Login / Register</p>";
        $(loginRegisterNow).click(function () {
            window.location.href = "login.php";
        });

        let loginRegisterLater = document.createElement("div");
        loginRegisterLater.id = "login_register_later";
        loginRegisterLater.className = "login_overlay_button";
        loginRegisterLater.innerHTML = "<p>Later</p>";
        $(loginRegisterLater).click(function () {
            loginOverlay.style.animation = "fadein 2s reverse";
            setTimeout(function() {
                loginOverlay.style.display = "none";
            }, 1975);
            scoreOverlay.style.display = "block";
            scoreOverlay.style.animation = "fadein 2s";
        });

        loginOverlay.appendChild(scoreDisplay);
        loginOverlay.appendChild(finalScore);
        loginOverlay.appendChild(saveScorePrompt);
        loginOverlay.appendChild(loginRegisterNow);
        loginOverlay.appendChild(loginRegisterLater);

        gameContainer.appendChild(loginOverlay);

        /**
         * Creates the element that stores the end of level score overlay.
         */
        scoreOverlay = document.createElement("div");
        scoreOverlay.id = "score_overlay";
        // incremented to match level width
        scoreOverlay.style.width = (gameContainer.parentNode.offsetWidth + 1) + "px";
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
    let barrierWidth = Math.max(Math.round(width / 20), 8);
    let barrierHeight = Math.max(Math.round(height / 20), 8);
    let playItemSize = Math.max(Math.round(width / 20), 8);
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

        // for testing purposes to skip straight to certain level
        // levelID = 8;

        /**
         * Load data for the current level.
         */
        if (levelID === -2) {
            // initial screen with play button
            let playButton = document.createElement("div");
            playButton.id = "play_button";
            let playButtonText = document.createElement("p");
            playButtonText.id = "play_button_text";
            playButtonText.innerHTML = "PLAY";
            playButton.appendChild(playButtonText);
            gameWindow.appendChild(playButton);

            let aboutRTZOverlay = document.createElement("div");
            aboutRTZOverlay.id = "about_rtz_overlay";
            let logoMascot = document.createElement("img");
            logoMascot.id = "logo_mascot";
            logoMascot.src = "img/pizzalogoonly.png";
            logoMascot.alt = "Race to Zero logo";
            aboutRTZOverlay.appendChild(logoMascot);
            let aboutRTZText = document.createElement("p");
            aboutRTZText.id = "about_rtz_text";
            aboutRTZText.innerHTML = "Welcome to Race To Zero! Race through each level to get the fastest time, all while learning about the issue of food waste!";
            aboutRTZOverlay.appendChild(aboutRTZText);
            gameWindow.appendChild(aboutRTZOverlay);

            $(playButton).click(function () {
                let gameContainerOffset = $(gameContainer).offset();
                window.scrollTo(gameContainerOffset.left, gameContainerOffset.top);
                game.level = -1;
                reInit();
            });
        } else if (levelID === -1) {
            let highestLevel = getHighestLevelReached();

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
                    if (highestLevel >= i) {
                        if (!musicStarted && soundEnabled) {
                            musicStarted = true;
                            newTrack();
                        }
                        game.level = i * 2;
                        let gameContainerOffset = $(gameContainer).offset();
                        window.scrollTo(gameContainerOffset.left, gameContainerOffset.top);
                        reInit();
                    }
                };
                if (highestLevel < i) {
                    level.style.background = "linear-gradient(white, rgb(160, 160, 160))";
                    level.innerHTML = "<img class='lock_icon' src='img/lock.png' alt='Locked'>";
                }
                levelSelect.appendChild(level);
            }

            let soundButton = document.createElement("div");
            soundButton.id = "sound_button";
            let soundOnImage = document.createElement("img");
            soundOnImage.src = "img/soundon.png";
            soundOnImage.alt = "Toggle Sound";
            let soundOffImage = document.createElement("img");
            soundOffImage.src = "img/soundoff.png";
            soundOffImage.alt = "Toggle Sound";
            if (soundEnabled) {
                soundButton.appendChild(soundOnImage);
            } else {
                soundButton.appendChild(soundOffImage);
            }

            soundButton.onclick = function () {
                if (soundEnabled) {
                    soundEnabled = false;
                    soundButton.removeChild(soundOnImage);
                    soundButton.appendChild(soundOffImage);
                    musicPlayer.pause();
                    document.getElementById("successsound").muted = true;
                    setSoundSettings(false);
                } else {
                    soundEnabled = true;
                    musicStarted = true;
                    soundButton.removeChild(soundOffImage);
                    soundButton.appendChild(soundOnImage);
                    newTrack();
                    document.getElementById("successsound").muted = false;
                    setSoundSettings(true);
                }
            };

            levelSelect.appendChild(soundButton);

            gameWindow.appendChild(levelSelect);
        } else if (levelID === 0) {
            // Tutorial Level Game Stage
            let hint1 = "Tap anywhere to move the strawberry in the opposite direction!";
            let hint2 = "The further away that you tap, the further it will go!";
            let hint3 = "Get the strawberry through this hole!";

            barriers.push(
                new Barrier("platform1", 0, height * 0.45, width * 0.45, height * 0.515)
            );
            extras.push(
                new Extra("hint_tap_here", width * 0.15, height * 0.25, 0, 0, "p", hint1),
                new Extra("tap_image", width * 0.15, height * 0.6, width * 0.15 + height * 0.05, height * 0.65, "img", "img/taphere.png"),
                new Extra("hint_further", width * 0.30, height * 0.55, 0, 0, "p", hint2),
                new Extra("hint_hole", width * 0.10, height * 0.80, 0, 0, "p", hint3),
                new Extra("arrow", width * 0.10, height * 0.85, width * 0.1 + height * 0.05, height * 0.90, "img", "img/arrow.png")
            );
            goal = new Goal("goal", width * 0.05, height - barrierHeight - 1, width * 0.20, height, false);
            foodItem = new FoodItem("strawberry", "strawberry", "img/foodobjects/strawberry.png");
            playItem = new PlayItem(width * 0.35, height * 0.2, 0, 0, playItemSize, foodItem);
        } else if (levelID === 1) {
            // Tutorial Level Question Stage
            let question = "How much of the food produced around the world is wasted?";
            let hint1 = "Wrong answer? That's okay! Just jump back out and get it into the right one.";
            let hint2 = "Tap under the strawberry mid-jump to go higher!";
            let answer1 = "One third";
            let answer2 = "One half";
            barriers.push(
                new Barrier("platform1", 0, height * 0.44, width * 0.4, height * 0.505),
                new Barrier("ground1", 0, height * 0.80, width * 0.25, height),
                new Barrier("ground2", width * 0.4, height * 0.80, width * 0.6, height),
                new Barrier("ground3", width * 0.75, height * 0.80, width, height),
                new Barrier("floor1", width * 0.24, height * 0.9, width * 0.76, height - barrierHeight + 2)
            );
            extras.push(
                new Extra("tutorialquestion", width * 0.25, height * 0.15, 0, 0, "p", question),
                new Extra("hint_answer", width * 0.25, height * 0.60, 0, 0, "p", hint1),
                new Extra("hint_jump", width * 0.25, height * 0.30, 0, 0, "p", hint2),
                new Extra("tutorialanswer1", width * 0.25, height * 0.70, 0, 0, "p", answer1),
                new Extra("tutorialanswer2", width * 0.6, height * 0.70, 0, 0, "p", answer2),
                new Extra("arrow1", width * 0.29, height * 0.80, width * 0.34, height * 0.85, "img", "img/arrow.png"),
                new Extra("arrow2", width * 0.64, height * 0.80, width * 0.69, height * 0.85, "img", "img/arrow.png")
            );
            wrongs.push(
                new Wrong("wrong1", width * 0.6, height * 0.85, width * 0.75, height * 0.9, "tutorialanswer2")
            );
            scoreOverlay.innerHTML = "<p class='statement'><span class='answer'>One third</span> of the food produced around the world is wasted.</p>";
            goal = new Goal("goal", width * 0.25, height * 0.85, width * 0.4, height * 0.9, "tutorialanswer1");
            foodItem = new FoodItem("strawberry", "strawberry", "img/foodobjects/strawberry.png");
            playItem = new PlayItem(width * 0.1, height * 0.1, 0, 0, playItemSize, foodItem);
        } else if (levelID === 2) {
            // Level 1 Game Stage (platform)
            barriers.push(
                new Barrier("platform1", width * 0.4, height * 0.29, width * 0.6, height * 0.355),
                new Barrier("wall1", 0, height * 0.6, width * 0.4625, height),
                new Barrier("wall2", width * 0.5375, height * 0.6, width, height)
            );
            goal = new Goal("goal", width * 0.4625, height - barrierHeight - 1, width * 0.5375, height);
            foodItem = new FoodItem("apple", "apple", "img/foodobjects/apple.png");
            playItem = new PlayItem(width * 0.475, height * 0.1, 0, 0, playItemSize, foodItem);
        } else if (levelID === 3) {
            // Level 1 Question Stage
            let barrier1Left = Math.max(width * 0.20, barrierWidth + playItemSize + 10);
            let barrier1Right = barrier1Left + Math.max(width * 0.10, playItemSize);
            let barrier3Right = Math.min(width * 0.80, width - barrierWidth - playItemSize - 10);
            let barrier3Left = barrier3Right - Math.max(width * 0.10, playItemSize);

            let question = "How much money does a typical household in Vancouver lose per year due to food waste?";
            let answer1 = "$200";
            let answer2 = "$700";
            let answer3 = "$1200";
            let answer4 = "$2100";
            barriers.push(
                new Barrier("platform1", width * 0.4, height * 0.29, width * 0.6, height * 0.355),
                new Barrier("barrier1", width * 0.20, height * 0.75, width * 0.30, height * 0.95),
                new Barrier("barrier2", width * 0.45, height * 0.75, width * 0.55, height * 0.95),
                new Barrier("barrier3", width * 0.70, height * 0.75, width * 0.80, height * 0.95),
                new Barrier("floor", 0, height * 0.90, width, height - barrierHeight + 2)
            );
            extras.push(
                new Extra("lvl1question", width * 0.25, height * 0.40, 0, 0, "p", question),
                new Extra("lvl1answer1", width * 0.05, height * 0.75, 0, 0, "p", answer1),
                new Extra("lvl1answer2", width * 0.30, height * 0.75, 0, 0, "p", answer2),
                new Extra("lvl1answer3", width * 0.55, height * 0.75, 0, 0, "p", answer3),
                new Extra("lvl1answer4", width * 0.80, height * 0.75, 0, 0, "p", answer4)
            );
            wrongs.push(
                new Wrong("lvl1wrong1", width * 0.05, height * 0.85, width * 0.20, height * 0.9, "lvl1answer1"),
                new Wrong("lvl1wrong3", width * 0.55, height * 0.85, width * 0.70, height * 0.9, "lvl1answer3"),
                new Wrong("lvl1wrong4", width * 0.80, height * 0.85, width * 0.95, height * 0.9, "lvl1answer4")
            );
            scoreOverlay.innerHTML = "<p class='statement'>The average Vancouver household loses <span class=\"answer\">$700</span> due to food waste every single year!</p>";
            goal = new Goal("goal", width * 0.30, height * 0.85, width * 0.45, height * 0.90, "lvl1answer2");
            foodItem = new FoodItem("apple", "apple", "img/foodobjects/apple.png");
            playItem = new PlayItem(width * 0.475, height * 0.05 + 10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 4) {
            // Level 2 Game Stage (staircase)
            barriers.push(
                new Barrier("step0", width * 0.04, height * 0.80, width * 0.80, height),
                new Barrier("step1", width * 0.20, height * 0.65, width * 0.80, height * 0.95),
                new Barrier("step2", width * 0.35, height * 0.50, width * 0.80, height * 0.75),
                new Barrier("step3", width * 0.50, height * 0.35, width * 0.80, height * 0.60),
                new Barrier("step4", width * 0.65, height * 0.20, width * 0.80, height * 0.45)
            );
            goal = new Goal("goal", width * 0.80, height - barrierHeight - 1, width * 0.95, height, false);
            foodItem = new FoodItem("broccoli", "broccoli", "img/foodobjects/broccoli.png");
            playItem = new PlayItem(width * 0.10, height * 0.30, 0, 0, playItemSize, foodItem);
        } else if (levelID === 5) {
            // Level 2 Question Stage
            let question = "Which of these foods are still safe to eat if you've found mould on them?";
            let answerMeat = "Meat & Dairy";
            let answerBread = "Bread";
            let answerFruits = "Fruits & Veggies";
            let answerAll = "None of these";
            barriers.push(
                new Barrier("platform1", width * 0.75, height * 0.20, width * 0.96, height * 0.30),
                new Barrier("platform2", width * 0.29, height * 0.29, width * 0.45, height * 0.355),
                new Barrier("platform3", width * 0.55, height * 0.49, width * 0.71, height * 0.555),
                new Barrier("platform4", width * 0.29, height * 0.79, width * 0.45, height * 0.85),
                new Barrier("barrier1", width * 0.20, height * 0.25, width * 0.30, height * 0.55),
                new Barrier("barrier2", width * 0.04, height * 0.45, width * 0.21, height * 0.55),
                new Barrier("barrier3", width * 0.68, height * 0.40, width * 0.78, height * 0.60),
                new Barrier("barrier4", width * 0.77, height * 0.50, width * 0.96, height * 0.60),
                new Barrier("barrier5", width * 0.20, height * 0.75, width * 0.30, height * 0.95),
                new Barrier("barrier6", width * 0.70, height * 0.75, width * 0.80, height * 0.95),
                new Barrier("floor", 0, height * 0.90, width, height)
            );
            extras.push(
                new Extra("lvl2question", width * 0.25, height * 0.10, 0, 0, "p", question),
                new Extra("lvl2answerMeat", width * 0.05, height * 0.35, 0, 0, "p", answerMeat),
                new Extra("lvl2answerBread", width * 0.05, height * 0.83, 0, 0, "p", answerBread),
                new Extra("lvl2answerFruits", width * 0.78, height * 0.40, 0, 0, "p", answerFruits),
                new Extra("lvl2answerAll", width * 0.80, height * 0.80, 0, 0, "p", answerAll)
            );
            wrongs.push(
                new Wrong("lvl2wrongMeat", width * 0.05, height * 0.35, width * 0.20, height * 0.45, "lvl2answerMeat"),
                new Wrong("lvl2wrongBread", width * 0.05, height * 0.80, width * 0.20, height * 0.90, "lvl2answerBread"),
                new Wrong("lvl2wrongFruits", width * 0.80, height * 0.45, width * 0.95, height * 0.50, "lvl2answerFruits")
            );
            scoreOverlay.innerHTML = "<p class='statement'>If you've found mould on <span class=\"answer\">any</span> kind of food, it's gone bad!</p>";
            goal = new Goal("goal", width * 0.80, height * 0.85, width * 0.95, height * 0.90, "lvl2answerAll");
            foodItem = new FoodItem("broccoli", "broccoli", "img/foodobjects/broccoli.png");
            playItem = new PlayItem(width * 0.85, height * 0.10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 6) {
            // Level 3 Game Stage (obstacles)
            let blocks1 = width * 0.50;
            let blocks2 = blocks1 + Math.max(width * 0.05, playItemSize);
            let blocks3 = blocks2 + Math.max(width * 0.05, playItemSize);
            let blocks4 = blocks3 + Math.max(width * 0.10, playItemSize + 10);
            let blocks5 = blocks4 + Math.max(width * 0.05, playItemSize);
            let blocks6 = Math.min(blocks5 + Math.max(width * 0.05, playItemSize), width - barrierWidth);
            barriers.push(
                new Barrier("platform1", width * 0.04, height * 0.30, width * 0.81, height * 0.45),
                new Barrier("platform2", width * 0.25, height * 0.65, width * 0.96, height * 0.80),
                new Barrier("floor", width * 0.04, height * 0.90, width * 0.80, height - barrierHeight + 2),
                new Barrier("barrier1", width * 0.24, height * 0.04, width * 0.32, height * 0.20),
                new Barrier("barrier2", width * 0.40, height * 0.15, width * 0.50, height * 0.31),
                new Barrier("barrier3", width * 0.60, height * 0.04, width * 0.70, height * 0.18),
                new Barrier("corner", width * 0.92, height * 0.04, width * 0.96, height * 0.10),
                new Barrier("lip", width * 0.80, height * 0.15, width * 0.85, height * 0.40),
                new Barrier("barrier6", width * 0.30, height * 0.44, width * 0.40, height * 0.55),
                new Barrier("barrier7", width * 0.04, height * 0.53, width * 0.15, height * 0.60),
                new Barrier("barrier8", blocks2 - 1, height * 0.55, blocks3, height * 0.66),
                new Barrier("barrier9", blocks4, height * 0.55, blocks5 + 1, height * 0.66),
                new Barrier("barrier10", blocks1, height * 0.60, blocks2, height * 0.66),
                new Barrier("barrier11", blocks5, height * 0.60, blocks6, height * 0.66)
            );
            goal = new Goal("goal", width * 0.80, height - barrierHeight - 1, width * 0.95, height, false);
            foodItem = new FoodItem("cookie", "cookie", "img/foodobjects/cookie.png");
            playItem = new PlayItem(width * 0.10, height * 0.10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 7) {
            // Level 3 Question Stage
            let question = "What's a good way to make stale chips taste good again?";
            let answerRefrigerate = "Refrigerate them";
            let answerToast = "Toast them";
            let answerSoak = "Soak them in water";
            let answerBreak = "Break them into pieces";
            barriers.push(
                new Barrier("mainwall", width * 0.70, height * 0.04, width * 0.80, height * 0.80),
                new Barrier("floor", 0, height * 0.90, width * 0.96, height * 0.96),
                new Barrier("platform1", width * 0.04, height * 0.20, width * 0.30, height * 0.30),
                new Barrier("platform2", width * 0.04, height * 0.45, width * 0.30, height * 0.55),
                new Barrier("platform3", width * 0.04, height * 0.70, width * 0.30, height * 0.80),
                new Barrier("ledge4", width * 0.60, height * 0.34, width * 0.71, height * 0.405),
                new Barrier("ledge5", width * 0.60, height * 0.59, width * 0.71, height * 0.655),
                new Barrier("floating1", width * 0.40, height * 0.19, width * 0.49, height * 0.255),
                new Barrier("floating2", width * 0.40, height * 0.44, width * 0.49, height * 0.505),
                new Barrier("floating3", width * 0.40, height * 0.74, width * 0.49, height * 0.805)
            );
            extras.push(
                new Extra("lvl3question", width * 0.50, height * 0.81, 0, 0, "p", question),
                new Extra("lvl3answerRefrigerate", width * 0.20, height * 0.15, 0, 0, "p", answerRefrigerate),
                new Extra("lvl3answerToast", width * 0.20, height * 0.35, 0, 0, "p", answerToast),
                new Extra("lvl3answerSoak", width * 0.20, height * 0.59, 0, 0, "p", answerSoak),
                new Extra("lvl3answerBreak", width * 0.20, height * 0.83, 0, 0, "p", answerBreak)
            );
            wrongs.push(
                new Wrong("lvl3wrongRefrigerate", width * 0.05, height * 0.05, width * 0.25, height * 0.20, "lvl3answerRefrigerate"),
                new Wrong("lvl3wrongSoak", width * 0.05, height * 0.55, width * 0.25, height * 0.70, "lvl3answerSoak"),
                new Wrong("lvl3wrongBreak", width * 0.05, height * 0.80, width * 0.25, height * 0.90, "lvl3answerBreak")
            );
            scoreOverlay.innerHTML = "<p class='statement'>If your chips have gone stale, don't throw them out - just <span class=\"answer\">toast them!</span></p>";
            goal = new Goal("goal", width * 0.05, height * 0.30, width * 0.25, height * 0.45, "lvl3answerToast");
            foodItem = new FoodItem("cookie", "cookie", "img/foodobjects/cookie.png");
            playItem = new PlayItem(width * 0.85, height * 0.10, 0, 0, playItemSize, foodItem);
        } else if (levelID === 8) {
            // Level 4 Game Stage (maze)
            barriers.push(
                new Barrier("floor", width * 0.20, height * 0.90, width * 0.96, height * 0.96),
                new Barrier("innerbox1", width * 0.35, height * 0.39, width * 0.45, height * 0.455),
                new Barrier("innerbox2", width * 0.55, height * 0.39, width * 0.65, height * 0.455),
                new Barrier("innerbox3", width * 0.60, height * 0.45, width * 0.65, height * 0.60),
                new Barrier("innerbox4", width * 0.35, height * 0.55, width * 0.61, height * 0.60),
                new Barrier("innerbox5", width * 0.35, height * 0.29, width * 0.40, height * 0.56),
                new Barrier("outerbox1", width * 0.25, height * 0.25, width * 0.80, height * 0.30),
                new Barrier("outerbox2", width * 0.75, height * 0.29, width * 0.80, height * 0.70),
                new Barrier("outerbox3", width * 0.25, height * 0.69, width * 0.85, height * 0.755),
                new Barrier("outerbox4", width * 0.20, height * 0.55, width * 0.25, height * 0.755),
                new Barrier("outerbox5", width * 0.20, height * 0.25, width * 0.25, height * 0.45),
                new Barrier("blocker", width * 0.04, height * 0.65, width * 0.21, height * 0.70),
                new Barrier("barrier1", width * 0.30, height * 0.04, width * 0.35, height * 0.10),
                new Barrier("barrier2", width * 0.30, height * 0.20, width * 0.35, height * 0.26),
                new Barrier("barrier3", width * 0.55, height * 0.15, width * 0.60, height * 0.26),
                new Barrier("barrier4", width * 0.79, height * 0.29, width * 0.85, height * 0.355),
                new Barrier("barrier5", width * 0.90, height * 0.49, width * 0.96, height * 0.555),
                new Barrier("barrier6", width * 0.70, height * 0.75, width * 0.75, height * 0.80),
                new Barrier("barrier7", width * 0.55, height * 0.85, width * 0.60, height * 0.91),
                new Barrier("barrier8", width * 0.40, height * 0.75, width * 0.45, height * 0.80),
                new Barrier("barrier9", width * 0.28, height * 0.85, width * 0.33, height * 0.91)
            );
            goal = new Goal("goal", width * 0.05, height - barrierHeight - 1, width * 0.20, height, false);
            foodItem = new FoodItem("pizza", "pizza", "img/foodobjects/pizza.png");
            playItem = new PlayItem(width * 0.475, height * 0.48, 0, 0, playItemSize, foodItem);
        } else if (levelID === 9) {
            // Level 4 Question Stage
            let question = "How much money could the world save every year if there was zero food waste?";
            let answerThousand = "$1000";
            let answerMillion = "$1 million";
            let answerBillion = "$1 billion";
            let answerTrillion = "$1 trillion";
            barriers.push(
                new Barrier("topleftwall", width * 0.15, height * 0.04, width * 0.25, height * 0.20),
                new Barrier("topleftfloor", width * 0.04, height * 0.30, width * 0.35, height * 0.40),
                new Barrier("midlefthang", width * 0.20, height * 0.39, width * 0.35, height * 0.55),
                new Barrier("leftwall", width * 0.20, height * 0.65, width * 0.35, height * 0.95),
                new Barrier("botleftlip", width * 0.34, height * 0.69, width * 0.45, height * 0.755),
                new Barrier("botrightchunk", width * 0.55, height * 0.85, width * 0.75, height * 0.96),
                new Barrier("botrightfloor", width * 0.55, height * 0.69, width * 0.70, height * 0.86),
                new Barrier("botrightlip1", width * 0.69, height * 0.69, width * 0.75, height * 0.755),
                new Barrier("botrightlip2", width * 0.90, height * 0.69, width * 0.96, height * 0.755),
                new Barrier("botright", width * 0.90, height * 0.85, width * 0.96, height * 0.95),
                new Barrier("toprightchunk", width * 0.55, height * 0.25, width * 0.80, height * 0.50),
                new Barrier("toprightfloor", width * 0.79, height * 0.35, width * 0.96, height * 0.50),
                new Barrier("toprightlip", width * 0.70, height * 0.20, width * 0.80, height * 0.26),
                new Barrier("floor", 0, height * 0.90, width, height * 0.96)
            );
            extras.push(
                new Extra("lvl4question", width * 0.25, height * 0.10, 0, 0, "p", question),
                new Extra("lvl4answerThousand", barrierWidth, height * 0.46, 0, 0, "p", answerThousand),
                new Extra("lvl4answerMillion", width * 0.35, height * 0.81, 0, 0, "p", answerMillion),
                new Extra("lvl4answerBillion", width * 0.80, height * 0.25, 0, 0, "p", answerBillion),
                new Extra("lvl4answerTrillion", width * 0.75, height * 0.80, 0, 0, "p", answerTrillion)
            );
            wrongs.push(
                new Wrong("lvl4wrongThousand", width * 0.05, height * 0.40, width * 0.20, height * 0.50, "lvl4answerThousand"),
                new Wrong("lvl4wrongMillion", width * 0.35, height * 0.85, width * 0.55, height * 0.90, "lvl4answerMillion"),
                new Wrong("lvl4wrongBillion", width * 0.80, height * 0.25, width * 0.95, height * 0.35, "lvl4answerBillion")
            );
            scoreOverlay.innerHTML = "<p class='statement'>The world could save <span class=\"answer\">a trillion dollars</span> every year by eliminating food waste!</p>";
            goal = new Goal("goal", width * 0.75, height * 0.89, width * 0.90, height * 0.95, "lvl4answerTrillion");
            foodItem = new FoodItem("pizza", "pizza", "img/foodobjects/pizza.png");
            playItem = new PlayItem(width * 0.075, height * 0.10, 0, 0, playItemSize, foodItem);
        }

        if (levelID >= 0) {

            /**
             * Defines the play area and fills the background with the appropriate colour.
             */
            new Air("play_area", 0, 0, width, height).drawPhysicalObject();

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
            imgElement.style.left = level.playItem.x + "px";
            imgElement.style.top = level.playItem.y + "px";
            document.getElementById("game_window").appendChild(imgElement);

            foodImage = $("#food_image");

            navBurger.style.top = "7vh";
            navBurger.style.left = "5vh";
            retryImage.style.display = "block";
            muteImage.style.display = "block";
            timer.style.display = "block";

            /**
             * Initializes the timer that handles game ticks.
             */
            intervalId = setInterval(move, 5);
        } else {
            navBurger.style.top = "2vh";
            navBurger.style.left = "2vh";
        }
    }

    /**
     * Redraws the food item in the correct place by changing css positioning.
     */
    function drawFoodItem() {
        if (foodImage) {
            foodImage.css("left", Math.round(level.playItem.x));
            foodImage.css("top", Math.round(level.playItem.y) + 1);
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
                if (soundEnabled) {
                    document.getElementById("successsound").play();
                }
                document.getElementById("goal").style.fontWeight = "bold";

                let levelAchieved = (game.level + 1) / 2;
                let highestLevel = getHighestLevelReached();

                if (levelAchieved > highestLevel) {
                    if (loggedIn === -1) {
                        $.post("accessdb.php", {
                            function: "setHighestLevelAchieved",
                            level: levelAchieved
                        });
                    }
                    setHighestLevelReached(levelAchieved);
                }
                
                if (loggedIn === -2) {
                    let levelCompleted = (game.level - 1) / 2;
                    setTime(levelCompleted, score);
                }

                retryImage.style.display = "none";
                muteImage.style.display = "none";

                setTimeout(function () {
                    $(".extra").css("display", "none");

                    let finalTime = score;

                    let time = document.createElement("p");
                    time.innerHTML = parseTimeForOverlay(finalTime);

                    let actualLevel = (game.level - 1) / 2;
                    let scoreInSeconds = Math.floor(finalTime / 1000);
                    scoreInSeconds = scoreInSeconds + (Math.floor((finalTime - (scoreInSeconds * 1000)) / 100) / 10);
                    $.post("accessdb.php", {
                        function: "saveGame",
                        level: actualLevel,
                        time: finalTime
                    }, function (data) {
                        //alert(data);
                    });

                    let yourTime = document.createElement("p");
                    yourTime.id = "your_time";
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

                    let soundButton = document.createElement("div");
                    soundButton.id = "sound_button";
                    let soundOnImage = document.createElement("img");
                    soundOnImage.src = "img/soundon.png";
                    soundOnImage.alt = "Toggle Sound";
                    let soundOffImage = document.createElement("img");
                    soundOffImage.src = "img/soundoff.png";
                    soundOffImage.alt = "Toggle Sound";
                    if (soundEnabled) {
                        soundButton.appendChild(soundOnImage);
                    } else {
                        soundButton.appendChild(soundOffImage);
                    }

                    soundButton.onclick = function () {
                        if (soundEnabled) {
                            soundEnabled = false;
                            soundButton.removeChild(soundOnImage);
                            soundButton.appendChild(soundOffImage);
                            musicPlayer.pause();
                            document.getElementById("successsound").muted = true;
                            setSoundSettings(false);
                        } else {
                            musicStarted = true;
                            soundEnabled = true;
                            soundButton.removeChild(soundOffImage);
                            soundButton.appendChild(soundOnImage);
                            newTrack();
                            document.getElementById("successsound").muted = false;
                            setSoundSettings(true);
                        }
                    };

                    scoreOverlay.appendChild(soundButton);

                    navBurger.style.top = "2vh";
                    navBurger.style.left = "2vh";
                    navImage.src = "img/menuicon.png";

                    timer.style.display = "none";

                    // show login prompt first if not logged in
                    if (loggedIn === -2) {
                        finalScore.innerHTML = time.innerHTML
                        loginOverlay.style.animation = "fadein 2s";
                        loginOverlay.style.display = "block";
                    } else {
                        scoreOverlay.style.animation = "fadein 2s";
                        scoreOverlay.style.display = "block";
                    }

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
                }, 1000);
            }
        } else if (moveReturnValue === 6) {
            if (game.level === 1) {
                document.getElementById("hint_answer").style.display = "block";
                document.getElementById("tutorialanswer1").style.animation = "pulse 2s alternate infinite";
            }
        }
        drawFoodItem();
        // game timer runs every 5 ms, so score should increment by 5
        score += 5;
        // update score display (timer)
        timer.innerHTML = parseTime(score);
    }

    /**
     * Reinitializes a level.
     */
    function reInit() {
        scoreOverlay.style.display = "none";

        score = 0;
        if (game.level >= 0) {
            navImage.src = "img/menuiconblack.png";
            retryImage.style.display = "block";
            muteImage.style.display = "block";
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

        // log for testing purposes
        // console.log("click");

        // prevents initial input
        if (!clicked && score > 100) {
            let divPosX = $(this).position().left;
            let divPosY = $(this).position().top;
            let mousePosX = e.pageX - divPosX - $(gameContainer).offset().left;
            let mousePosY = e.pageY - divPosY;

            // moves the item based on the click
            playItem.clicked(mousePosX, mousePosY);

            // implements a delay between inputs - currently unused
            // clicked = true;
            // setTimeout(setClicked, 200, false);
        }
    });

    /**
     * Starts playing a new music track, selected at random.
     */
    function newTrack() {
        if (musicStarted) {
            let trackNumber = Math.floor((Math.random() * musicURLs.length));
            musicPlayer.setAttribute("src", musicURLs[trackNumber]);
            if (soundEnabled) {
                musicPlayer.play();
            }
        }
    }
});

/**
 * Parses the score to display it on the in-game timer.
 */
function parseTime(ms) {
    let hours = Math.floor(ms / 1000 / 60 / 60);
    let minutes = Math.floor(ms / 1000 / 60 - hours * 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60 - hours * 60 * 60);
    let milliseconds = ms - seconds * 1000 - minutes * 1000 * 60 - hours * 1000 * 60 * 60;

    let strH = "";
    let strM = minutes === 0 ? "0:" : minutes + ":";
    let strS;
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

    let strH = ""; // unused
    let optionalS = minutes === 1 ? "" : "s";
    let strM = minutes === 0 ? "" : minutes + " minute" + optionalS + " ";
    let strS = seconds;
    let strMS = milliseconds === 0 ? " seconds" : "." + ("" + milliseconds).substr(0, 1) + " seconds";

    return strH + strM + strS + strMS;
}