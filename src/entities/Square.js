class Square {

    constructor(x, y, width, height, color, borderColor, borderWidth, position) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.borderColor = borderColor;  // Cor da borda
        this.borderWidth = borderWidth;  // Largura da borda
        this.position = position
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height); // Desenha um retângulo (representação da entidade)
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export default Square;