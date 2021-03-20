class Paddle {
    constructor(ctx, { x, y }, { width, height }, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    get type() {
        return 'paddle';
    }
}

Paddle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
}

Paddle.prototype.update = function(controls) {
    if (controls.type == "keyboard") {
        if (controls.input.ArrowLeft || controls.input.a || controls.input.A) {
            this.x -= 10;
            if (this.x < 0) {
                this.x = 0;
            }
        } else if (controls.input.ArrowRight || controls.input.d || controls.input.D) {
            this.x += 10;
            if (this.x + this.width > this.ctx.canvas.width) {
                this.x = this.ctx.canvas.width - this.width;
            }
        }
    } else if (controls.type == "mouse") {
        let relativeX = controls.input.clientX - this.ctx.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.ctx.canvas.width) {
            this.x = relativeX - this.width / 2;
        }
    }

    this.draw();
}

export default Paddle;