export default class InputHandler {
    constructor(game,view,left = 37,right = 39,up = 38,down = 40) {
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
        document.addEventListener("keydown" , event => {
            
            switch(event.keyCode) {
                case this.left:
                    game.movePieceLeft();
                    
                    break;
                case this.right:
                    game.movePieceRight();
                    
                    break;
                case this.down:
                    game.movePieceDown();
                    
                    break;
                case this.up:
                    game.blocksRotateToRight();
                    break;
                case 82:
                    game.replay();
                    break;
            };
            view.render(game.getState(),game.colorfield);
        });
    };
};