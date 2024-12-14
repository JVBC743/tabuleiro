class Confete {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // Tamanho aleatório do confete
        this.speed = Math.random() * 3 + 1; // Velocidade aleatória
        this.angle = Math.random() * Math.PI * 2; // Ângulo de queda aleatório
    }

    draw(ctx) {
        ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'; // Cor aleatória
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update(canvas) {
        // Atualiza a posição para criar o efeito de queda
        this.x += Math.sin(this.angle) * this.speed;
        this.y += this.speed;

        // Se o confete alcançar o final da tela, desaparece
        if (this.y > canvas.height) {
            this.y = -10; // Recomeça a queda
        }
    }
}

export default Confete;