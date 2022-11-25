import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';

const GAMESTATE = {
    Paused : 0,
    Running : 1,
    Menu : 2,
    GameOver : 3
}

const NOOFPLAYER = {
    One : 1,
    Two : 2,
    NotSelected : 0
}

export default class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.Menu;
        this.score = 0;
        
        this.noOfPlayer = NOOFPLAYER.NotSelected;
        this.ball = new Ball(this);

        this.paddle = new Paddle(this);

        new InputHandler(this.paddle,this);
        this.gameObjects = [this.ball,this.paddle];
    }

    start(){
        if(this.gamestate != GAMESTATE.Menu || this.noOfPlayer == NOOFPLAYER.NotSelected){
            return;
        }
        
        this.score = 0;
     

        this.gamestate = GAMESTATE.Running;
       
    }

    restart(){
        this.gamestate = GAMESTATE.Menu;
        this.start();
    }

    singlePlayer(){
        this.noOfPlayer = NOOFPLAYER.One;
    }

    doublePlayer(){
        this.noOfPlayer = NOOFPLAYER.Two;
    }

    update(deltaTime){
        if(this.gamestate === GAMESTATE.Paused || this.gamestate === GAMESTATE.Menu
             || this.gamestate === GAMESTATE.GameOver){
            return;
        }

        this.gameObjects.forEach((objects) => objects.update(deltaTime));
    }

    draw(ctx){
       

        if(this.gamestate == GAMESTATE.Running && this.noOfPlayer == NOOFPLAYER.One){
              
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "black";
            ctx.fill();

            this.gameObjects.forEach((objects) => objects.draw(ctx));
            

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Score : " + this.score, 50,20);
                  
        }
        
        if(this.gamestate == GAMESTATE.Running && this.noOfPlayer == NOOFPLAYER.Two){
              
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "black";
            ctx.fill();

            this.gameObjects.forEach((objects) => objects.draw(ctx));
            
            ctx.beginPath();
            ctx.setLineDash([10,10]);
            ctx.moveTo(0,this.gameHeight/2);
            ctx.lineTo(this.gameWidth,this.gameHeight/2);
            ctx.strokeStyle = "white";
            ctx.stroke();

            ctx.font = "15px Arial";
            ctx.fillStyle = "white";
            
            ctx.fillText("Player2 " , 40,this.gameHeight/2 - 20);
            ctx.fillText("Player1 " , 40,this.gameHeight/2 + 30);
        }


        if(this.gamestate == GAMESTATE.Paused){
          ctx.rect(0,0,this.gameWidth,this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fill();

          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Paused",this.gameWidth/2,this.gameHeight/2);
        }  

        if(this.gamestate == GAMESTATE.Menu){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
  
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            if(this.noOfPlayer == NOOFPLAYER.NotSelected){
                ctx.fillText("Please Select Number of Player", this.gameWidth/2, 60);
                ctx.fillText("Single Player Press 1",this.gameWidth/2,110);
                ctx.fillText("Double Player Press 2",this.gameWidth/2,150);
            }
            
            if(this.noOfPlayer == NOOFPLAYER.One){
                ctx.fillText("Single Player Game", this.gameWidth/2,130);
                ctx.fillText("Press SPACEBAR to Start the Game",this.gameWidth/2,this.gameHeight/2);
            }
 
            if(this.noOfPlayer == NOOFPLAYER.Two){
                ctx.fillText("Double Player Game", this.gameWidth/2,130);
                ctx.fillText("Press SPACEBAR to Start the Game",this.gameWidth/2,this.gameHeight/2);
            }
    
        } 

        

        if(this.gamestate == GAMESTATE.GameOver){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
  
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
         
            

            ctx.fillText("GAME OVER",this.gameWidth/2,this.gameHeight/2);
            ctx.fillText("Press ENTER to go to MENU",this.gameWidth/2 , this.gameHeight/2 + 30);
        } 
    }

    togglePause(){
       if(this.gamestate == GAMESTATE.Paused){
        this.gamestate = GAMESTATE.Running;
       }else{
        this.gamestate = GAMESTATE.Paused;
       }
    }

    gameOver(){
        this.gamestate = GAMESTATE.GameOver;
        this.noOfPlayer = NOOFPLAYER.NotSelected;
    }

    increaseScore(){
        this.score++;
    }
}