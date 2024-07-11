let cols=3;
let rows = 3;
let size;
let board = [];
let players = ['X', 'O'];
let currentPlayer;
let winner = false;
let winnerLoc = [];
let winnerText;
let whoseTurn;
let scoreTable;
let xPoint = 0;
let oPoint = 0;
const width = 400;
let backgroundMusic;
let musicButton;
let xImage;
let oImage ;
let volumeSlider;
let countRound = 1;
let img;
function preload() {  //background,oImage,xImage,Sound 
  backgroundMusic = loadSound('assets/sound.mp4');
           oImage = loadImage('assets/123.gif');
  xImage = loadImage('assets/giphy.gif');
  img=loadImage('assets/background.jpg');
}
function setup() {
  createCanvas(800, 400);
  size = 400 / cols; //cols=3 size= 400/3
  currentPlayer = players[floor(random(2))]; //randomly selects a player from players array between 0 and 2 (excluding 2) X=0 O=1
  // Start playing background music
  backgroundMusic.play();
  backgroundMusic.loop(); // Loop the music so it plays continuously
  // Create a button to toggle music on/off
  let musicButton;
  musicButton = createButton('Music on/off');
  musicButton.position(450, 350);
  musicButton.mousePressed(toggleMusic); //toggleMusic function en altta 
  whoseTurn = createDiv('').size(200, 25);
  whoseTurn.html(currentPlayer + "'s Turn!");
  whoseTurn.style('color', 'blue');
  whoseTurn.style('font-size', '30px');
  whoseTurn.position(530, 0);
  //for an empty board at the begining of the game
  for (let i = 0; i < cols; i++) { //cols=3
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  volumeSlider = createSlider(0, 1, 0.5, 0.01);//min - max - default - for each step
  volumeSlider.position(550, 350); // Kaydırıcıyı konumlandırın
  volumeSlider.style('width', '200px'); // Kaydırıcı genişliğini ayarlayın
}
function draw() {
  background(img);
  drawBoard();
  drawWinner();
  drawScoreTable();
  backgroundMusic.setVolume(volumeSlider.value());
}
function drawBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rect(i * size, j * size, size, size);
      if (board[i][j] === 'X') {
        // Çizmek istediğin X resminin yolunu belirterek image() fonksiyonunu kullan
        image(xImage, i * size, j * size, size, size);//x,y,width,height
      } else if (board[i][j] === 'O') {
        // Çizmek istediğin O resminin yolunu belirterek image() fonksiyonunu kullan
        image(oImage, i * size, j * size, size, size);
      }
    }
  }
}

function mousePressed() { //başlangıçta winner is false
  if (!winner) {
    let index = [floor(mouseX / size), floor(mouseY / size)]; //fare konumunun hangi hücreye denk geldiğini belirler
    placePieces(index[0], index[1]);//yukarıdan alıyor indexleri
    checkWinner();
  } else { // if winner equals true
    resetGame();
  }
}
function placePieces(x, y) {
  // belirtilen koordinatların (x, y) tahtanın sınırları içinde olduğunu ve belirtilen hücrenin boş olduğunu kontrol eder.
  if (board && board[x] && board[x][y] === 0) { // if board exists
    board[x][y] = currentPlayer;
    winnerText = currentPlayer;
    if (currentPlayer == 'X') {
      currentPlayer = 'O';
      whoseTurn.html(currentPlayer + "'s Turn!");
    } else {
      currentPlayer = 'X';
      whoseTurn.html(currentPlayer + "'s Turn!");
    }
  } else {
    print("Spot not available");
  }
}
function checkWinner() {
  for (let i = 0; i < cols; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) { //horizontal
      winner = true;
      winnerLoc = [1, i];
      if (currentPlayer === 'O') {
        return xPoint += 3;
      } else if (currentPlayer === 'X') {
        return oPoint += 3;
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) { //vertical
      winner = true;
      winnerLoc = [2, i];
      if (currentPlayer === 'O') {
        return xPoint += 3;
      } else if (currentPlayer === 'X') {
        return oPoint += 3;
      }
    }
  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) { //diagonal
    winner = true;
    winnerLoc = [3, 0];
    if (currentPlayer === 'O') {
      return xPoint += 3;
    } else if (currentPlayer === 'X') {
      return oPoint += 3;
    }
  }
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != 0) {
    winner = true;
    winnerLoc = [4, 0];
    if (currentPlayer === 'O') {
      return xPoint += 3;
    } else if (currentPlayer === 'X') {
      return oPoint += 3;
    }
  }
  let draw = true;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 0) {
        draw = false;
        break;
      }
    }
  }
  if (!winner && draw) {
    winner = true;
    winnerText = "Draw!";
    xPoint += 1;
    oPoint += 1;
  }
}
function drawWinner() {
  if (winner) {
    textAlign(CENTER);
    textSize(100);
    strokeWeight(5);
    if (winnerText === "Draw!") {
      text("Draw!", width+400 / 2, height-100);
    } else {
      text(winnerText + " wins!", width + 400 / 2, height - 100);
    }
    if (winnerLoc[0] == 1) { //horizontal
      line(size / 2 + winnerLoc[1] * size, size / 2 + 0 * size, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size);
    } else if (winnerLoc[0] == 2) { //vertical
      line(size / 2 + 0 * size, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size, size / 2 + winnerLoc[1] * size);
    } else if (winnerLoc[0] == 3) { //diagonal sol üstten sağ alta doğru çapraz kazanan
      line(size / 2, size / 2, size / 2 + 2 * size, size / 2 + 2 * size);
    } else if (winnerLoc[0] == 4) { //diagonal sağ üstten sol alta doğru çapraz kazanan
      line(size / 2 + 2 * size, size / 2, size / 2, size / 2 + 2 * size);
    }
  }
  strokeWeight(1);
}
function resetGame() {
  winner = false;
  winnerText = '';
  winnerLoc = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  currentPlayer = players[floor(random(2))];
  whoseTurn.html(currentPlayer + "'s Turn!");
  countRound++;
}
function drawScoreTable() {
  const tableWidth = 150;
  const tableHeight = 100;
  
  rect(500, 100, tableWidth, tableHeight);
  
  textSize(20);
  textAlign(CENTER);
  text("Scoreboard", 574, 90);
  text("X:", 530, 130);
  text("O:", 530, 170);
  text(xPoint, 550, 130);
  text(oPoint, 550, 170);
  text("Round: " + countRound, 570, 70);
}
function toggleMusic() {
  if (backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  } else {
    backgroundMusic.loop();
  }
}
