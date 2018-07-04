class StoryEvent implements StoryObject {
    id: number;
    agent: StoryAgent; // who is carrying out the event?
    target: StoryEntity; // who is it happening to?
    time: number;
    place: Place;
    effect: {name:string, action: Function};
    constructor(pid:number) {
        this.id = pid;
        this.agent = getElement(AGENTS);
        // prefer to interact with people who they like/dislike
        let randomRelation = this.agent.getRandomRelation();
        this.target = randomRelation != false ? randomRelation : getElement(AGENTS);
        this.time = 0;
        this.place = this.agent.currentPlace;
        this.effect = getElement(POTENTIAL_EFFECTS);
        this.effect.action(this.agent, this.target);
        ageWorld();
    }
};
const POTENTIAL_EFFECTS = [
    {
        name: "help",
        action: function(agentA, agentB) {
            agentA.modifyRelationship(agentB, getRange(5, 20));
            if(agentB.modifyRelationship) {
                agentB.modifyRelationship(agentA, getRange(5, 20));
            }
        }
    },
    {
        name: "idolize",
        action: function(agentA, agentB) {
            agentA.modifyRelationship(agentB, getRange(20, 70));
            if(agentB.modifyRelationship) {
                agentB.modifyRelationship(agentA, getRange() > 50 ? getRange(20, 70) : getRange(-50, 0));
            }
        }
    },
    {
        name: "fight",
        action: function(agentA, agentB) {
            agentA.modifyRelationship(agentB, getRange(-20, -5));
            if(agentB.modifyRelationship) {
                agentB.modifyRelationship(agentA, getRange(-20, -5));
            }
        },
    },
    {
        name: "eat",
        action: function(agentA) {
            agentA.eat();
        },
    },
    {
        name: "drink",
        action: function(agentA) {
            agentA.drink();
        },
    },
    {
        name: "move",
        action: function(agentA) {
            agentA.move();
        },
    },
    // { name: "getItem" }
    // { name: "die" }
    // { name: "findItemAtCurrentPlace" }
];