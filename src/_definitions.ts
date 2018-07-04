// world variables
let PLACES:Place[] = [];
let ITEMS:StoryItem[] = [];
let AGENTS:StoryAgent[] = [];
let STORYAGENT_ID = 0;
let PLACE_ID = 0;
let ITEM_ID = 0;
let EVENT_ID = 0;
let WORLD_TICK = 0;
let NUMBEROFPLACES:number = getRange(2, 8);
let NUMBEROFITEMS:number = getRange(2, 12);
let NUMBEROFAGENTS:number = getRange(2, 20);

interface StoryObject {
    id: number; // for identifying
}

interface StoryEntity extends StoryObject {
    adjective: string;
    name: string;
}