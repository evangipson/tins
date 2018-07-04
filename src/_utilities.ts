function getRange(min:number = 0, max:number = 100) {
    return Math.floor(Math.random() * max) + min;
}

function getElement(items:any[]) {
    return items[Math.floor(Math.random()*items.length)];
}

function setPlaceTemperature(location:string) {
    let temp = 0;
    switch(location) {
        case "muggy":
        case "cloudy":
        case "temperate":
            temp = getRange(40,70);
            break;
        case "semiarid":
        case "coastal":
            temp = getRange(50, 80);
            break;
        case "tropical":
            temp = getRange(60, 100);
            break;
        case "alpine":
        case "boreal":
            temp = getRange(0, 40);
            break;
    }
    return temp;
};

function createName() {
    let name: string;
    if(getRange() > 50) {
        name = getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES);
    }
    else {
        if(getRange() > 50) {
            name = getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES);
        }
        else {
            name = getElement(NAME_SYLLABLES) + getElement(NAME_SYLLABLES);
        }
    }
    return name;
}

function createFullName() {
    return createName() + " " + createName();
}
/**
 * This function will take the name of an object
 * and make an "info" link out of it, then return it.
 * @param objectName a name of an object
 */
function makeInfoLink(objectName:string) {
    return '<span onclick="displayInfo(\''+objectName+'\');" class="info">' + objectName + "</span>";
}