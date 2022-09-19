//states of the game
var diceRoll = "dice roll";
var chooseDiceOrder = "choose dice order";
var findWinner = "find winner";
var gameState = diceRoll;
var currentRollRecords = [];
var allScores = [];
var currentPlayer = 1;
var outPut = ``;

//array of objects [{properties: type}]
var scoreboard = [
  { id: 1, score: 0 },
  { id: 2, score: 0 },
];

var main = function (input) {
  outPut = ``;
  if (gameState == diceRoll) {
    outPut = playerRollDice();
    gameState = chooseDiceOrder;
    return outPut;
  }
  if (gameState == chooseDiceOrder) {
    outPut = getPlayerScore(input);

    scoreTracking(playerRollDice());

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = diceRoll;
      return outPut + "<br>Hey Player 2, It's your turn now. Click to roll.";
    }

    if (currentPlayer == 2) {
      gameState = findWinner;
      return outPut + "CLICK TO FIND OUT WHO WINS!";
    }
  }

  //p1 wins/ draw/ p2 wins
  if (gameState == findWinner) {
    outPut = getWinner();

    //restart the game
    currentPlayer = 1;
    gameState = diceRoll;
    allScores = [];

    return outPut;
  }
};

//random dice roll
var randomDice = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  console.log(randomNum);
  return randomNum;
};

//two - random dice rolls for player and save the score
var playerRollDice = function () {
  var count = 0;
  while (count < 2) {
    currentRollRecords.push(randomDice());
    count++;
  }
  //after rolling, ask player to choose out of two options from his rolls for e.g 21 or 12
  return `Hey Player ${currentPlayer}, Your rolls are: <br><br>Dice One: ${currentRollRecords[0]} <br><br>Dice Two: ${currentRollRecords[1]}<br><br>Now, please enter "1" or "2" to choose the order of your rolls.`;
};

//get player score
var getPlayerScore = function (playerInput) {
  var playerScore;

  if (playerInput != 1 && playerInput != 2) {
    return `Please type either "1" or "2".<br><br>Your Dice Rolls are: <br><br>Dice One: ${currentRollRecords[0]} <br><br>Dice Two: ${currentRollRecords[1]}<br>`;
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(currentRollRecords[0]) + String(currentRollRecords[1])
    );
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(currentRollRecords[1]) + String(currentRollRecords[0])
    );
  }
  allScores.push(playerScore);
  currentRollRecords = [];
  return `Hey Player ${currentPlayer}, Your score is: ${playerScore}<br>`;
};

//find winner
var getWinner = function () {
  outPut = `Player 1 Score: ${allScores[0]} \nPlayer 2 Score: ${allScores[1]}`;

  if (allScores[0] > allScores[1]) {
    outPut = `Player 1 Wins. <br><br> Player 1 Score: ${allScores[0]} <br> Player 2 Score: ${allScores[1]}`;
  } else if (allScores[0] == allScores[1]) {
    outPut = `It is tied. <br><br> Player 1 Score: ${allScores[0]} <br> Player 2 Score: ${allScores[1]}`;
  } else {
    outPut = `Player 2 Wins. <br><br> Player 1 Score: ${allScores[0]} <br> Player 2 Score: ${allScores[1]}`;
  }
  return outPut;
};

//keep track of scores
var scoreTracking = function (totalScore) {
  // If player 1 is playing, add to his score
  if (currentPlayer == 1) {
    scoreboard[0].score += totalScore;
  }
  // If player 2 is playing, add to his score
  if (currentPlayer == 2) {
    scoreboard[1].score += totalScore;
  }
};

var createLeaderboard = function () {
  var leaderboard = "";

  var playerOneScore = scoreboard[0].score;
  var playerTwoScore = scoreboard[1].score;

  leaderboard =
    "Player One: " + playerOneScore + "<br>Player Two: " + playerTwoScore;
  return leaderboard;
};

console.log(createLeaderboard());
