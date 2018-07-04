class Place implements StoryEntity {
    id: number;
    name: string;
    adjective: string;
    biome: string;
    temperature: number;
    inhabitants?: StoryEntity[];
    constructor(pid: number) {
        this.id = pid;
        this.adjective = getElement(PLACE_ADJECTIVES);
        this.biome = getElement(PLACE_BIOMES);
        this.name = this.adjective + " " + this.biome;
        this.temperature = setPlaceTemperature(this.adjective);
    }
    inhabit(storyEntity:StoryEntity) {
        let foundInhabitant = false;
        // if we have inhabitants....
        if(this.inhabitants) {
            for(let i = 0; i < this.inhabitants.length; i++) {
                // if they already live there, let's just get out of this function
                if(this.inhabitants[i].name === storyEntity.name && this.inhabitants[i].id === storyEntity.id) {
                    foundInhabitant = true;
                    return;
                }
            }
            // if the inhabitant doesn't live there already, let them come in!
            if(!foundInhabitant) {
                this.inhabitants.push(storyEntity);
            }
        }
        // add the first relationship if we don't have one
        else {
            this.inhabitants = [storyEntity];
        }
    }
    leave(storyEntity:StoryEntity) {
        // if we have inhabitants....
        if(this.inhabitants) {
            for(let i = 0; i < this.inhabitants.length; i++) {
                if(this.inhabitants[i].name === storyEntity.name && this.inhabitants[i].id === storyEntity.id) {
                    this.inhabitants.slice(i, 1); // remove storyEntity from place
                }
            }
        }
    }
};
const PLACE_ADJECTIVES:string[] = [
    "muggy",
    "cloudy",
    "temperate",
    "semiarid",
    "coastal",
    "tropical",
    "alpine",
    "boreal"
];
const PLACE_BIOMES:string[] = [
    "field",
    "pond",
    "lake",
    "stream",
    "river",
    "wetlands",
    "ocean",
    "reef",
    "estuary",
    "desert",
    "tundra",
    "savannah",
    "grassland",
    "steppe",
    "forest"
];