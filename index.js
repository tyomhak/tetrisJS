import  Game  from "./src/game.js";
import View from "./src/view.js"
import InputHandler from "./src/input_handler.js"

const game = new Game();
const view = new View(320,680,20,10);

window.view = view
window.game = game;

new InputHandler(game,view);


window.requestAnimationFrame(gameLoop);

// render loop
function gameLoop() {
    view.render(game.getState());
    window.requestAnimationFrame(gameLoop)
}


// move the active piece down every second
game.moveDownEverySecond()

