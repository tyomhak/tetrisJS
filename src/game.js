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
        //Getting random piece in random positition

        const numOfShapes = this.pieceTemplates.length
        let i = this.getRandomInt(numOfShapes);
        let RandomPiece = this.pieceTemplates[i]
        let randomInt = this.getRandomInt(3);
        for (let x = 0; x < randomInt; x++) {
            RandomPiece = this.rotatePiece(RandomPiece);
        }
        return RandomPiece;
    };

    createPlayField(){
        //creating 2d array with 20 rows and 10 columns
        
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
        //creating new playfield
        const playfield = this.createPlayField();

        const {y : pieceY, x : pieceX , blocks : blocks} = this.activePiece;
        
        //local plafield equal to this.playfield
        for (let y = 0; y < playfield.length; y++) {
            const block = playfield[y];
            for (let x = 0; x < block.length; x++) {
                playfield[y][x] = this.playfield[y][x];
            };
        };
        //adding active piece in playfield using activePiece.x and y coordinates
        
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
    rotatePiece(piece){
        let resultArray = [];
        for (let i = 0; i < piece.length; i++) {
            resultArray.push([])
        };
    
        for (let i = piece.length-1; i >= 0; i--) {
            const element = piece[i]
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                resultArray[j].push(element2)
            };
        };
        return resultArray;
    };
    
    blocksRotateToRight(){
        let blocks = this.activePiece.blocks;
        let resultArray = [];

        const RotatedPiece = this.rotatePiece(blocks);
        
        if(!(this.isPieceOutOfBounds(RotatedPiece))){
            console.log('povernuta');
            this.activePiece.blocks = RotatedPiece;
        }else{
            console.log('ne povernuta')
        };
    };
};