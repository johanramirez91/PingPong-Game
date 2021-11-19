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
    context.clearRect(0, 0, WIDTH, HEIGHT);
    player.render();
    computer.render();
    ball.render();
}

let update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
}

function Player() {
    this.paddle = new Paddle(WIDTH / 2 - 30, HEIGHT - 20, 80, 20);
}

Player.prototype.render = function () {
    this.paddle.render();
}

Player.prototype.update = function () {
    for (let key in keydowns) {
        if (key == "ArrowLeft") {
            this.paddle.move(-5, HEIGHT - 15);
        } else if (key == "ArrowRight") {
            this.paddle.move(4, HEIGHT - 15);
        } else {
            this.paddle.move(0, HEIGHT - 15);
        }
    }
}

function Computer() {
    this.paddle = new Paddle(WIDTH / 2 - 30, 0, 80, 20);
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
    context.beginPath();
    context.fillStyle = "#111";
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
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
    context.beginPath();
    context.fillStyle = "#111";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
}

Paddle.prototype.move = function () {
    this.x += x;
    this.y = y;
    this.xSpeed = x;
    this.ySpeed = y;
    if (this.x < 0) {
        this.x = 0;
        this.xSpeed = 0;
    } else if (this.x + this.width > WIDTH) {
        this.x = WIDTH - this.width;
        this.xSpeed = 0;
    }
}

function drawGame() {
    render();
    update();
    requestAnimationFrame(drawGame);
}

drawGame();


