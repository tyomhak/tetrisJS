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
                    view.render(game.getState());
                    break;
                case this.right:
                    game.movePieceRight();
                    view.render(game.getState());
                    break;
                case this.down:
                    game.movePieceDown();
                    view.render(game.getState());
                    break;
                case this.up:
                    game.blocksRotateToRight();
                    view.render(game.getState());
                    break;
            };
        });
        // document.addEventListener("keyup" , event => {
        //     switch(event.keyCode) {
        //         case this.left:
        //             if(paddle.speed < 0) paddle.stop();
        //             break;
        //         case this.right:
        //             if(paddle.speed > 0) paddle.stop();
        //             break;
        //     };
        // });
    };
};