const canvas = document.getElementById('pingpong');
const WIDTH = 800, HEIGHT = 500;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = '#ddd';
const context = canvas.getContext('2d');

var keydowns = {};
var playerScore = 0;
var computerScore = 0;
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
    drawText(playerScore, canvas.width / 2, canvas.height - 60);
    drawText(computerScore, canvas.width / 2, canvas.height / 5);
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
            this.paddle.move(-5, HEIGHT - 20);
        } else if (key == "ArrowRight") {
            this.paddle.move(4, HEIGHT - 20);
        } else {
            this.paddle.move(0, HEIGHT - 20);
        }
    }
}

function Computer() {
    this.paddle = new Paddle(WIDTH / 2 - 30, 0, 80, 20);
}

Computer.prototype.render = function () {
    this.paddle.render();
}

Computer.prototype.update = function (ball) {
    var diff = -((this.paddle.x + (this.paddle.width / 2) - ball.x));
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
        this.paddle = 0;
    } else if (this.x + this.width > WIDTH) {
        this.x = WIDTH - this.width;
    }
};

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

Paddle.prototype.move = function (x, y) {
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

Ball.prototype.update = function (playerPaddle, computerPaddle) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x - this.radius < 0) {
        this.x = 5;
        this.xSpeed = -this.xSpeed;
    } else if (this.x + this.radius > WIDTH) {
        this.x = WIDTH - this.radius;
        this.xSpeed = -this.xSpeed;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > HEIGHT) {
        if (this.y < 0) {
            playerScore += 1;
        } else if (this.y + this.radius > HEIGHT) {
            computerScore += 1;
        }
        this.xSpeed = 0;
        this.ySpeed = 4;
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
    }

    if (this.y > WIDTH / 2) {
        if ((this.y - this.radius) < (playerPaddle.y + playerPaddle.height) && (this.y + this.radius) > playerPaddle.y && (this.x - this.radius) < (playerPaddle.x + playerPaddle.width) && (this.x + this.radius) > playerPaddle.x) {
            this.ySpeed = -this.ySpeed;
            this.xSpeed += (playerPaddle.xSpeed / 2);
            this.y += this.ySpeed;
        }
    } else {
        if ((this.y - this.radius) < (computerPaddle.y + computerPaddle.height) && (this.y + this.radius) > computerPaddle.y && (this.x - this.radius) < (computerPaddle.x + computerPaddle.width) && (this.x + this.radius) > computerPaddle.x) {
            this.ySpeed = -this.ySpeed;
            this.x += (computerPaddle.xSpeed / 2);
            this.y += this.ySpeed;
        }
    }
};

function drawText(text, x, y) {
    context.fillStyle = "#111";
    context.font = "40px fantasy";
    context.fillText(text, x, y);
}

function drawGame() {
    render();
    update();
    requestAnimationFrame(drawGame);
}

drawGame();