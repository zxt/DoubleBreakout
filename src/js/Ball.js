class Ball {
    constructor(ctx, { x, y }, { dx, dy }, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    get type() {
        return 'ball';
    }
}

Ball.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
}

Ball.prototype.update = function() {

    if (this.x + this.dx > this.ctx.canvas.width - this.radius || this.x + this.dx < this.radius) {
        this.dx *= -1;
    }
    if (this.y + this.dy < this.radius) {
        this.dy *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
}

export default Ball;