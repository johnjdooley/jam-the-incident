import QuestController from "./quest_controller.js";
import LocationDetector from "./location_detector.js";

const GameEngineState = Object.freeze({
    QUEST_INFO:   Symbol("quest-info"),
    SEARCH_ITEM:  Symbol("search-item"),
    RESULT: Symbol("result"),
    GAME_END: Symbol("game-end")
});

export default class GameEngine {
    static instance = null; 

    async initialise() {
        this.state = GameEngineState.QUEST_INFO;

        this.locationDetector = new LocationDetector();
        this.locationDetector.initialise();

        this.questController = new QuestController();
        await this.questController.initialise();

        let game_engine = this;

        document.getElementById("search-item-hotspot").addEventListener("click", (event) => {
            event.preventDefault();
            game_engine.state = GameEngineState.RESULT;
            game_engine.initResult(game_engine.questController.getCurrentQuest());
        });

        document.querySelector("#found-item button").addEventListener("click", (event) => {
            event.preventDefault();
            if (game_engine.questController.areAnyUnfinishedQuests()){
                game_engine.questController.completeQuest();
                game_engine.state = GameEngineState.QUEST_INFO;
                game_engine.initQuestInfo(game_engine.questController.getCurrentQuest());
            } else {
                game_engine.state = GameEngineState.GAME_END;
                game_engine.initGameEnd();
            } 
        }); 
        
        document.querySelector("#game-end button").addEventListener("click", (event) => {
            event.preventDefault();
            game_engine.questController.reset();
            game_engine.state = GameEngineState.QUEST_INFO;
            game_engine.initQuestInfo(game_engine.questController.getCurrentQuest());
        });

        document.querySelector("#skip-search").addEventListener("click", (event) => {
            event.preventDefault();
            game_engine.state = GameEngineState.SEARCH_ITEM;
            game_engine.initSearchItem(game_engine.questController.getCurrentQuest());
        }); 

        this.initQuestInfo(this.questController.getCurrentQuest());
        this.initialised = true;
        this.paused = false;
        this.loop = setInterval(() => this.mainLoop(), 1000);
    }

    mainLoop() {
            let currentLocation = this.locationDetector.position;
            let currentQuest = this.questController.getCurrentQuest();
            //document.getElementById("location-debug").textContent = `Lat: ${currentLocation.latitude} Long: ${currentLocation.longitude} Dist: ${currentLocation.distanceInMs(currentQuest.location)}`;
                        
            switch (this.state){
                case GameEngineState.QUEST_INFO:
                    if (currentLocation.distanceInMs(currentQuest.location) < 40){
                        this.state = GameEngineState.SEARCH_ITEM;
                        this.initSearchItem(currentQuest);
                    }
                break;
                case GameEngineState.SEARCH_ITEM:
                                        
                break;
                case GameEngineState.RESULT:
                                        
                break;
            }
    }

    async pause() {
        if (this.initialised){
            this.paused = true;
            console.log("Engine paused");
            clearInterval(this.loop);
            this.locationDetector.clear();
        }
    }

    async resume() {
        if (this.initialised && this.paused){
            console.log("Engine resumed");
            this.loop = setInterval(() => this.mainLoop(), 1000);
            this.locationDetector.initialise();
        }
    }

    initQuestInfo(quest){
        document.querySelector("#quest-info #lost-item-name").textContent = quest.name;
        document.querySelector("#quest-info #lost-item-client").textContent = quest.person;
        document.querySelector("#quest-info #lost-item-image").src = quest.image;
        document.querySelector("#quest-info q").textContent = quest.instructions;
        document.querySelector("#quest-info #lost-item-case-number").textContent = quest.caseNo;
        document.getElementById("quest-info").style.display = 'block';
        document.getElementById("found-item").style.display = 'none';
        document.getElementById("game-end").style.display = 'none';
    }

    initSearchItem(quest){
        document.getElementById("quest-info").style.display = 'none';
        document.getElementById("search-for-item").style.display = 'block';
        document.querySelector("#search-for-item #search-item-image").setAttribute("xlink:href", quest.searchImage);
        document.querySelector("#search-for-item #search-item-name").textContent = quest.name;
        document.querySelector("#search-for-item #search-item-hotspot rect").setAttribute("x", quest.hotspotCoords[0]);
        document.querySelector("#search-for-item #search-item-hotspot rect").setAttribute("y", quest.hotspotCoords[1]);
    }

    initResult(quest){
        document.getElementById("search-for-item").style.display = 'none';
        document.querySelector("#found-item #lost-item-name").textContent = quest.name;
        document.querySelector("#found-item #lost-item-client").textContent = quest.person;
        document.querySelector("#found-item #lost-item-case-number").textContent = quest.caseNo;
        document.getElementById("found-item").style.display = 'block';
    }

    initGameEnd(){
        document.getElementById("found-item").style.display = 'none';
        document.getElementById("game-end").style.display = 'block';
    }
}