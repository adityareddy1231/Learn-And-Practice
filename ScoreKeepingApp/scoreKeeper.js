var totalGames = 0;
var player1 = 0;
var player2 = 0;

var inputTG = document.querySelector('input');

var button1 = document.querySelector(".player1button");

var button2 = document.querySelector(".player2button");

var reset = document.querySelector(".reset");

var player1score = document.querySelector(".player1");

var player2score = document.querySelector(".player2");

var winner = document.querySelector(".winner");



inputTG.addEventListener('input', function() {
  totalGames = inputTG.value;
  console.log(totalGames);
});

function checkwinner () {
  if (player1 == totalGames || player2 == totalGames) {
    if (player1 == totalGames) {
      player1score.classList.add("green");
      winner.innerHTML = "Player 1 is the winner of this game";
    }
    else if (player2 == totalGames) {
      player2score.classList.add("green");
      winner.innerHTML = "Player 2 is the winner of this game";
    }
  }
}

button1.addEventListener('click', function() {
  if (player1 < totalGames && player2 != totalGames) {
    player1++;
    console.log(player1);
    player1score.innerHTML = player1;
  }
  if (player1 != 0 || player2 != 0) {
    checkwinner();
  }

});

button2.addEventListener('click', function() {
  if (player2 < totalGames && player1 != totalGames) {
    player2++;
    console.log(player2);
    player2score.innerHTML = player2;
  }

  if (player1 != 0 || player2 != 0) {
    checkwinner();
}});

reset.addEventListener('click', function(e) {
  if (player1 == totalGames || player2 == totalGames) {
    console.log("it works");
    totalGames = 0;
    player1 = 0;
    player2 = 0;
    player1score.innerHTML = 0;
    player2score.innerHTML = 0;
    document.querySelector('.mygame').reset();
    player2score.classList.remove("green");
    player1score.classList.remove("green");
    winner.innerHTML = "The winner is yet to be decided";
  }
});
