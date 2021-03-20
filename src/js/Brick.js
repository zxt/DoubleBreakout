class Brick {
    constructor(ctx, { x, y }, { width, height }, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.active = true;
    }

    get type() {
        return 'brick';
    }
}

Brick.prototype.draw = function() {
    if (this.active) {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

class BrickField {
    constructor(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.bricks = [];
    }

    get type() {
        return 'brickfield';
    }

    static init(ctx, { numRows, numCols, width, height, top, left, padding, color }) {
        let bf = new BrickField(numRows, numCols);
        for (let c = 0; c < numCols; c++) {
            bf.bricks[c] = [];
            for (let r = 0; r < numRows; r++) {
                let pos = {
                    'x': (c * (width + padding)) + left,
                    'y': (r * (height + padding)) + top
                }
                bf.bricks[c][r] = new Brick(ctx, pos, { width, height }, color);
            }
        }
        return bf;
    }
}

BrickField.prototype.update = function() {
    for (let c = 0; c < this.numCols; c++) {
        for (let r = 0; r < this.numRows; r++) {
            this.bricks[c][r].draw();
        }
    }
}

export { Brick, BrickField }