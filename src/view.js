
export {View, ContextView}

class View{
    constructor(width,height,rows,columns,id){
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;
        this.colors = ["#990099","#002699","#260099"];
        this.secondsPassed;
        this.oldTimeStamp;
        this.fps;
    }

    drawLine(){
        const ctx = this.context;
        ctx.beginPath();
 
        ctx.lineTo(0, 90);
        ctx.lineTo(this.width, 90);
        ctx.stroke();

    }
    randomColors (){
        const colorCount = this.colors.length;
        const i = Math.floor(Math.random() * Math.floor(colorCount));
        return this.colors[i];
    }
    createRect (x,y,width,height,color,lineWidth){
        this.context.fillStyle = color;
        this.context.fillRect(x * width , y * height, width, height);
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = 'black';
        this.context.strokeRect(x * width ,y * height ,width,height);
       
    };
    render(playfield,colorfield,piece) {
        this.clearScreen();
        const color = this.randomColors();
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];
            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block) {
                    this.createRect(x,y,this.blockWidth,this.blockHeight,piece,1);
                };
            };
        };
        this.renderColor(colorfield);
        this.drawLine();
    };

    renderColor(colorField){
        for (let y = 0; y < colorField.length; y++) {
            const line = colorField[y];
            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (typeof(block) == 'string') {
                    this.createRect(x,y,this.blockWidth,this.blockHeight,block,1);
                };
            };
        };
    };


    clearScreen(){
        this.context.clearRect(0,0,this.width,this.height);
    };
    
  
};

class ContextView extends View {

    randomPieceField(piece,color){

        const ctx = this.context;
        const nextPieceGrid = [
                                [0,0,0,0],
                                [0,0,0,0],
                                [0,0,0,0],
                                [0,0,0,0],
                            ];
        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece.length; x++) {
                if(piece[y][x]){
                    nextPieceGrid[y][x] = 1;
                };  
            };
        };

        for (let y = 0; y < nextPieceGrid.length; y++) {
            
            for (let x = 0; x < nextPieceGrid[y].length; x++) {
                const block = nextPieceGrid[y][x];
                if (block) {
                    this.createRect(3+x,11.4+y,this.blockWidth,this.blockHeight,'blue')
                };
                if(!(block)){
                    this.createRect(3+x,11.4+y,this.blockWidth,this.blockHeight,'white')
                }
            }; 
        };
    };


    RandomPieceMenu(width,height,positionY){   

        const context = this.context;
        const positionX = this.width/2 - width/2;

        context.fillStyle = '#C2DFFF';
        context.fillRect(positionX ,positionY ,width ,height);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.strokeRect(positionX ,positionY ,width,height);
    };
    TextDrawing (text,width,positionY,px){
        const ctx = this.context;
        const positionX = this.width/2 - width/2;
    
        ctx.font = `${px}px Tetris`;
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'bottom';
        
        ctx.fillText  (text, positionX, positionY);
        
    };

    render(){
        this.clearScreen();
        this.RandomPieceMenu(200,200,200);
        this.TextDrawing('Next Piece',210,200,40);
        this.TextDrawing(`Level = ${game.level}`,210,500,20);
    

        this.TextDrawing(`Score = ${game.score}`,210,530,20);
        this.TextDrawing(`Lines deleted = ${game.lines}`,210,560,20);
        this.TextDrawing(`Press "R" to restart`,210,640,20);

        this.randomPieceField(game.activePiece.nextpiece,game.activePiece.color);
        this.drawLine();
    }

    
    
};