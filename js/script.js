/*Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */

const container = document.querySelector('.container');
const createButton = document.getElementById('create-squares');
const levelSelector = document.querySelector('#select-rows');
const bombsNumber = 16;
let bombsArray = [];
let score = 0;


createButton.addEventListener('click', play);

function play(numElements){
  console.log(levelSelector.value);
  createButton.classList.add('hide');
  levelSelector.classList.add('hide');
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
  square.addEventListener('click', clickSquare);
  container.append(square); 
}

function clickSquare(){
  console.log(this.identityNumber);
  
  if(!bombsArray.includes(this.identityNumber)){
    this.innerHTML = this.identityNumber;
    this.classList.add('lightblue');
    score++;
    console.log(score);
    const totalSquares = Math.pow(levelSelector.value,2);
    if(score===totalSquares-bombsNumber){
      console.log('hai vinto!');
    }else{
      console.log('hai perso!');
    }
  }
  
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
  return Math.floor(Math.random()*(max - min)+min);
}
