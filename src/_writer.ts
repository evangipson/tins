function printInfoAboutItem(storyItem:StoryItem) {
    let associatedItem = findMatchingStoryObjectByName(storyItem.name);
    let returnString = "<p>";
    if(associatedItem.currentPlace instanceof Place) {
        returnString += "it's currently sitting at the "+makeInfoLink(associatedItem.currentPlace.name)+". ";
    }
    else if(associatedItem.currentPlace instanceof StoryAgent) {
        returnString += "it's owned by "+makeInfoLink(associatedItem.currentPlace.name)+", who is residing at the "+makeInfoLink(findMatchingStoryObjectByName(associatedItem.currentPlace.name).currentPlace.name)+". ";
    }
    if(associatedItem.unique) {
        returnString += associatedItem.name + " is the only one of it's kind.";
    }
    return returnString + "</p>";
}
function printInfoAboutAgent(storyAgent:StoryAgent) {
    let associatedAgent = findMatchingStoryObjectByName(storyAgent.name);
    let returnString = "<p>";
    returnString += "they are " + associatedAgent.adjective + " and " + associatedAgent.race + ". ";
    if(associatedAgent.hungry > 95) {
        returnString += "they are starving. ";
    }
    else if(associatedAgent.hungry > 75) {
        returnString += "they are hungry. ";
    }
    else if(associatedAgent.hungry < 25) {
        returnString += "they are full. ";
    }
    if(associatedAgent.thirsty > 95) {
        returnString += "they are dehydrated. ";
    }
    else if(associatedAgent.thirsty > 75) {
        returnString += "they are thirsty. ";
    }
    else if(associatedAgent.thirsty < 25) {
        returnString += "they are satiated. ";
    }
    if(associatedAgent.age > 70) {
        returnString += "they are elderly. ";
    }
    else if(associatedAgent.age > 30) {
        returnString += "they are an adult. ";
    }
    else if(associatedAgent.age < 30) {
        returnString += "they are young. ";
    }
    if(associatedAgent.inventory.length > 0) {
        returnString += "they have the following items on them:<ul>";
        for(let i = 0; i < associatedAgent.inventory.length; i++) {
            returnString += "<li>";
            returnString += makeInfoLink(associatedAgent.inventory[i].name);
            returnString += "</li>";
        }
        returnString += "</ul>";
    }
    if(associatedAgent.relationships) {
        returnString += "they have the following opinions of people:<ul>";
        for(let i = 0; i < associatedAgent.relationships.length; i++) {
            returnString += "<li>";
            if(associatedAgent.relationships[i].liked > 50) {
                returnString += "loves " + makeInfoLink(associatedAgent.relationships[i].name) + " (" + associatedAgent.relationships[i].liked + ")";
            }
            else if(associatedAgent.relationships[i].liked > 0) {
                returnString += "likes " + makeInfoLink(associatedAgent.relationships[i].name) + " (" + associatedAgent.relationships[i].liked + ")";
            }
            else if(associatedAgent.relationships[i].liked > -25) {
                returnString += "dislikes " + makeInfoLink(associatedAgent.relationships[i].name) + " (" + associatedAgent.relationships[i].liked + ")";
            }
            else {
                returnString += "hates " + makeInfoLink(associatedAgent.relationships[i].name) + " (" + associatedAgent.relationships[i].liked + ")";
            }
            returnString += "</li>";
        }
        returnString += "</ul>";
    }
    returnString += "they live at the " + makeInfoLink(associatedAgent.currentPlace.name) + ".";
    return returnString + "</p>";
}
function printInfoAboutPlace(place:Place) {
    let associatedPlace = findMatchingStoryObjectByName(place.name);
    let returnString = "<p>";
    returnString += associatedPlace.name + " is a " + associatedPlace.adjective + ", " + associatedPlace.biome + " region. it is currently " + associatedPlace.temperature.toFixed(2) + " degrees (F) there. ";
    if(associatedPlace.inhabitants) {
        returnString += "the following entities reside there:<ul>";
        for(let i = 0; i < associatedPlace.inhabitants.length; i++) {
            returnString += "<li>";
            returnString += makeInfoLink(associatedPlace.inhabitants[i].name);
            returnString += "</li>";
        }
        returnString += "</ul>";
    }
    return returnString + "</p>";
}
function printInfoAboutStoryEntity(storyEntity:StoryEntity) {
    if(storyEntity instanceof StoryAgent) {
        return printInfoAboutAgent(storyEntity);
    }
    else if(storyEntity instanceof Place) {
        return printInfoAboutPlace(storyEntity);
    }
    else if(storyEntity instanceof StoryItem) {
        return printInfoAboutItem(storyEntity);
    }
}
function outputWorld() {
    let storyElement = <HTMLElement>document.getElementById("Story");
    let scrollListener = <HTMLElement>document.getElementsByClassName("world-output")[0];
    let oldScroll = scrollListener ? scrollListener.scrollTop : 0; // remember old scroll value
    storyElement.innerHTML = ""; // clear out the already printed world
    let returnString = "";
    returnString += "<section class='world-output'><h1 class='main-title'>World Objects</h1><h1>Places</h1><div class='quick-info'>";
    for(let i = 0; i < PLACES.length; i++) {
            returnString += "<div>";
            returnString += "<h2>"+makeInfoLink(PLACES[i].name)+"</h2>";
            returnString += "<p>ID: "+PLACES[i].id+"</p>";
            returnString += "<p>ADJ: "+PLACES[i].adjective+"</p>";
            returnString += "<p>BIOME: "+PLACES[i].biome+"</p>";
            returnString += "<p>TEMP: "+PLACES[i].temperature.toFixed(2)+"(F)</p>";
            returnString += "</div>";
    }
    returnString += "</div><h1>People</h1><div class='quick-info'>";
    for(let i = 0; i < AGENTS.length; i++) {
        returnString += "<div>";
        returnString += "<h2>"+makeInfoLink(AGENTS[i].name)+"</h2>";
        returnString += "<p>ID: "+AGENTS[i].id+"</p>";
        returnString += "<p>ADJ: "+AGENTS[i].adjective+"</p>";
        returnString += "<p>AGE: "+AGENTS[i].age+"</p>";
        returnString += "<p>PLACE: "+makeInfoLink(AGENTS[i].currentPlace.name)+"</p>";
        returnString += "<p>HUNGER: "+AGENTS[i].hungry.toFixed(2)+"%</p>";
        returnString += "<p>THIRST: "+AGENTS[i].thirsty.toFixed(2)+"%</p>";
        returnString += "</div>";
        //returnString += "<p>ITEMS: "+AGENTS[i].inventory.length+"</p>";
    }
    returnString += "</div><h1>Things</h1><div class='quick-info'>";
    for(let i = 0; i < ITEMS.length; i++) {
        returnString += "<div>";
        returnString += "<h2>"+makeInfoLink(ITEMS[i].name)+"</h2>";
        returnString += "<p>ID: "+ITEMS[i].id+"</p>";
        returnString += "<p>ADJ: "+ITEMS[i].adjective+"</p>";
        returnString += "<p>TYPE: "+ITEMS[i].type+"</p>";
        returnString += "<p>PLACE: "+makeInfoLink(ITEMS[i].currentPlace.name)+"</p>";
        returnString += "</div>";
    }
    returnString += "</div></section>";
    storyElement.innerHTML += returnString;
    if(oldScroll != 0) {
        document.getElementsByClassName("world-output")[0].scrollTop = oldScroll; // scroll us back to where we were
    }
}
function scrollDownEventLog(force:boolean = false) {
    let eventLog = <HTMLElement>document.getElementById("EventLog");
    // if the user is scrolled near the bottom...
    let isScrolledToBottom = eventLog.scrollHeight - eventLog.clientHeight <= eventLog.scrollTop + 300;
    if(isScrolledToBottom || force) {
        eventLog.scrollTop = eventLog.scrollHeight - eventLog.clientHeight; // keep window scrolled to bottom
    }
}
function writeStoryEvent() {
    let eventLog = <HTMLElement>document.getElementById("EventLog");
    let tempEvent = createStoryEvent();
    eventLog.innerHTML += "<div>";
    let eventString = "";
    switch(tempEvent.effect.name) {
        case "help":
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is going to help "+makeInfoLink(tempEvent.target.name)+".";
            break;
        case "fight":
        eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is going to fight "+makeInfoLink(tempEvent.target.name)+"!";
            break;
        case "eat":
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is going to eat.";
            break;
        case "drink":
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is going to drink.";
            break;
        case "move":
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" moved to "+makeInfoLink(tempEvent.agent.currentPlace.name)+", where it's currently "+tempEvent.agent.currentPlace.temperature.toFixed(2) +" degrees (F).";
            break;
        case "idolize":
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is idolizing "+makeInfoLink(tempEvent.target.name)+". Ohh la la!";
            break;
        default:
            eventString = "<p>"+makeInfoLink(tempEvent.agent.name)+" is going to interact with"+makeInfoLink(tempEvent.target.name)+" at "+makeInfoLink(tempEvent.agent.currentPlace.name)+"</p>";
            break;
    }
    eventLog.innerHTML += eventString;
    eventLog.innerHTML += "</div>";
    scrollDownEventLog();
    outputWorld(); // update our world view
}
function createUI() {
    initWorld();
    outputWorld(); // draw our world objects
    let createEventButton = <HTMLInputElement>document.getElementById("CreateEvent");
    createEventButton.addEventListener("click", writeStoryEvent);
}