var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var players = ['X', 'O'];

var currentPlayer;
var available = [];

function setup() {
  createCanvas(400, 400);
  frameRate(1);
  currentPlayer = floor(random(players.length));
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  var winner = null;
  var w = width / 3;
  var h = height / 3;

  // horizontal
  for (var i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
    var y = h * i + h / 2;
    line (0, y, width, y);
      winner = board[i][0];
    }
  }

  // Vertical
  for (var i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      var x = w * i + w / 2;
      line (x, 0, x, height);
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
       line(0,0,width,height);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
       line(0, height, width, 0);
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function nextTurn() {
  var index = floor(random(available.length));
  var spot = available.splice(index, 1)[0];
  var i = spot[0];
  var j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
  //background(255);
  var w = width / 3;
  var h = height / 3;
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      var x = w * i + w / 2;
      var y = h * j + h / 2;
      var spot = board[i][j];
      textSize(32);
      var r = w / 4;
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == players[0]) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  var result = checkWinner();
  if (result != null) {
    noLoop();
    var resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    nextTurn();
  }
}


function nextGame() {
    window.location.reload();
}