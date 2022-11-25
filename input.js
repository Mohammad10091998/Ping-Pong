const GAMESTATE = {
    Paused : 0,
    Running : 1,
    Menu : 2,
    GameOver : 3
}

export default class InputHandler{
    constructor(paddle,game){
        document.addEventListener('keydown',(event) => {
            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                    break;
                
                case 39:  
                     paddle.moveRight();
                     break;  

                case 65:
                    paddle.moveLeft2();
                    break;

                case 83:
                    paddle.moveRight2();
                    break;    

                case 27:
                    game.togglePause(); 
                    break;
                    
                case 32:
                    game.start();    
                    break;

                case 13:
                    game.restart();
                    break;  
                   
                case 49:
                    game.singlePlayer();
                    break;
                 
                case 50:
                    game.doublePlayer();
                    break;    
                }    
            
        });
 
        document.addEventListener('keyup',(event) => {
            switch(event.keyCode){
                case 37:
                    if(paddle.speed < 0){
                       paddle.stop();
                    }
                    break;
                
                case 39:
                    if(paddle.speed > 0){
                       paddle.stop();
                    }
                    break;
                    
                case 65 :
                    if(paddle.speed2 < 0){
                        paddle.stop2();
                    }
                    break;
                    
                case 83 :
                    if(paddle.speed2 > 0){
                        paddle.stop2();    
                    }    
                    break;
            }
        })
    }
}