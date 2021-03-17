
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
    randomColors (){
        const colorCount = this.colors.length;
        const i = Math.floor(Math.random() * Math.floor(colorCount));
        return this.colors[i];
    }
    createRect (x,y,width,height,color){
        this.context.fillStyle = color;
        this.context.fillRect(x * width , y * height, width, height);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        this.context.strokeRect(x * width ,y * height ,width,height);
       
    };
    render(playfield) {
        this.clearScreen();
        const color = this.randomColors();
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];
            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block) {
                    this.createRect(x,y,this.blockWidth,this.blockHeight,'#c44444');
                };  
            };
        };
    };
    clearScreen(){
        this.context.clearRect(0,0,this.width,this.height);
    };
    
  
};

class ContextView extends View {

    randomPieceField(piece){

        for (let y = 0; y < piece.length; y++) {
            
            for (let x = 0; x < piece[y].length; x++) {
                const block = piece[y][x];
                if (block) {
                    this.createRect(x,y,this.blockWidth,this.blockHeight,'#c44444')
                };
            }; 
        };
    };


    RandomPieceMenu(width,height,positionY)
        {
            const context = this.context;
            const positionX = this.width/2 - width/2;

            context.fillStyle = '#C2DFFF';
            context.fillRect(positionX ,positionY ,width ,height);
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.strokeRect(positionX ,positionY ,width,height);
        };
    TextDrawing (width,positionY,px){
        const ctx = this.context;
        const positionX = this.width/2 - width/2;

        ctx.font = `${px}px Tetris`;
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'bottom';
        ctx.fillText  ('TETRIS', positionX, positionY);
        
    };
    
    
};