import Square from "../src/entities/Square.js";
import Player from "../src/entities/Player.js";
import Question from "../src/entities/Question.js"
import Alternative from "../src/entities/Alternative.js"
import Dice from "../src/entities/Dice.js";
import Confete from "./entities/Confete.js";

// Obtém o contexto do canvas (onde será desenhado o jogo)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const fundoImagem = new Image();
fundoImagem.src = 'http://177.5.73.56:2222/tabuleiro/assets/images/madeira2.jpeg'; // Substitua com o caminho correto da imagem de fundo
fundoImagem.onload = function() {
    resizeCanvas(); // Ajusta o tamanho do canvas quando a imagem estiver carregada
    updateGame();    // Começa a animação do jogo
};

// Função para gerar confetes
let confetes = [];
let confettiCreated = false; // Flag para garantir que os confetes só sejam criados uma vez

// Cria confetes aleatórios em posições iniciais
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width; // Posição aleatória no eixo X
        const y = Math.random() * canvas.height - 10; // Posição aleatória no eixo Y
        confetes.push(new Confete(x, y));
    }
}

function animateConfetti() {
    for (let i = 0; i < confetes.length; i++) {
        confetes[i].update(canvas);
        confetes[i].draw(ctx);
    }

    requestAnimationFrame(animateConfetti); // Mantém a animação dos confetes
}


// Função para desenhar a tela personalizada de vitória
function exibirTelaVitoria(ctx) {
    // Desenha o retângulo de fundo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha o retângulo onde aparecerá o conteúdo (com animação de confetes)
    ctx.fillStyle = 'white';
    const rectWidth = 400;
    const rectHeight = 300;
    const rectX = (canvas.width - rectWidth) / 2;
    const rectY = (canvas.height - rectHeight) / 2;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Desenha a mensagem de vitória
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Você Venceu!', canvas.width / 2, rectY + 50);

    // Desenha o botão
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = (canvas.width - buttonWidth) / 2;
    const buttonY = rectY + rectHeight - 80;
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillRect(buttonX, buttonY-60, buttonWidth, buttonHeight);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Jogar Novamente', canvas.width / 2, buttonY + buttonHeight / 2 + 7);
    ctx.fillText('Voltar Menu', canvas.width / 2, (buttonY - 60) + buttonHeight / 2 + 7);

    // Verifica se o botão foi clicado
    canvas.addEventListener("click", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            // Aqui você pode redirecionar ou reiniciar o jogo
            location.reload(); // Redefine o estado do jogo
        }
        if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
            mouseY >= (buttonY - 60) && mouseY <= (buttonY - 60) + buttonHeight) {
            // Aqui você pode redirecionar ou reiniciar o jogo
            window.location.href = "http://177.5.73.56:2222/tabuleiro/index.html";
            
        }
    });

    // Criar confetes apenas uma vez
    if (!confettiCreated) {
        createConfetti();
        confettiCreated = true; // Marca que os confetes foram criados
    }

    animateConfetti(); // Animação dos confetes
}


// Função para ajustar o canvas ao tamanho da tela e garantir a qualidade
function resizeCanvas() {
    // Ajusta o tamanho do canvas para as dimensões da tela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ajusta o contexto para que a renderização seja feita de maneira mais nítida
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// Chama a função de redimensionamento ao carregar a página
resizeCanvas();
// Função para atualizar a cena do jogo

const tabuleiro = [
    new Square(10, 20, 100, 100, 'white', 'black', 5),
    new Square(110, 20, 100, 100, '#87CEFA', 'black', 5), // Azul
    new Square(210, 20, 100, 100, '#90EE90', 'black', 5),
    new Square(310, 20, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(410, 20, 100, 100, '#90EE90', 'black', 5),
    new Square(510, 20, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(510, 120, 100, 100, '#90EE90', 'black', 5),
    new Square(510, 220, 100, 100, '#90EE90', 'black', 5),
    new Square(410, 220, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(410, 320, 100, 100, '#90EE90', 'black', 5),
    new Square(410, 420, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(410, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(510, 520, 100, 100, '#90EE90', 'black', 5),
    new Square(610, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(710, 520, 100, 100, '#90EE90', 'black', 5),
    new Square(810, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(910, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(910, 420, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(910, 320, 100, 100, '#90EE90', 'black', 5),
    new Square(810, 320, 100, 100, '#90EE90', 'black', 5),
    new Square(710, 320, 100, 100, '#90EE90', 'black', 5),
    new Square(710, 220, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(710,120, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(810,120, 100, 100, '#90EE90', 'black', 5),
    new Square(910,120, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(910, 20, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1010, 20, 100, 100, '#90EE90', 'black', 5),
    new Square(1110, 20, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1210, 20, 100, 100, '#90EE90', 'black', 5),
    new Square(1310, 20, 100, 100, '#90EE90', 'black', 5),
    new Square(1310, 120, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1310, 220, 100, 100, '#90EE90', 'black', 5),
    new Square(1210, 220, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1110, 220, 100, 100, '#90EE90', 'black', 5),
    new Square(1110, 320, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1110, 420, 100, 100, '#90EE90', 'black', 5),
    new Square(1110, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1210, 520, 100, 100, '#90EE90', 'black', 5),
    new Square(1310, 520, 100, 100, '#87CEFA', 'black', 5),// Azul
    new Square(1410, 520, 100, 100, 'black', 'black', 5),

    //alternativa -> questão -> posição 
];

 const questions = [

    new Question(1, "Qual é a capital do Brasil?", 1),
    //new Question(id-questao, "enunciado", id-alternativas ),

]

//===============================Pergunta com alternativas==============================================================








let arrayAssociativo = {
    "nome": new Square(0,0,0,0, 'black', 'white', 0),
    "idade": 30,
    "cidade": "São Paulo"
};
// arrayAssociative.nome;



const jogador = new Player(0, 0, 70, 70, '#FF4500');
const dado = new Dice(800, 700, 100);

// Função para desenhar o jogo (tabuleiro, jogador, dado, etc.)
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    ctx.drawImage(fundoImagem, 0, 0, canvas.width, canvas.height);

    if (jogador.currentPosition === tabuleiro.length - 1) {
        // Exibe a tela de vitória quando o jogador chega no final
        exibirTelaVitoria(ctx);
    } else {
        // Desenha o tabuleiro, jogador, dado, etc.
        tabuleiro.forEach(square => square.draw(ctx));
        jogador.draw(ctx);
        dado.draw(ctx);
    }

    requestAnimationFrame(updateGame); // Requisição para a próxima animação
}

canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (dado.isClicked(mouseX, mouseY) && !dado.isRolling && !jogador.isMoving) {
        dado.roll(); // Rola o dado se o clique for dentro do dado e não estiver rolando

        const diceValue = dado.currentValue; // O valor do dado
        jogador.moveForward(diceValue, tabuleiro); // Move o jogador para frente com base no valor do dado
    }
});

function centralizarJogador() {
    const primeiraCasa = tabuleiro[0];
    jogador.moveToSquare(primeiraCasa);  // Centraliza o jogador na primeira casa
}

// Inicializa o jogo
centralizarJogador(); // Centraliza o jogador
updateGame(); // Inicia o loop do jogo
