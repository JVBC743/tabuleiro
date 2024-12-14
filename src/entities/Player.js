import Question from "./Question.js";
import Alternative from "./Alternative.js";

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
        this.selectedAnswer = null; // Variável para armazenar a resposta selecionada

        // Questões e alternativas mapeadas
        this.questoes = [
            new Question(1, "Qual é a capital do Brasil?", [1, 2, 3, 4]),
            new Question(2, "Qual é a maior montanha do mundo?", [1, 2, 3, 4])
        ];

        this.alternativas = [
            new Alternative(1, 1, ["Belo Horizonte", "São Paulo", "Brasília", "Cuiabá"], "Brasília"),
            new Alternative(2, 2, ["Everest", "Kilimanjaro", "Aconcágua", "Mont Blanc"], "Everest")
        ];

        // Mapeamento de questões por casa
        this.questoesPorCasa = [
            { casa: 0, pergunta: this.questoes[0], alternativas: this.alternativas.slice(0, 1) },  // Alternativa 1
            { casa: 1, pergunta: this.questoes[1], alternativas: this.alternativas.slice(1, 2) }   // Alternativa 2
        ];
        
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

            // Verifica se targetSquare existe (para evitar erro de índice fora do limite)
            if (!targetSquare) {
                this.isMoving = false;
                return;
            }

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

    // Método para exibir a tela modal com as perguntas e alternativas
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
        modal.style.flexDirection = 'column';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.id = 'modal';

        const casaAtual = this.questoesPorCasa.find(q => q.casa === this.currentPosition);
        const pergunta = casaAtual ? casaAtual.pergunta : null;
        const alternativas = casaAtual ? casaAtual.alternativas : [];

        // Exibe a pergunta
        const perguntaElement = document.createElement('h2');
        perguntaElement.textContent = pergunta ? pergunta.enunciado : 'Pergunta não encontrada';
        modal.appendChild(perguntaElement);

        // Exibe as alternativas
        alternativas.forEach(alternativa => {
            alternativa.respostas.forEach(resposta => {
                const alternativaBtn = document.createElement('button');
                alternativaBtn.textContent = resposta;  // Cada alternativa será exibida em um botão separado
                alternativaBtn.addEventListener('click', () => {
                    this.verificarResposta(resposta);  // Verifica a resposta selecionada
                    this.closeModal(modal);  // Fecha o modal
                });
                modal.appendChild(alternativaBtn);
            });
        });
        
        

        // Cria o botão de fechar
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fechar';
        closeButton.style.padding = '10px 20px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => this.closeModal(modal));

        // Adiciona o botão ao modal
        modal.appendChild(closeButton);

        document.body.appendChild(modal);
    }

    // Método para verificar a resposta selecionada
    checkAnswer(modal) {
        if (this.selectedAnswer === "Brasília") {
            alert('Você acertou!');
        } else {
            alert('Você errou!');
        }
        this.closeModal(modal); // Fecha o modal após a resposta
    }

    // Método para fechar o modal
    closeModal(modal) {
        document.body.removeChild(modal); // Remove o modal
    }
}

export default Player;
