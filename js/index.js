import GameEngine from "./game_engine.js";

const gameEngine = new GameEngine();

document.querySelector("#intro .js-button-clicked").addEventListener("click", async (event) => {
    event.preventDefault();
    
    document.getElementById("intro").style.display = 'none';
    await gameEngine.initialise();
    gameEngine.mainLoop();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      gameEngine.pause();
    } else {
      gameEngine.resume();
    }
  });