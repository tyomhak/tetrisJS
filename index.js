
import  Game  from "./src/game.js";
import { View, ContextView } from "./src/view.js"
import InputHandler from "./src/input_handler.js"

const game = new Game();
const view = new View(320,680,20,10,'gameScreen');
const view2 = new ContextView(250,680,30,10,'gameScreen2');

window.view = view
window.game = game;



new InputHandler(game,view);


window.requestAnimationFrame(gameLoop);

// render loop
function gameLoop() {
    

    view.render(game.getState(),game.activePiece.color);
    view.renderColor(game.colorfield);
    window.requestAnimationFrame(gameLoop);
    view2.RandomPieceMenu(200,200,200);
    view2.TextDrawing('Next Piece',210,200,40);
    view2.randomPieceField(game.activePiece.nextpiece,"blue");
};
game.moveDownEverySecond(game.speed);


// move the active piece down every second

