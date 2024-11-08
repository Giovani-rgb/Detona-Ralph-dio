const state = {
  views: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#TimeLeft"),
    score: document.querySelector("#Score"),
    lives: document.querySelector("#Lives"),
  },
  values: {
    timeId: null,
    velocityTime: 1000,
    hitPosition: null,
    result: 0,
    timeRemaining: 60,
    lives: 3,
    countdownId: null
  }
};

function moveEnemy() {
  state.values.timeId = setInterval(() => {
    // Gera uma nova posição para o inimigo e define um timer para perda de vida
    randomSquare();
    state.values.missTimeout = setTimeout(() => {
      // Se o jogador não clicou no inimigo, perde uma vida
      if (state.values.hitPosition !== null) {
        loseLife();
      }
    }, state.values.velocityTime);
  }, state.values.velocityTime);
}

function randomSquare() {
  // Remove a classe "enemy" de todos os quadrados e define um novo quadrado aleatório
  state.views.squares.forEach((square) => square.classList.remove("enemy"));
  
  let randomNumber = Math.floor(Math.random() * state.views.squares.length);
  let randomSquare = state.views.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerClick() {
  state.views.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.views.score.textContent = state.values.result;
        state.values.hitPosition = null;
        clearTimeout(state.values.missTimeout); // Cancela a perda de vida se o inimigo for clicado
      }
    });
  });
}

function loseLife() {
  if (state.values.lives > 0) {
    state.values.lives--;
    state.views.lives.textContent = state.values.lives;

    if (state.values.lives <= 0) {
      endGame("Você perdeu todas as suas vidas! Fim de jogo.");
    }
  }
}

function startCountdown() {
  state.values.countdownId = setInterval(() => {
    if (state.values.timeRemaining > 0) {
      state.values.timeRemaining--;
      state.views.timeLeft.textContent = state.values.timeRemaining;
    } else {
      endGame("Tempo esgotado!");
    }
  }, 1000);
}

function endGame(message) {
  clearInterval(state.values.countdownId);
  clearInterval(state.values.timeId);
  alert(message);
}

function init() {
  moveEnemy();
  addListenerClick();
  startCountdown();
  state.views.lives.textContent = state.values.lives; // Exibe as vidas iniciais
}

init();
