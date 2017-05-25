/**
 * A set of functions that handle setting and retrieving cookies.
 */

/**
 * Sets the level cookie, which represents the highest level that a player has reached.
 */
function setHighestLevelReached(level) {
    let d = new Date();
    d.setTime(d.getTime() + 31536000000); // 365 days
    document.cookie = "level=" + level + ";expires=" + d.toUTCString();
}

/**
 * Returns the value of the level cookie, the highest level that a player has reached.
 */
function getHighestLevelReached() {
    var cookieSplit = document.cookie.split(';');
    
    let level = "";
    for (let i = 0; i < cookieSplit.length; i++) {
        let indivCookie = cookieSplit[i];
        while (indivCookie.charAt(0) == ' ') {
            indivCookie = indivCookie.substring(1);
        }
        if (indivCookie.indexOf("level") == 0) {
            level = indivCookie.substring(6, indivCookie.length);
        }
    }
    
    if (level == "") {
        return 0;
    } else {
        return parseInt(level);
    }
}

/**
 * Sets the sound cookie, which stores true if the user has the sound turned on and
 * false otherwise.
 */
function setSoundSettings(soundOn) {
    let d = new Date();
    d.setTime(d.getTime() + 31536000000); // 365 days
    document.cookie = "sound=" + soundOn + ";expires=" + d.toUTCString();
}

/**
 * Returns true if the user has the sound turned on and false otherwise.
 */
function getSoundSettings() {
    var cookieSplit = document.cookie.split(';');
    
    let sound = "";
    for (let i = 0; i < cookieSplit.length; i++) {
        let indivCookie = cookieSplit[i];
        while (indivCookie.charAt(0) == ' ') {
            indivCookie = indivCookie.substring(1);
        }
        if (indivCookie.indexOf("sound") == 0) {
            sound = indivCookie.substring(6, indivCookie.length);
        }
    }
    
    if (sound == "") {
        return 0;
    } else {
        return (sound === "true");
    }
}

/**
 * Stores a cookie corresponding to the user's most recent time on a given level.
 */
function setTime(level, timeInMS) {
    let d = new Date();
    d.setTime(d.getTime() + 86400000); // 24 hours
    document.cookie = "level" + level + "=" + timeInMS + ";expires=" + d.toUTCString();
}