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

                // Não exibe o modal até o movimento estar concluído
                if (this.currentPosition === this.targetPosition && this.currentPosition != tabuleiro.length - 1) {
                    this.showModal(); // Exibe a modal apenas quando o movimento for concluído
                }

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

    // Método para exibir a tela modal com o botão "Fechar"
    showModal() {
        // Cria o modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.id = 'modal';

        // Cria o botão de fechar
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fechar';
        closeButton.style.padding = '10px 20px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => this.closeModal(modal));

        // Adiciona o botão ao modal
        modal.appendChild(closeButton);

        // Adiciona o modal ao corpo do documento
        document.body.appendChild(modal);
    }

    // Método para fechar o modal
    closeModal(modal) {
        document.body.removeChild(modal); // Remove o modal
    }

    // Método para verificar se é a última casa do tabuleiro

}

export default Player;
