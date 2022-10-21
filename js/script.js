/* L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
**Bonus**
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;  */

const container = document.querySelector('.container');
const createButton = document.getElementById('create-squares');
const selector = document.querySelector('#select-rows');


createButton.addEventListener('click', initialize);

function initialize(numElements){
  console.log(selector.value);
  createButton.classList.add('hide');
  selector.classList.add('hide');
  const totalSquares = Math.pow(selector.value,2);
  console.log(totalSquares);

  for(let i=0; i<totalSquares;i++){
    createSquare(i);
  }
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
  this.innerHTML = this.identityNumber;
  this.classList.add('lightblue');
}


function calcSpaceForCss(){
  return `calc(100% / ${selector.value})`;
}


