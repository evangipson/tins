class StoryAgent implements StoryEntity {
    id: number;
    name: string;
    adjective: string;
    currentPlace: Place;
    race: string;
    mood: string;
    age: number;
    hungry: number;
    thirsty: number;
    inventory: StoryItem[];
    children?: StoryAgent[];
    relationships?: [{name: string, liked: number}];
    constructor(pid:number, pplace: Place) {
        this.id = pid;
        this.race = getElement(AGENT_RACES);
        this.name = createFullName();
        this.mood = getElement(AGENT_MOODS);
        this.adjective = getElement(AGENT_ADJECTIVES);
        this.age = getRange(6,80);
        this.hungry = getRange(0, 100);
        this.thirsty = getRange(0, 100);
        this.currentPlace = pplace;
        this.inventory = [];
        pplace.inhabit(this); // don't forget to actually inhabit the place!
    }
    findInventory() {
        let returnInv:StoryItem[] = [];
        for (var i = 0; i < ITEMS.length; i++) {
            if (ITEMS[i].currentPlace.name === this.name) {
                returnInv.push(ITEMS[i]);
            }
        }
        this.inventory = returnInv;
    }
    modifyRelationship(targetAgent:StoryAgent, amount: number) {
        let foundRelationship = false;
        // if we have relationships.... check for an exisitng one
        if(this.relationships) {
            for(let i = 0; i < this.relationships.length; i++) {
                // we already have the relationship!
                if(this.relationships[i].name === targetAgent.name) {
                    this.relationships[i].liked += amount;
                    foundRelationship = true;
                }
            }
            // if we already have relationships and just didn't find this new one, let's make one
            if(!foundRelationship) {
                this.relationships.push({name: targetAgent.name, liked: amount});
            }
        }
        // add the first relationship if we don't have one
        else {
            this.relationships = [{name: targetAgent.name, liked: amount}];
        }
    }
    eat() {
        this.hungry = 0;
    }
    drink() {
        this.thirsty = 0;
    }
    move() {
        this.currentPlace.leave(this);
        let newResidence = getElement(PLACES);
        newResidence.inhabit(this);
        this.currentPlace = newResidence
    }
    getRandomRelation() {
        if(this.relationships) {
            return getElement(this.relationships);
        }
        return false;
    }
    tick() {
        if(this.hungry < 100) {
            this.hungry += Math.random() * getRange(0, 2);
        }
        if(this.thirsty < 100) {
            this.thirsty += Math.random() * getRange(0, 2);
        }
    }
}
const AGENT_ADJECTIVES = [
    "tall",
    "short",
    "ugly",
    "beautiful",
    "merciless",
    "merciful",
    "helpful",
    "stoic",
    "winged",
    "horned",
    "two-headed",
    "three-legged",
    "one-legged",
    "three-armed",
    "one-armed",
    "fat",
    "skinny",
    "muscular",
];
const AGENT_MOODS = [
    "calm",
    "happy",
    "angry",
    "sad"
];
const AGENT_RACES = [
    "human",
    "elf",
    "dwarf",
    "demon",
    "halfdemon",
    "orc",
    "halforc",
    "halfling",
    "robot",
    "artificial intelligence",
];
const NAME_SYLLABLES = [
    // all vowels
    "a","ab","ac","ad","af","ag","aj","ak","al","am","an","ap","aq","ar","as","at","av","aw","ax","ay","az",
    "e","eb","ec","ed","ef","eg","ej","ek","el","em","en","ep","eq","er","es","et","ev","ew","ex","ey","ez",
    "i","ib","ic","id","if","ig","ij","ik","il","im","in","ip","iq","ir","is","it","iv","iw","ix","iz",
    "o","ob","oc","od","of","og","oj","ok","ol","om","on","op","oq","or","os","ot","ov","ow","ox","oy","oz",
    "u","ub","uc","ud","uf","ug","uj","uk","ul","um","un","up","uq","ur","us","ut","uv","uw","ux","uz",
    // all consonants
    "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z",
    // some double consonants
    "bb", "cc", "dd", "ff", "gg", "kk", "ll", "mm", "nn", "pp", "rr", "ss", "tt"
];