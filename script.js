const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;



function flipCard(){

    var somClicou = document.getElementById("beep");

    if(lockBoard) return;
    if(this === firstCard) return;
    somClicou.play();

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}


//VERIFICA IGUALDADE ENTRE AS CARTAS
function checkForMatch(){
    var somAcertou = document.getElementById("acertou");

    if(firstCard.dataset.card === secondCard.dataset.card){
        somAcertou.play();
        disableCards();
        return;
    }

    unflipCards();
}


//CASO A FIRSTCARD E SECONDCARD SEJAM IGUAIS SERÁ RETIRADO A OPÇÃO DE CLICAR 
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


//CASO AS CARTAS SEJAM DIFERENTES ELE VOLTA AO ESTADO INICIAL
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


//EMBARALHAR AS CARTAS
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})