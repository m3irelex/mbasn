const cards = [
  
  '⚔', '⚔',
  '🏹', '🏹',
  '🛡', '🛡',
  '🗡', '🗡',
  '💣', '💣',
  '🧭', '🧭',
  '🗺', '🗺',
  '🔥', '🔥'
];

let gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Embaralha as cartas
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cria as cartas na tela
function createCards() {
  shuffle(cards);
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Função ao clicar na carta
function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.innerText = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  // Verifica se as cartas combinam
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    // Mantém as cartas viradas
    firstCard = null;
    secondCard = null;
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => alert('Parabéns! Você terminou o jogo!'), 500);
    }
  } else {
    // Não combinam, vira de volta após um tempo
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.innerText = '';
      secondCard.innerText = '';
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// Inicializa o jogo
createCards();

function reiniciarJogo() {
  // redefina as variáveis e reinicie o estado aqui
  pontos = 0;
  vidas = 3;
  iniciarJogo();
}
