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
    player.render(0, 0, WIDTH, HEIGHT);
    computer.render();
    ball.render();
}

let update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
}

function Player() {
    this.paddle = new Paddle(WIDTH / 2, HEIGHT - 20, 60, 20);
}

Player.prototype.render = function () {
    this.paddle.render();
}

function Computer() {
    this.paddle = new Paddle(WIDTH / 2, 0, 60, 20);
}

Computer.prototype.render = function () {
    this.paddle.render();
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 3;
    this.radius = 6;
}

Ball.prototype.render = function () {
    context.fillStyle = "#111";
    context.fill();
}

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
}

Paddle.prototype.render = function () {

}

Paddle.prototype.move = function () {

}

function drawGame() {
    render();
    update();
}

drawGame();


