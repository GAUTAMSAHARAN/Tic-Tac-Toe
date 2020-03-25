import './styles/main.scss';
import circle from "./images/circle.png";
import cross from "./images/cross.jpeg";

//minimax-algorithm for tic-tac-toe---------------------------------------------

//board variable (Array to store update) ------------------------------------
let board = [2,2,2,2,2,2,2,2,2];
//------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//evaluate function ------------------------------------------------
function evaluate(array){
    let count =0;
    //column condition-----------------------------------
    for(let i=0;i<3;i++){
        if(array[i]==array[i+3] && array[i+3]==array[i+6]){
              if(array[i]==1){
                return -10;
              }else if(array[i]==0){
                return 10;
              }
        }
    }
    //------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //row conditoin-------------------------------------
    for(let i=0;i<7;i+=3){
        if(array[i]==array[i+1] && array[i+1]==array[i+2]){
            if(array[i]==1){
               return -10;
            }else if(array[i]==0){
               return 10;
            }
        }
    }
    //--------------------------------->>>>>>>>>>>>>>>>>>
    //diagonal condition---------------------------------
    if(array[0]==array[4] && array[4]==array[7]){
        if(array[0]==1){
           return -10;
        }else if(array[0]==0){
           return 10;
        }
    }
    if(array[2]==array[4] && array[4]==array[6] ){
        if(array[2]==1){
            return -10;
        }else if(array[2]==0){
            return 10;
        }
    }
    //----------------------------->>>>>>>>>>>>>>>>>>>>
//tie condition-------------------------------   
   for(let i=0;i<9;i++){
       if(array[i]!=2){
           count++;
       }
   }
   if(count == 9){
       return 0;
   }
//------------------->>>>>>>>>>>>>>>>>>>>>>>>>>
}

function minimax(array,isAI){   
   //check for terminal case---------------
   let number = evaluate(array);
   if(number==10){
          return 10;
   }else if(number == 0){
          return 0;
   }else if(number == -10){
          return -10;
   }
   //--------------------->>>>>>>>>>>>>>>>>

   //finding empty spots--------->>>>>>>>>>>>>>
   let empytIndex = [];
   for(let i=0;i<9;i++){
       if(array[i]==2){
           empytIndex.push(i);
       }
   }
   //---------------------->>>>>>>>>>>>>>>>>>>

   //cloaning the array------------------------
   //---------------------------->>>>>>>>>>>>>>

   //recursive calls----------------------------
   if(isAI==1){
     let score=[];  
     for(let i=0;i<empytIndex.length;i++){
         array[empytIndex[i]] = 1; 
         score[i] = minimax(array,0);
         array[empytIndex[i]] = 2;
     }
     return Math.min(...score);
    }else{
     let score =[];
     for(let i=0;i<empytIndex.length;i++){
         array[empytIndex[i]] = 0;
         score[i] = minimax(array,1);
         array[empytIndex[i]] = 2;
     }
    return Math.max(...score);
   }
}

//best-move-function------------------------------------------
function findBestMove(numbers){
    let bestMove = 100;

    //finding empty spots--------->>>>>>>>>>>>>>
   let empytIndex = [];
   for(let i=0;i<9;i++){
       if(numbers[i]==2){
           empytIndex.push(i);
       }
   }
   //---------------------->>>>>>>>>>>>>>>>>>>
   let score = []; 
   for(let i=0;i<empytIndex.length;i++){
       numbers[empytIndex[i]] = 1;
       score[i] = minimax(numbers,0);
       numbers[empytIndex[i]] = 2;
   }
   if(Math.min(...score) == -10){
       for(let j=0;j<empytIndex.length;j++){
           if(score[j] == -10){
             bestMove = empytIndex[j];
             break;        
           }
       }
   }else if(Math.min(...score) == 0){
       for(let j=0;j<empytIndex.length;j++){
           if(score[j]==0){
             bestMove = empytIndex[j];
             break;
           }
       }
   }else{
        bestMove = empytIndex[0];
   }
   return bestMove;
}

async function check(board){
    let result = evaluate(board);
    if(result==10){
       alert("you win");
    }else if(result == -10){
       alert("computer win");
    }else if(result==0){
       alert("game tie");
    }
}

//game js-------------------------------------------------------
function computerGame(board){
    let move = findBestMove(board);
    let img  = document.getElementById(`img2-${move}`);
    img.style.display = "block";
    board[move] = 1;    
    console.log(move); 
}

function personGame(board){
   for(let i=0;i<9;i++){
        let box = document.getElementById(`box-${i}`);
        box.addEventListener("click",()=>{
            if(board[i] == 2){
             board[i] = 0;
            let img = document.getElementById(`img1-${i}`);
            img.style.display = "block";
            }else{
                alert("this step is not valid");
            }
            check(board);
            computerGame(board);
            check(board);
            console.log(board);
        })   
    }
}
personGame(board);


