class StoryItem implements StoryEntity {
    id: number;
    name: string;
    adjective: string;
    type: string;
    currentPlace: StoryEntity; // could be a place or on a person
    unique: boolean; // is there only 1 of this item?
    constructor(pid:number, pplace:StoryEntity) {
        this.id = pid;
        this.adjective = getElement(ITEM_ADJECTIVES);
        this.unique = true;
        this.type = getElement(ITEM_TYPES);
        this.currentPlace = pplace;
        if(pplace instanceof Place) {
            this.name = this.adjective + " " + this.type + " of the " + this.currentPlace.name;
            pplace.inhabit(this); // don't forget to actually inhabit the place!
        }
        else {
            this.name = this.adjective + " " + this.type + " of " + this.currentPlace.name;
        }
    };
}
const ITEM_ADJECTIVES = [
    "rusty",
    "shiny",
    "iridescent",
    "blazing",
    "freezing",
    "exhausting",
    "ethereal",
    "crystal",
    "golden",
    "powerful",
    "cursed",
];
const ITEM_TYPES = [
    "amulet",
    "ring",
    "necklace",
    "earring",
    "brooch",
    "crown",
    "choker",
    "breastplate",
    "cuirass",
    "vest",
    "potion",
    "wand",
    "staff",
    "sword",
    "spear",
    "falchion",
    "cutlass",
    "scimitar",
    "katana",
    "nodachi",
    "tanto",
    "dagger",
    "club",
    "mace",
    "warhammer",
    "morningstar",
    "flail",
    "halberd",
    "pike",
    "longsword",
    "bastard sword",
    "zweihander",
    "greatsword",
    "scythe",
    "sais",
    "throwing star",
    "chakram",
    "hammer",
    "cudgel",
    "bracelet",
    "beads",
    "marble",
    "book"
];