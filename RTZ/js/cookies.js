function setHighestLevelReached(level) {
    let d = new Date();
    d.setTime(d.getTime() + 86400000); // 24 hours
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