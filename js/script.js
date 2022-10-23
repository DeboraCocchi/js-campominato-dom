

const container = document.querySelector('.container');
const createButton = document.getElementById('create-squares');
const levelSelector = document.querySelector('#select-rows');
const bombsNumber = 16;
const newGame = document.createElement('button');
newGame.className = 'btn-newgame';
newGame.innerHTML='Nuova Partita';
const output = document.getElementById('result');
let bombsArray = [];
let score = 0;


createButton.addEventListener('click', play);

function play(numElements){
  
  createButton.classList.add('hide');
  levelSelector.classList.add('hide');
  container.classList.remove('hide');

  const totalSquares = Math.pow(levelSelector.value,2);
  console.log(totalSquares);

  for(let i=0; i<totalSquares;i++){
    createSquare(i);
  }

  bombsArray= bombsGenerator(totalSquares);
  console.log(bombsArray);
}

function createSquare(idNumber){
  const square = document.createElement('div');
  square.className = 'square';
  square.identityNumber = idNumber + 1;
  square.style.width = calcSpaceForCss();
  square.style.height = calcSpaceForCss();
  square.addEventListener('click', clickSquare, {once : true});
  container.append(square); 
}

function clickSquare(){

  output.classList.remove('hide'); 

  if(!bombsArray.includes(this.identityNumber)){
      this.innerHTML = this.identityNumber;
        if(!(this.identityNumber % 3)){
          this.classList.add('purple');
        }else if(!(this.identityNumber % 4)){
          this.classList.add('orange');
        }else{
          this.classList.add('blue');
        }
      

      score++;

      const totalSquares = Math.pow(levelSelector.value,2);
   
      
      if(score===totalSquares-bombsNumber){
        output.innerHTML = `Hai vinto il premio Artificiere! Hai raggiunto il punteggio massimo di ${score} punti!`
        container.append(newGame); 
      }
    
  }else{
      showBombs();
      if(score===1){
      output.innerHTML = `Hai cliccato su una bomba e hai perso! Il tuo punteggio è di ${score} punto.`
      }else{
      output.innerHTML = `Hai cliccato su una bomba e hai perso! Il tuo punteggio è di ${score} punti.`
      }
  
      container.append(newGame);  
    
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
  container.classList.add('hide');
  createButton.classList.remove('hide');
  levelSelector.classList.remove('hide');

};

