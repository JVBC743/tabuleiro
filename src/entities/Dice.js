class Dice {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.currentValue = 1;  // Valor inicial
        this.isRolling = false;  // Para saber se está rolando
        this.rotation = 0; // Rotação atual do dado
        this.targetRotation = 0; // Rotação para o valor sorteado
    }

    // Verifica se o clique foi dentro do dado
    isClicked(mouseX, mouseY) {
        const distX = mouseX - (this.x + this.size / 2);
        const distY = mouseY - (this.y + this.size / 2);
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance <= this.size / 2;
    }

    // Método para iniciar a rolagem do dado
    roll() {
        if (this.isRolling) return; // Se já estiver rolando, não faz nada

        this.isRolling = true;
        this.targetRotation = Math.floor(Math.random() * 6) * 90; // Sorteia um valor entre 0 e 5 e multiplica por 90 (ângulos de rotação)

        // Seta o valor do dado
        this.currentValue = (this.targetRotation / 90) + 1;

        // Reseta a rotação para garantir a animação completa da próxima vez
        this.rotation = 0;

        // Anima a rotação
        this.animateRoll();
    }

    // Método para desenhar o dado
    draw(ctx) {
        ctx.save(); // Salva o estado atual do contexto

        // Translada o canvas para o centro do dado
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate((Math.PI / 180) * this.rotation); // Aplica a rotação

        // Desenha o dado (um quadrado)
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size); // Desenha o dado

        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size); // Desenha o contorno do dado

        // Desenha os pontos no dado de acordo com o valor
        this.drawDots(ctx);

        ctx.restore(); // Restaura o estado do contexto
    }

    // Método para desenhar os pontos no dado conforme o valor sorteado
    drawDots(ctx) {
        const spacing = this.size / 6; // O espaçamento entre os pontos

        const drawDot = (x, y) => {
            ctx.beginPath();
            ctx.arc(x, y, spacing / 4, 0, Math.PI * 2, false);
            ctx.fillStyle = '#000';
            ctx.fill();
        };

        switch (this.currentValue) {
            case 1:
                drawDot(0, 0); // Um ponto no centro
                break;
            case 2:
                drawDot(-spacing / 2, -spacing / 2); // Canto superior esquerdo
                drawDot(spacing / 2, spacing / 2); // Canto inferior direito
                break;
            case 3:
                drawDot(-spacing / 2, -spacing / 2); // Canto superior esquerdo
                drawDot(0, 0); // Centro
                drawDot(spacing / 2, spacing / 2); // Canto inferior direito
                break;
            case 4:
                drawDot(-spacing / 2, -spacing / 2); // Canto superior esquerdo
                drawDot(spacing / 2, -spacing / 2); // Canto superior direito
                drawDot(-spacing / 2, spacing / 2); // Canto inferior esquerdo
                drawDot(spacing / 2, spacing / 2); // Canto inferior direito
                break;
            case 5:
                drawDot(-spacing / 2, -spacing / 2); // Canto superior esquerdo
                drawDot(spacing / 2, -spacing / 2); // Canto superior direito
                drawDot(0, 0); // Centro
                drawDot(-spacing / 2, spacing / 2); // Canto inferior esquerdo
                drawDot(spacing / 2, spacing / 2); // Canto inferior direito
                break;
            case 6:
                drawDot(-spacing / 2, -spacing / 2); // Canto superior esquerdo
                drawDot(spacing / 2, -spacing / 2); // Canto superior direito
                drawDot(-spacing / 2, 0); // Centro esquerdo
                drawDot(spacing / 2, 0); // Centro direito
                drawDot(-spacing / 2, spacing / 2); // Canto inferior esquerdo
                drawDot(spacing / 2, spacing / 2); // Canto inferior direito
                break;
        }
    }

    // Animação de rotação do dado
    animateRoll() {
        let rotationSpeed = 6; // Velocidade da rotação
        let animationFrame = () => {
            if (this.rotation < this.targetRotation) {
                this.rotation += rotationSpeed;
                if (this.rotation > this.targetRotation) this.rotation = this.targetRotation;
                requestAnimationFrame(animationFrame);
            } else {
                this.isRolling = false; // Fim da animação de rotação
            }
        };
        animationFrame();
    }
}

export default Dice;
