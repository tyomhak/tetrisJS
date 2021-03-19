export default class Game {
    constructor(){
        this.score = 0;
        this.lines = 9;
        this.level = 0;
        this.speed = 1000;
    //     this.playfield = [
    //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //     , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ];
        this.playfield = this.createPlayField();
        this.colorfield = this.createPlayField();
        this.pieceTemplates = [
                [   
                    [0,1,0],
                    [1,1,1],
                    [0,0,0],
                ],
                [   
                    [1,0,0],
                    [0,1,0],
                    [0,0,1],
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
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0],
                ],
                [   
                    [0,0,0,0],
                    [0,1,1,0],
                    [1,0,0,1],
                    [0,0,0,0],
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
                [   
                    [0,0,0,0],
                    [0,1,1,0],
                    [0,1,1,0],
                    [0,0,0,0],
                ],
                
            ];

    this.colors = ["#54C7AB","#87D8EA","#DA16F1","#37F116","#F24B02","#EBE10E"];
 
    this.nextRandomPiece = this.getRandomPiece(),
    this.colorCount  = 0;
                        


    this.activePiece = {
            x:this.getRandomInt(6),
            y:0,
            blocks:this.getRandomPiece(),
            nextpiece : this.nextRandomPiece,
            color: this.getRandomColor(),
            
        };

    };
    getRandomColor(){
        const i = this.getRandomInt(this.colors.length);
        return this.colors[i]
    };
    
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    getRandomPiece(){
        //Getting random piece in random positition

        const numOfShapes = this.pieceTemplates.length;
        let i = this.getRandomInt(numOfShapes);
        let RandomPiece = this.pieceTemplates[i];
        let randomInt = this.getRandomInt(3);
        
        for (let x = 0; x < randomInt; x++) {
            RandomPiece = this.rotatePiece(RandomPiece);
        };
        
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
    newActivePiece(){
        this.activePiece.x = this.getRandomInt(6);
        this.activePiece.y = 0;
        this.activePiece.blocks = this.activePiece.nextpiece;
        this.activePiece.nextpiece = this.getRandomPiece();
        this.colorCount = 0;
        
    };

    // nextRandomPieceCounter(){
    //     if(this.nextRandomPiece.pieceCount == 0){
    //         this.nextRandomPiece.piece = this.getRandomPiece();
    //         this.nextRandomPiece.pieceCount = 1;
    //     };
    // };

    getState(){
        this.looseCheck();
        //creating new playfield
        const playfield = this.createPlayField();
        const colorfield = this.createPlayField();

        let {y : pieceY, x : pieceX , blocks : blocks , color:color} = this.activePiece;

        
        //local plafield equal to this.playfield
        for (let y = 0; y < this.colorfield.length; y++) {
            for (let x = 0; x < this.colorfield[y].length; x++) {
                let element = this.playfield[y][x];
                if(element == 1){
                    if(typeof(this.colorfield[y][x]) != 'string'){
                        this.colorfield[y][x] = color;
                    }
                };
            };
        };
      
        //adding active piece in playfield using activePiece.x and y coordinates

        

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]){
                    playfield[pieceY+y][pieceX+x] = blocks[y][x];
                };
            };
        };

        

        this.LineCheck();

        if (this.colorCount == 0){
            this.activePiece.color = this.getRandomColor();
            this.colorCount = 1;
        }
        // console.log(this.lines,this.level,this.speed);
        return playfield;

    };
    
    movePieceLeft(){
        //moving piece left 
        const blocks = this.activePiece.blocks;
        this.activePiece.x -= 1;
        if (this.isPieceOutOfBounds(blocks)) this.activePiece.x += 1;
    };
    movePieceRight(){
        //moving piece right
        const blocks = this.activePiece.blocks;
        this.activePiece.x += 1;
        if (this.isPieceOutOfBounds(blocks)) this.activePiece.x -= 1;
    };
    movePieceDown(){
        //moving piece down
        const blocks = this.activePiece.blocks;
        this.activePiece.y += 1;
        if (this.isPieceOutOfBounds(blocks)) {
            this.activePiece.y -= 1;
            //while piece is on the another piece or if piece is on the bottom
            //down arrow pressing will immediately lock the piece and call next piece

            this.lockPiece();
            
           
        };
    };
    

    isPieceOutOfBounds(arr){
        /*Checks positions of piece in this.playfield
        and returns boolean true if it is out of range of playfield,false otherwise
        */

        const {y : pieceY,x : pieceX, blocks} = this.activePiece;
        const playfield = this.playfield;
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[y].length; x++) {
                if (
                    arr[y][x] && 
                    (playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined))
                    {
                        return true;
                    };

                if (arr[y][x] && (playfield[pieceY + y][pieceX + x])){
                    return true;
                };
            }
        }
        return false;
    };

    lockPiece () {
        const {y : pieceY,x : pieceX, blocks} = this.activePiece;
        const playfield = this.playfield;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) playfield[pieceY + y][pieceX + x] = blocks[y][x];
            };
            
        };
        
        this.newActivePiece();


    };

    rotatePiece(piece){
        let resultArray = [];
        for (let i = 0; i < piece.length; i++) {
            resultArray.push([])
        };
    
        for (let i = piece.length-1; i >= 0; i--) {
            const element = piece[i];
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
            this.activePiece.blocks = RotatedPiece;
        };
    };

    activePiecePositionCheck(){
        let activePieceY = this.activePiece.y;
        return activePieceY;
    };

    moveDownEverySecond(speed) {
        let localSpeedvar = speed;
        setInterval(() => {
            this.movePieceDown();
        }, localSpeedvar);
    };

    looseCheck(){
        //if top row of playfield includes piece of any shape
        //you will loose.
        const playfield = this.playfield;
        if(playfield[2].includes(1)){
            this.activePiece.blocks = [
                                [0,0,0],
                                [0,0,0],
                                [0,0,0],
                                        ];
        };
    };

    difficultyCheck(){
        if (this.lines >= 10) { 
            this.level += 1;
            this.lines = 0;
            if (this.speed > 600){
                this.speed =  /*this.speed - (this.level * 100)*/ 100;
            };
        };
    };

    LineCheck(){
        //if row is full and no zero in it
        //row will be deleted from playfield
        const playfield =  this.playfield
        const row = [0,0,0,0,0,0,0,0,0,0]
        for (let y = 0; y < playfield.length; y++) {
            if (!(playfield[y].includes(0))){
                playfield.splice(y,1);
                this.colorfield.splice(y,1);
                //adding new empty list in playfield
                playfield.unshift(row);
                this.colorfield.unshift(row);
                this.lines += 1;

                this.score += 10;
            };
        };
        return playfield;
    };
    replay(){
        this.playfield = this.createPlayField();
        this.colorfield = this.createPlayField();
        this.activePiece.x = this.getRandomInt(6)
        this.activePiece.y = 0;
        this.activePiece.blocks = this.getRandomPiece();
        
        this.lines = 0;
        this.score = 0;
        this.speed = 1000;
    };
};