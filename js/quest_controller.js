
import Quest from "./quest.js";

export default class QuestController {
    async initialise() {
        const response = await fetch("./js/data.json");
        this.quests = [];
        this.questI = 0;
        const data = await response.json();
        for (const questData of data.quests) {
            this.quests.push(new Quest(...questData));
        }
        console.log(this.quests);  
    }

    reset() {
        this.questI = 0;
    }

    getCurrentQuest(){
        return this.quests[this.questI];
    }

    completeQuest(){
        this.questI++;
    }

    areAnyUnfinishedQuests(){
        return this.questI < this.quests.length - 1;
    }
}