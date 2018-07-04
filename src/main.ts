function createPlace(): Place {
    let createdPlace:Place = new Place(PLACE_ID);
    PLACE_ID++;
    return createdPlace;
}
function createStoryAgent(): StoryAgent {
    let createdAgent:StoryAgent = new StoryAgent(STORYAGENT_ID, getElement(PLACES));
    STORYAGENT_ID++;
    return createdAgent;
}
function createStoryItem(): StoryItem {
    let generatedDestination:StoryEntity = Math.random() > .15 ? getElement(PLACES) : getElement(AGENTS);
    let createdItem:StoryItem = new StoryItem(ITEM_ID, generatedDestination);
    ITEM_ID++;
    return createdItem;
}
function createStoryEvent():StoryEvent {
    let storyEvent:StoryEvent = new StoryEvent(EVENT_ID);
    EVENT_ID++;
    return storyEvent;
}
function createPlaces(): Place[] {
    let placeArray:Place[] = [];
    const numberOfPlaces:number = NUMBEROFPLACES;
    for(let i = 0; i < numberOfPlaces; i++) {
        placeArray.push(createPlace());
    }
    return placeArray;
}
function createStoryAgents(): StoryAgent[] {
    let agentArray:StoryAgent[] = [];
    const numberOfAgents:number = NUMBEROFAGENTS;
    for(let i = 0; i < numberOfAgents; i++) {
        agentArray.push(createStoryAgent());
    }
    return agentArray;
}
function createStoryItems(): StoryItem[] {
    let itemArray:StoryItem[] = [];
    const numberOfItems:number = NUMBEROFITEMS;
    for(let i = 0; i < numberOfItems; i++) {
        itemArray.push(createStoryItem());
    }
    return itemArray;
}
function initWorld() {
    PLACES = createPlaces();
    AGENTS = createStoryAgents();
    ITEMS = createStoryItems();
    AGENTS.forEach(function(agent){
        agent.findInventory();
    });
};
function findMatchingStoryObjectByName(name:string = "") {
    let targetObject;
    for(let i = 0; i < PLACES.length; i++) {
        if(PLACES[i].name === name) {
            targetObject = PLACES[i];
        }
    }
    for(let i = 0; i < AGENTS.length; i++) {
        if(AGENTS[i].name === name) {
            targetObject = AGENTS[i];
        }
    }
    for(let i = 0; i < ITEMS.length; i++) {
        if(ITEMS[i].name === name) {
            targetObject = ITEMS[i];
        }
    }
    return targetObject;
}
function ageWorld() {
    // adjust temp for every place
    for(let i = 0; i < PLACES.length; i++) {
        PLACES[i].temperature += Math.random() * getRange(-1, 1);
    }
    // adjust hungry/thirsty for every agent
    for(let i = 0; i < AGENTS.length; i++) {
        AGENTS[i].tick();
    }
}
function displayInfo(passedName:string) {
    document.getElementById("EventLog").innerHTML += "<div class='info-event'><h3>"+passedName+"</h3>"+printInfoAboutStoryEntity(findMatchingStoryObjectByName(passedName))+"</div>";
    scrollDownEventLog(true); // true to force the scroll
}
(function startWorld() {
    WORLD_TICK = setInterval(writeStoryEvent, getRange(2500, 5000));
    createUI();
})();