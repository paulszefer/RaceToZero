function setHighestLevelReached(level) {
    let d = new Date();
    d.setTime(d.getTime() + 2076300000); // 365 days
    document.cookie = "level=" + level + ";expires=" + d.toUTCString();
}

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

function setSoundSettings(soundOn) {
    let d = new Date();
    d.setTime(d.getTime() + 2076300000); // 365 days
    document.cookie = "sound=" + soundOn + ";expires=" + d.toUTCString();
}

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