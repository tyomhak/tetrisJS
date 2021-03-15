export default class Game {
    constructor(){
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.playfield = this.createPlayField();
        this.pieceTemplates = [
                [
                    [0,1,0],
                    [1,1,1],
                    [0,0,0],
                ],
                [
                    [1,1,0],
                    [0,1,1],
                    [0,0,0],
                ],
                [
                    [0,1,1],
                    [1,1,0],
                    [0,0,0],
                ],
                [
                    [0,1,0],
                    [0,1,0],
                    [0,1,0],
                    [0,1,0],
                ],
                [
                    [0,1,1],
                    [0,1,0],
                    [0,1,0],
                ],
                [
                    [1,1,0],
                    [0,1,0],
                    [0,1,0],
                ],
            ];

    this.activePiece = {
            x:0,
            y:0,
            blocks:this.getRandomPiece()
        };

    };

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    getRandomPiece(){

        const numOfShapes = this.pieceTemplates.length
        let i = this.getRandomInt(numOfShapes); 
        return this.pieceTemplates[i];
    };

    createPlayField(){
        const playfield = new Array;
        for (let y = 0; y < 20; y++) {
            playfield.push(new Array);
            for (let x = 0; x < 10; x++) {
                playfield[y].push(0);
            };
        };
        return playfield;
    };
    
    getState(){
        const playfield = this.createPlayField();
        const {y : pieceY, x : pieceX , blocks : blocks} = this.activePiece;
        

        for (let y = 0; y < playfield.length; y++) {
            const block = playfield[y];
            for (let x = 0; x < block.length; x++) {
                playfield[y][x] = this.playfield[y][x];
            };
        };
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]){
                    playfield[pieceY + y][pieceX + x] = blocks[y][x];
                };
            };
            
        };
        return playfield;
    };

    movePieceLeft(){
        const blocks = this.activePiece.blocks;
        this.activePiece.x -= 1;
        if (this.isPieceOutOfBounds(blocks)) this.activePiece.x += 1;
    };
    movePieceRight(){
        const blocks = this.activePiece.blocks;
        this.activePiece.x += 1;
        if (this.isPieceOutOfBounds(blocks)) this.activePiece.x -= 1;
    };
    movePieceDown(){
        const blocks = this.activePiece.blocks;
        this.activePiece.y += 1;
        if (this.isPieceOutOfBounds(blocks)) this.activePiece.y -= 1;
    };
    

    isPieceOutOfBounds(arr){
        const {y : pieceY,x : pieceX, blocks} = this.activePiece;
        const playfield = this.playfield;
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[y].length; x++) {
                if (
                    arr[y][x] && 
                    ((playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined) || 
                    playfield[pieceY + y][pieceX + x]))
                    {
                        return true;
                    }
            }
        }
        return false;
    };

    lockPiece () {
        const {y : pieceY,x : pieceX, blocks} = this.activePiece;
        const playfield = this.playfield;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) playfield[pieceY + y][pieceX + x]  = blocks[y][x];
            };
            
        };
    };

    
    blocksRotateToRight(){
        let blocks = this.activePiece.blocks
        let resultArray = []
        for (let i = 0; i < blocks.length; i++) {
            resultArray.push([])
        };
    
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = blocks[i]
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                resultArray[j].push(element2)
            };
        };
        
        if(!(this.isPieceOutOfBounds(resultArray))){
            console.log('povernuta');
            this.activePiece.blocks = resultArray;
        }else{
            console.log('ne povernuta')
        };
    };
    
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
        this.sleep()
    };


};