class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.currentPosition = 0; // Posição no tabuleiro
        this.targetPosition = 0; // Posição alvo
        this.isMoving = false; // Flag para saber se está se movendo
        this.moveSpeed = 0.09; // Velocidade do movimento (quanto menor, mais lento)
        this.direction = 1; // Direção do movimento (1 para frente, -1 para trás)
        this.animationFrameId = null; // Para armazenar o id da animação
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 4, 0, Math.PI * 2);  // Desenhando o peão como um círculo
        ctx.fill();
    }

    // Método para mover o jogador para frente
    moveForward(steps, tabuleiro) {
        if (!this.isMoving) {
            this.targetPosition = this.currentPosition + steps;
            if (this.targetPosition >= tabuleiro.length) {
                this.targetPosition = tabuleiro.length - 1; // Limita a posição final
            }

            this.isMoving = true; // Inicia a animação de movimento
            this.moveToNextSquare(tabuleiro);
        }
    }
    // Método para centralizar o jogador em um square
    moveToSquare(square) {
        // Calcula a posição central do square
        this.targetX = square.x + (square.width - this.width) / 2;
        this.targetY = square.y + (square.height - this.height) / 2;

        // Atualiza a posição atual do jogador para a posição central do quadrado
        this.x = this.targetX;
        this.y = this.targetY;
    }

    // Método para mover o jogador uma casa de cada vez
    moveToNextSquare(tabuleiro) {
        if (this.isMoving && this.currentPosition !== this.targetPosition) {
            const currentSquare = tabuleiro[this.currentPosition];
            const targetSquare = tabuleiro[this.currentPosition + this.direction];

            // Calcula a posição intermediária para a animação
            const targetX = targetSquare.x + (targetSquare.width - this.width) / 2;
            const targetY = targetSquare.y + (targetSquare.height - this.height) / 2;

            // Desloca o jogador em direção à próxima casa
            const dx = targetX - this.x;
            const dy = targetY - this.y;

            // Move o jogador na direção do próximo quadrado
            this.x += dx * this.moveSpeed;
            this.y += dy * this.moveSpeed;

            // Verifica se o jogador alcançou a próxima casa
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                // Atualiza a posição e avança para a próxima
                this.x = targetX;
                this.y = targetY;
                this.currentPosition += this.direction;

                // Continua a animação se não alcançou o objetivo final
                if (this.currentPosition !== this.targetPosition) {
                    requestAnimationFrame(() => this.moveToNextSquare(tabuleiro)); // Próxima animação
                } else {
                    this.isMoving = false; // Finaliza a movimentação
                }
            } else {
                // Continua movendo até a próxima casa
                requestAnimationFrame(() => this.moveToNextSquare(tabuleiro));
            }
        }
    }

    // Método para mover o jogador para trás (regredir)
    moveBackward(steps, tabuleiro) {
        if (!this.isMoving) {
            this.targetPosition = this.currentPosition - steps;
            if (this.targetPosition < 0) {
                this.targetPosition = 0; // Limita a posição inicial
            }

            this.isMoving = true; // Inicia o movimento para trás
            this.direction = -1; // Direção para trás
            this.moveToNextSquare(tabuleiro);
        }
    }
}


export default Player;