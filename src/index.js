import './styles/main.scss';
import circle from "./images/circle.png";
import cross from "./images/cross.jpeg";
import Face2 from "./images/2face.jpg";
import Face3 from "./images/3face.jpg";
import Face4 from "./images/4face.jpg";
import Face5 from "./images/5face.jpg";
import Face6 from "./images/6face.jpg";
import Face7 from "./images/7face.jpg";
import Face8 from "./images/8face.jpg";
import Face9 from "./images/9face.jpg";
import Face10 from "./images/10face.jpg";
import Face11 from "./images/11face.jpg";
import ring1 from "./images/ring1.png"; 
import ring11 from "./images/ring11.png";
import ring12 from "./images/ring12.png";
import AIbot from "./images/AIbot.jpg";

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
//elements to show results------------------------------------------
let upperHalf = document.getElementById('upper-heading');
let lowerHalf = document.getElementById('lower-heading');
let upperHalfBox = document.getElementById('game');
let lowerHalfBox = document.getElementById('result-end'); 
let resultBox = document.getElementById('result-game');
//------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async function check(board){
    let result = evaluate(board);
    if(result==10){
     upperHalf.innerHTML = "YOU";
     lowerHalf.innerHTML = "Win";
     resultBox.style.display = "inline";
     upperHalfBox.style.transform = "translateY(0)";
     lowerHalfBox.style.transform = "translateY(0)";
    }else if(result == -10){
       upperHalf.innerHTML = "YOU";
       lowerHalf.innerHTML = "LOSE";
       resultBox.style.display = "inline";
       upperHalfBox.style.transform = "translateY(0)";
       lowerHalfBox.style.transform = "translateY(0)";
    }else if(result==0){
       upperHalf.innerHTML = "GAME";
       lowerHalf.innerHTML = "TIE";
       resultBox.style.display = "inline";
       upperHalfBox.style.transform = "translateY(0)";
       lowerHalfBox.style.transform = "translateY(0)";
       alert("game tie");
    }
}

//game js-------------------------------------------------------
function computerGame(board){
    let move = findBestMove(board);
    let box  = document.getElementById(`box-${move}`);
    let clone = shapeArray2[shapeNumber2].cloneNode(true);
    box.appendChild(clone);
    board[move] = 1;    
    console.log(move); 
}

function personGame(board){
   for(let i=0;i<9;i++){
        let box = document.getElementById(`box-${i}`);
        box.addEventListener("click",()=>{
            if(board[i] == 2){
             board[i] = 0;
             let clone = shapeArray[shapeNumber].cloneNode(true);
            box.appendChild(clone);
            }else{
                upperHalf.innerHTML = "THIS STEP IS";
                lowerHalf.innerHTML = "NOT VALID";
                resultBox.style.display = "block";
                upperHalfBox.style.transform = "translateY(0)";
                lowerHalfBox.style.transform = "translateY(0)";
            }
            check(board);
            computerGame(board);
            check(board);
            console.log(board);
        })   
    }
}
personGame(board);


let images = [Face2,Face2,Face3,Face4,Face5,Face6,Face7,Face8,Face9,Face10,Face11];
//customization js------------------------------------------------
let faceNumber  = 0;
let face = document.getElementById('face-img');
let next = document.getElementById('next-face');
let previous = document.getElementById('previous-face')
next.addEventListener("click",()=>{
    faceNumber++;
     if(faceNumber <= 9 && faceNumber>=0){
        face.src = images[faceNumber];
     }else{
         faceNumber = faceNumber - 10;
         face.src = images[faceNumber];
     }
}) 
previous.addEventListener('click',()=>{
    faceNumber--;
     if(faceNumber <=9 && faceNumber >=0){
         face.src = images[faceNumber];
     }else{
         faceNumber = faceNumber + 10;
         face.src = images[faceNumber]; 
    }
})
//------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//shapes customization js--------------------------------------------
let nextShape = document.getElementById('next-shape');
let previousShape = document.getElementById('previous-shape');
let Shape1 = document.getElementById('shape1');
let Shape2 = document.getElementById('shape2');
let Shape3 = document.getElementById('shape3');
let Shape4 = document.getElementById('shape4');
let Shape5 = document.getElementById('shape5');
let shapeArray = [Shape1,Shape2,Shape3,Shape4,Shape5];
let shapeNumber = 0;
nextShape.addEventListener("click",()=>{
    shapeNumber++;
    if(shapeNumber<5 && shapeNumber>=0){
        shapeArray[shapeNumber-1].style.display = "none";
        shapeArray[shapeNumber].style.display = "inline";
    }else{
        shapeNumber = shapeNumber - 5;
        shapeArray[shapeNumber+4].style.display = "none";
        shapeArray[shapeNumber].style.display = "inline";
    }

})
previousShape.addEventListener("click",()=>{
    shapeNumber--;
    if(shapeNumber<5 && shapeNumber>=0){
        shapeArray[shapeNumber+1].style.display = "none";
        shapeArray[shapeNumber].style.display = "block";
    }else{
        shapeNumber = shapeNumber + 5;
        shapeArray[shapeNumber-4].style.display = "none";
        shapeArray[shapeNumber].style.display = "block";
    }
})

let nextShape2 = document.getElementById('next-shape2');
let previousShape2 = document.getElementById('previous-shape2');
let Shape11 = document.getElementById('shape11');
let Shape22 = document.getElementById('shape22');
let Shape33 = document.getElementById('shape33');
let Shape44 = document.getElementById('shape44');
let Shape55 = document.getElementById('shape55');
let shapeArray2 = [Shape11,Shape22,Shape33,Shape44,Shape55];
let shapeNumber2 = 0;
nextShape2.addEventListener("click",()=>{
    shapeNumber2++;
    if(shapeNumber2<5 && shapeNumber2>=0){
        shapeArray2[shapeNumber2-1].style.display = "none";
        shapeArray2[shapeNumber2].style.display = "inline";
        console.log(shapeNumber2);
    }else{
        shapeNumber2 = shapeNumber2 - 5;
        shapeArray2[shapeNumber2+4].style.display = "none";
        shapeArray2[shapeNumber2].style.display = "inline";
    }

})
previousShape2.addEventListener("click",()=>{
    shapeNumber2--;
    if(shapeNumber2<5 && shapeNumber2>=0){
        shapeArray2[shapeNumber2+1].style.display = "none";
        shapeArray2[shapeNumber2].style.display = "block";
    }else{
        shapeNumber2= shapeNumber2 + 5;
        shapeArray2[shapeNumber2-4].style.display = "none";
        shapeArray2[shapeNumber2].style.display = "block";
    }
})

//cool onclick effect on input place -----------------------------------
let input1 = document.getElementById('name-input-1player');
let label1 = document.getElementById('label-1player');
input1.addEventListener("click", ()=>{
    label1.classList.toggle('labelchange');
})


//start-game js---------------------------------------------
let start = document.getElementById('start-gameplay');
start.addEventListener("click",()=>{
    let cover = document.getElementById('cover');
    cover.style.display = "none";
//three-box for showing info v/s----------------------------
let player_first_info = document.getElementById('player-first');
let versus = document.getElementById('versus');
let player_second_info = document.getElementById('player-second');
//player info --------------------------------------------------------------
let firstImg = document.getElementById('first-img');
let secondImg = document.getElementById('second-img');
firstImg.src= images[faceNumber];
secondImg.src= AIbot;
//---------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>

//setting the background image-----------------------------------
let box = document.getElementById('main-box');
box.style.background = `url(${ring1})`;
box.style.backgroundSize = "100%";
box.addEventListener("click",()=>{
    player_first_info.style.transform = "translateY(0)";
    versus.style.transform = "translateY(0)";
    player_second_info.style.transform = "translateY(0)";
    setTimeout(()=>{
        player_first_info.classList.add('after-start-first');
        versus.classList.add('after-start-versus');
        player_second_info.classList.add('after-start-second');
    },5000);
    setTimeout(()=>{
        let gameBoardTic = document.getElementById('container');
        let navbar_game = document.getElementById('navbar-game');
        let logo = document.getElementById('logo');
        let img00 = document.getElementById('versus');
        img00.style.display = "none";
        gameBoardTic.style.display = "block";
        navbar_game.style.transform = "translateY(0)";
        logo.style.transform = "translateY(0)";
    },6000);
    setTimeout(()=>{
        let game = document.getElementById('game');
        let result_end = document.getElementById('result-end');
        game.style.transform = "translateY(0)";
        result_end.style.transform = "translateY(0)";
    },8000)
  })

  //name of the player-------------------------------------
  let name  = document.getElementById('name-input-1player');
  let h1 = document.getElementById("name-first-player");
  h1.textContent = name.value;
})
