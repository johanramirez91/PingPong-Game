const canvas = document.getElementById('pingpong');
const WIDTH = 800, HEIGHT = 500;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = '#ddd';
const context = canvas.getContext('2d');

var keydowns = {};
var player = new Player();
var computer = new Computer();
var ball = new Ball(WIDTH / 2 + 10, HEIGHT / 2);

document.addEventListener('keydown', function (event) {
    keydowns[event.code] = true;
})

document.addEventListener('keyup', function (event) {
    delete keydowns[event.code];
})

let render = function () {
    player.render();
    computer.render();
    ball.render();
}

let update = function () {
    player.update();
    computer.update();
    ball.update();
}

function Player() {

}

function Computer() {

}

function Ball(x, y) {
    this.x = x;
    this.y = y;
}

function drawGame() {
    render();
    update();
}

drawGame();


