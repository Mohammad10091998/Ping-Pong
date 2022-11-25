const NOOFPLAYER = {
    One : 1,
    Two : 2,
    NotSelected : 0
}

export default class Paddle{
    constructor(game){
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 100;
        this.height = 10;

        this.maxSpeed = 5;
        this.speed = 0;

        this.maxSpeed2 = 5;
        this.speed2 = 0;

        this.position = {
            x: this.gameWidth/2 - this.width/2,
            y: this.gameHeight - this.height - 5
        }

       
        this.position2 = {
            x2: this.gameWidth/2 - this.width/2,
            y2: 5,
        }
        
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    moveLeft2(){
        this.speed2 = - this.maxSpeed2;
    }

    moveRight2(){
        this.speed2 = this.maxSpeed2;
    }

    stop(){
        this.speed = 0;

    }

    stop2(){
        this.speed2 = 0;
    }

    draw(ctx){
        
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.width,this.height);

        if(this.game.noOfPlayer == NOOFPLAYER.Two){
            ctx.fillRect(this.position2.x2,this.position2.y2,this.width,this.height);
        }
    }

    update(deltaTime){
        
        this.position.x += this.speed;

        if(this.position.x < 0){
            this.position.x = 0;
        }
        if(this.position.x + this.width > this.gameWidth ){
            this.position.x = this.gameWidth - this.width - 1;
        }

        if(this.game.noOfPlayer == NOOFPLAYER.Two){

            this.position2.x2 += this.speed2;

            if(this.position2.x2 < 0){
                this.position2.x2 = 0;
            }
            if(this.position2.x2 + this.width > this.gameWidth ){
                this.position2.x2 = this.gameWidth -this.width -1;
            }
        }
       
    }
}