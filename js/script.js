

const mainGameContainer = document.querySelector('.main-game-container');
const rules = document.querySelector('.rules');
const container = document.querySelector('.container');
const createButton = document.getElementById('create-squares');
const levelSelector = document.querySelector('#select-rows');
const flagsNumber = document.querySelector('#flags');
const scoreNumber = document.querySelector('#score');
const bombsNumber = 40;
const newGame = document.getElementById('new');
newGame.disabled=true;
const output = document.getElementById('result');
let bombsArray = [];
let flagsAmount=0;
let score = 0;


createButton.addEventListener('click', play);

function play(numElements){
  
  createButton.classList.add('hide');
  levelSelector.classList.add('hide');
  mainGameContainer.classList.remove('hide');
  rules.classList.remove('hide');
  container.classList.remove('hide');
  
  const totalSquares = Math.pow(levelSelector.value,2);
  // console.log(totalSquares);

  for(let i=0; i<totalSquares;i++){
    createSquare(i);
  }
  bombsArray= bombsGenerator(totalSquares);
  console.log(bombsArray);
}

function createSquare(idNumber){
  const square = document.createElement('div');
  square.className = 'square';
  square.identityNumber = parseInt(idNumber + 1);
  square.style.width = calcSpaceForCss();
  square.style.height = calcSpaceForCss();
  square.addEventListener('click', clickSquare);
  newGame.disabled=true
  container.append(square); 
}


function clickSquare(){
  
  this.sum=squareAround(this.identityNumber);
  if(window.event.shiftKey){
    this.classList.add('flag');
    console.log('shift', this);
    flagsAmount++;
    flagsNumber.innerHTML=flagsAmount;
  
  }else{
    
    if(this.classList.contains('flag'))
      this.classList.remove('flag')
      if(!bombsArray.includes(this.identityNumber)){
        const squareSpan = document.createElement('span');
        this.append(squareSpan); 
        squareSpan.classList.add('square-span');
        squareSpan.innerHTML = this.sum;
            if(this.sum > 4){
              this.classList.add('red');
            }else if(this.sum == 4){
              this.classList.add('purple')
            }else if(this.sum == 3){
              this.classList.add('orange');
            }else if(this.sum == 2){
              this.classList.add('yellow');
            }else if(this.sum == 1){
              this.classList.add('blue');
            }else if(this.sum == 0){
              this.classList.add('grass');
              
            }else{
              this.classList.add('purple');
            }
            score++;
            scoreNumber.innerHTML=score;
          
          
          const totalSquares = Math.pow(levelSelector.value,2);
          if(score===totalSquares-bombsNumber){
            output.classList.remove('hide');
            output.innerHTML = `Hai vinto il premio Artificiere! Hai raggiunto il punteggio massimo di ${score} punti!`
            newGame.disabled=false;
          }
          
      }else{
          showBombs();
          output.classList.remove('hide');
          if(score===1){
           
          output.innerHTML = `Hai cliccato su una bomba e hai perso! Il tuo punteggio è di ${score} punto.`
          }else{
          output.innerHTML = `Hai cliccato su una bomba e hai perso! Il tuo punteggio è di ${score} punti.`
          }
          newGame.disabled=false;
      }
        
  }
  newGame.addEventListener('click', reset);
  
}



function calcSpaceForCss(){
  return `calc(100% / ${levelSelector.value})`;
}


function bombsGenerator(totalSquares){
  const bombsGenerated = [];
  while(bombsGenerated.length<bombsNumber){
   const singleBomb = generateBombRdmNumber(1,totalSquares);
   if(!bombsGenerated.includes(singleBomb)){
     bombsGenerated.push(singleBomb);
   }
  }
  return bombsGenerated;
}


function squareAround(id){
  const n = parseInt(levelSelector.value)
  let sum=0
  // se i< levelselector, i sta sulla prima riga
  const around = [(id - n -1), (id - n), (id - (n-1)), id-1, id+1, (id +n - 1), (id+n), (id+n+1)]
  for(let i=0; i<around.length; i++){
    //se è nella prima riga
    if(around[i]<=0||around[i]>Math.pow(n,2)) around[i]=0
     //se è nella prima colonna
    if(id%n==1 || id==1){
      around[0]=around[3]=around[5]=0
    }
    if(id%n==0){
      around[2]=around[4]=around[7]=0
    }
    if(bombsArray.includes(around[i])){
      around[i]=1
    }else{
      around[i]=0
    }
    sum+= around[i]
  }
  return sum
}




function generateBombRdmNumber(min,max){
  return Math.floor(Math.random()*(max - min+1)+min);
}




function showBombs(){
  const squares = document.getElementsByClassName('square');
  for (i=0;i<squares.length;i++){
    if(bombsArray.includes(squares[i].identityNumber)){
      squares[i].classList.add('bomb');
      console.log('hai beccato la bomba! punteggio='+score);
      const cover = document.createElement('div');
      cover.className = 'disable-grid';
      container.append(cover);
  
    }
  }
}

function reset(){
  score = 0;
  bombsArray=[];
  output.innerHTML='';
  container.innerHTML='';
  output.classList.add('hide');
  mainGameContainer.classList.add('hide');
  container.classList.add('hide');
  rules.classList.add('hide');
  createButton.classList.remove('hide');
  levelSelector.classList.remove('hide');

};

