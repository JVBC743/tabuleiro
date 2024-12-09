import Square from "../src/entities/Square.js";
import Player from "../src/entities/Player.js";
import Question from "../src/entities/Question.js"
import Alternative from "../src/entities/Alternative.js"
import Dice from "../src/entities/Dice.js";


// Square.js:10 Uncaught ReferenceError: ctx is not defined
//     at Square.draw (Square.js:10:9)
//     at updateGame (main.js:40:10)
//     at main.js:47:1


// Obtém o contexto do canvas (onde será desenhado o jogo)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
    new Square(10, 20, 100, 100, 'white', 'black', 5, 1),
    new Square(110, 20, 100, 100, '#87CEFA', 'black', 5, 2),
    new Square(210, 20, 100, 100, '#90EE90', 'black', 5, 3),
    new Square(310, 20, 100, 100, '#87CEFA', 'black', 5, 4),
    new Square(410, 20, 100, 100, '#90EE90', 'black', 5, 5),
    new Square(510, 20, 100, 100, '#87CEFA', 'black', 5, 6),
    new Square(510, 120, 100, 100, '#90EE90', 'black', 5, 7),
    new Square(510, 220, 100, 100, '#90EE90', 'black', 5, 8),
    new Square(410, 220, 100, 100, '#87CEFA', 'black', 5, 9),
    new Square(410, 320, 100, 100, '#90EE90', 'black', 5, 10),
    new Square(410, 420, 100, 100, '#87CEFA', 'black', 5, 11),
    new Square(410, 520, 100, 100, '#87CEFA', 'black', 5, 12),
    new Square(510, 520, 100, 100, '#90EE90', 'black', 5, 13),
    new Square(610, 520, 100, 100, '#87CEFA', 'black', 5, 14),
    new Square(710, 520, 100, 100, '#90EE90', 'black', 5, 15),
    new Square(810, 520, 100, 100, '#87CEFA', 'black', 5, 16),
    new Square(910, 520, 100, 100, '#87CEFA', 'black', 5, 17),
    new Square(910, 420, 100, 100, '#87CEFA', 'black', 5, 18),
    new Square(910, 320, 100, 100, '#90EE90', 'black', 5, 19),
    new Square(810, 320, 100, 100, '#90EE90', 'black', 5, 20),
    new Square(710, 320, 100, 100, '#90EE90', 'black', 5, 21),
    new Square(710, 220, 100, 100, '#87CEFA', 'black', 5, 22),
    new Square(710,120, 100, 100, '#87CEFA', 'black', 5, 23),
    new Square(810,120, 100, 100, '#90EE90', 'black', 5, 24),
    new Square(910,120, 100, 100, '#87CEFA', 'black', 5, 25),
    new Square(910, 20, 100, 100, '#87CEFA', 'black', 5, 26),
    new Square(1010, 20, 100, 100, '#90EE90', 'black', 5, 27),
    new Square(1110, 20, 100, 100, '#87CEFA', 'black', 5, 28),
    new Square(1210, 20, 100, 100, '#90EE90', 'black', 5, 29),
    new Square(1310, 20, 100, 100, '#90EE90', 'black', 5, 30),
    new Square(1310, 120, 100, 100, '#87CEFA', 'black', 5, 31),
    new Square(1310, 220, 100, 100, '#90EE90', 'black', 5, 32),
    new Square(1210, 220, 100, 100, '#87CEFA', 'black', 5, 33),
    new Square(1110, 220, 100, 100, '#90EE90', 'black', 5, 34),
    new Square(1110, 320, 100, 100, '#87CEFA', 'black', 5, 35),
    new Square(1110, 420, 100, 100, '#90EE90', 'black', 5, 36),
    new Square(1110, 520, 100, 100, '#87CEFA', 'black', 5, 37),
    new Square(1210, 520, 100, 100, '#90EE90', 'black', 5, 38),
    new Square(1310, 520, 100, 100, '#87CEFA', 'black', 5, 39),
    new Square(1410, 520, 100, 100, 'black', 'black', 5, 40),

    //alternativa -> questão -> posição 
];

const questions = [

    new Question(1, "Teste 123", 1 ),

    // new Question(id-questao, "enunciado", id-alternativas ),

]

const alternatives = [

    new Alternative(1, 1, 1, 2, 3, 4, "Cont 1", "Cont 2", "Cont 3", "Cont 4", id-alt-correto)


    // new Alternative(id-alternativas, id-questao, id1, id2, id3, id4, "Cont 1", "Cont 2", "Cont 3", "Cont 4", id-alt-correto)



    
]

const quest_alt = {

    [questions[0].id]: alternatives[0],

}





let arrayAssociativo = {
    "nome": new Square(0,0,0,0, 'black', 'white', 0),
    "idade": 30,
    "cidade": "São Paulo"
};
// arrayAssociative.nome;




const jogador = new Player(0, 0, 70, 70, 'black');
const dado = new Dice(800, 700, 100);

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    tabuleiro.forEach(square => square.draw(ctx));

    jogador.draw(ctx);
    jogador.moveTo(tabuleiro[0]);
    dado.draw(ctx);

    requestAnimationFrame(updateGame); // Requisição para a próxima animação
}

canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (dado.isClicked(mouseX, mouseY) && !dado.isRolling) {
        dado.roll(); // Rola o dado se o clique for dentro do dado e não estiver rolando
    }
});

// Inicia o loop do jogo
updateGame();
