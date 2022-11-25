const NOOFPLAYER = {
    One : 1,
    Two : 2,
    NotSelected : 0
}

const velocityIncreaseWithRate = 0.002;

export default class Ball{
    constructor(game){
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.radius = 10;
        this.position = {
            x: this.gameWidth/2 - this.radius/2,
            y: this.gameHeight/2 - this.radius/2,
        }

        this.speed = {
            x:2,
            y:2,
        }
    }

    reset(){
        this.position.x = this.gameWidth/2 - this.radius/2;
        this.position.y = this.gameHeight/2 - this.radius/2;
        this.speed = {
            x:2,
            y:2
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update(deltaTime){
       
       if(this.speed.x > 0){
        this.speed.x += velocityIncreaseWithRate;
       }else{
        this.speed.x -= velocityIncreaseWithRate;
       }

       if(this.speed.y > 0){
        this.speed.y += velocityIncreaseWithRate;
       }else{
        this.speed.y -= velocityIncreaseWithRate;
       }

       console.log(this.speed.x, this.speed.y);
       this.position.x += this.speed.x;
       this.position.y += this.speed.y
       ;

      this.collisionWithRightAndLeftWall(); 

      this.collisionWithDownPaddle();
      
      if(this.game.noOfPlayer == NOOFPLAYER.One){
        this.collisionWithTopWall();
      }else if(this.game.noOfPlayer == NOOFPLAYER.Two){
        this.collisionWithTopPaddle();
      }
       
    }

    collisionWithRightAndLeftWall(){
       if(this.position.x + this.radius >= this.gameWidth || this.position.x  <= this.radius){
        this.speed.x = -this.speed.x;
       }
    }

    collisionWithTopWall(){
       if(this.position.y <= this.radius){
        this.speed.y = -this.speed.y;
       }
    }

    collisionWithDownPaddle(){   
     
       //collison with floor
       if(this.position.y + this.radius >  this.gameHeight){
           this.game.gameOver();
           this.reset();   
       }
 
       //collision with paddle
       let bottomOfBall = this.position.y + this.radius;

       let topOfPaddle = this.game.paddle.position.y;
       let paddleExtremeLeft = this.game.paddle.position.x;
       let paddleExtremeRight = this.game.paddle.position.x + this.game.paddle.width;

       if(bottomOfBall >= topOfPaddle && this.position.x  >= paddleExtremeLeft
        && this.position.x + this.radius <= paddleExtremeRight){
            
            this.speed.y = -this.speed.y;
           
            this.game.increaseScore();
        }
    
    }

    collisionWithTopPaddle(){
       // collision with ceiling
       if(this.position.y - this.radius < 0){
            this.game.gameOver();
            this.reset();
        }

       let topOfBall = this.position.y - this.radius;

       let bottomOfPaddle = this.game.paddle.position2.y2 + this.game.paddle.height;
       let paddleExtremeLeft = this.game.paddle.position2.x2;
       let paddleExtremeRight = this.game.paddle.position2.x2 + this.game.paddle.width;

       if(topOfBall <= bottomOfPaddle && 
        this.position.x  >= paddleExtremeLeft
         && this.position.x  <= paddleExtremeRight){

            this.speed.y = -this.speed.y;

        }

    }


}