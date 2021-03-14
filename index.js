import  Game  from "./src/game.js";
import View from "./src/view.js"
import InputHandler from "./src/input_handler.js"

const game = new Game();
const view = new View(320,640,20,10)

window.view = view
window.game = game;

view.render(game.getState());

new InputHandler(game,view);

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext("2d");
function createRect (ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(50,300, 40, 40);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.fillStroke(50,300, 40, 40);
   
};

createRect(ctx)