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
            new Question(1, "enunciado"),//azul
            new Question(2, "enunciado"),
            new Question(3, "enunciado"),//azul
            new Question(4, "enunciado"),
            new Question(5, "enunciado"),//azul
            new Question(6, "enunciado"),
            new Question(7, "enunciado"),
            new Question(8, "enunciado"),//azul
            new Question(9, "enunciado"),
            new Question(10, "enunciado"),//azul
            new Question(11, "enunciado"),//azul
            new Question(12, "enunciado"),
            new Question(13, "enunciado"),//azul
            new Question(14, "enunciado"),
            new Question(15, "enunciado"),//azul
            new Question(16, "enunciado"),//azul
            new Question(17, "enunciado"),//azul
            new Question(18, "enunciado"),
            new Question(19, "enunciado"),
            new Question(20, "enunciado"),
            new Question(21, "enunciado"),//azul
            new Question(22, "enunciado"),//azul
            new Question(23, "enunciado"),
            new Question(24, "enunciado"),//azul
            new Question(25, "enunciado"),//azul
            new Question(26, "enunciado"),
            new Question(27, "enunciado"),//azul
            new Question(28, "enunciado"),
            new Question(29, "enunciado"),
            new Question(30, "enunciado"),//azul
            new Question(31, "enunciado"),
            new Question(32, "enunciado"),//azul
            new Question(33, "enunciado"),
            new Question(34, "enunciado"),//azul
            new Question(35, "enunciado"),
            new Question(36, "enunciado"),//azul
            new Question(37, "enunciado"),
            new Question(38, "enunciado"),//azul
            
            // new Question(num, "enunciado")

        ];

        this.alternativas = [
            new Alternative(1, 1, ["Belo Horizonte", "São Paulo", "Brasília", "Cuiabá"], "Brasília"),
            new Alternative(2, 2, ["Everest", "Kilimanjaro", "Aconcágua", "Mont Blanc"], "Everest"),
            new Alternative(3, 3, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(4, 4, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(5, 5, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(6, 6, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(7, 7, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(8, 8, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(9, 9, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(10, 10, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(11, 11, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(12, 12, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(13, 13, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(14, 14, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(15, 15, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(16, 16, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(17, 17, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(18, 18, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(19, 19, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(20, 20, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(21, 21, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(22, 22, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(23, 23, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(24, 24, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(25, 25, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(26, 26, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(27, 27, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(28, 28, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(29, 29, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(30, 30, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(31, 31, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(32, 32, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(33, 33, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(34, 34, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(35, 35, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(36, 36, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(37, 37, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(38, 38, ["A_1", "A_2", "A_3", "A_4"], "RESP"),


            //new Alternative(id_alt, id_perg, ["A_1", "A_2", "A_3", "A_4"], "RESP")
        ];
        

        // Mapeamento de questões por casa
        this.questoesPorCasa = [
            { casa: 1, pergunta: this.questoes[1], alternativas: this.alternativas.slice(1, 2) },  // Alternativa 1
            { casa: 2, pergunta: this.questoes[2], alternativas: this.alternativas.slice(2, 3) }   // Alternativa 2
            //{ casa: 'posicao', pergunta: this.questoes[posicao], alternativas: this.alternativas.slice(prim_valor, seg_valor) }
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
                    this.selectedAnswer = resposta;  // Define a resposta selecionada
                    this.checkAnswer(modal);  // Verifica a resposta selecionada
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

    checkAnswer(modal) {
        // Encontra a alternativa correta, com base na pergunta atual
        const casaAtual = this.questoesPorCasa.find(q => q.casa === this.currentPosition);
        const alternativas = casaAtual ? casaAtual.alternativas : [];
    
        // Encontre a alternativa que é a correta
        const alternativaCorreta = alternativas.find(a => a.respostaCorreta === this.selectedAnswer);
    
        if (alternativaCorreta) {
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
