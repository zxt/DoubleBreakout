import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import { BrickField } from "./Brick.js";

class Game {
    constructor(ctx, width, height, settings) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.lastTimestamp = undefined;
        this.actors = [];
        this.settings = settings;
    }
}

Game.prototype.run = function() {
    let paddleSize = {
        'width': 75,
        'height': 10
    };
    let paddlePos = {
        'x': (this.width - paddleSize.width) / 2,
        'y': this.height - paddleSize.height
    };
    let paddleColor = this.settings.paddleColor;
    let paddle = new Paddle(this.ctx, paddlePos, paddleSize, paddleColor);

    let ballPos = {
        'x': this.width / 2,
        'y': this.height - 200
    };
    let ballSpeed = {
        'dx': 3,
        'dy': -3
    };
    let ballRadius = 10;
    let ballColor = this.settings.ballColor;
    let ball = new Ball(this.ctx, ballPos, ballSpeed, ballRadius, ballColor);

    let brickField = {
        'numRows': 5,
        'numCols': 7,
        'width': 75,
        'height': 20,
        'top': 30,
        'left': 25,
        'padding': 10,
        'color': this.settings.brickColor
    }

    let bricks = BrickField.init(this.ctx, brickField);

    this.actors.push(bricks);
    this.actors.push(paddle);
    this.actors.push(ball);

    window.requestAnimationFrame(ts => this.tick(ts));
}

Game.prototype.collisionDetection = function() {
    let bf = this.actors.find(a => a.type == 'brickfield');
    let ball = this.actors.find(a => a.type == "ball");
    let paddle = this.actors.find(a => a.type == "paddle");

    // check for collision of ball -> bricks
    for (let c = 0; c < bf.numCols; c++) {
        for (let r = 0; r < bf.numRows; r++) {
            let b = bf.bricks[c][r];
            if (b.active) {
                if (ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y && ball.y < b.y + b.height) {
                    ball.dy *= -1;
                    b.active = false;
                }
            }
        }
    }

    //check for collision of ball -> paddle
    if (ball.y + ball.dy > this.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy *= -1;
        } else {
            // miss, reset game
            this.actors = [];
            this.run();
        }
    }
}

Game.prototype.update = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let actor of this.actors) {
        actor.update(this.settings.controls);
    }
    this.collisionDetection();
}

Game.prototype.tick = function(timestamp) {
    if (this.lastTimestamp === undefined) {
        this.lastTimestamp = timestamp;
    }

    let elapsed = timestamp - this.lastTimestamp;

    // 1000ms / 60 frames = 16.666...ms/frame
    if (elapsed > 17) {
        this.update();
        this.lastTimestamp = timestamp;
    }

    window.requestAnimationFrame(ts => this.tick(ts));
}

export default Game;