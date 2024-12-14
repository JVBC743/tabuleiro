import Question from "./src/entities/Question.js";
import Alternative from "./src/entities/Alternative.js";

// Definindo as perguntas
const questoes = [
    new Question(1, "Qual é a capital do Brasil?", [1, 2, 3, 4])
];

// Definindo as alternativas
const alternativas = [
    new Alternative(1, 1, ["Belo Horizonte", "São Paulo", "Brasília", "Cuiabá"], "Brasília"),
    new Alternative(2, 1, ["Rio de Janeiro", "São Paulo", "Brasília", "São Paulo"], "Brasília"),
    new Alternative(3, 1, ["Belo Horizonte", "São Paulo", "Brasília", "São Paulo"], "Brasília"),
    new Alternative(4, 1, ["Belo Horizonte", "São Paulo", "Brasília", "Curitiba"], "Brasília")
];

// Selecionando o canvas e o contexto
const canvas = document.getElementById("canva-formulario");
const ctx = canvas.getContext("2d");

let selectedAnswer = null; // Variável para armazenar a resposta selecionada

// Função para desenhar o formulário
function drawForm() {
    const question = questoes[0]; // Selecionando a primeira pergunta
    const altIds = question.id_alternatives; // IDs das alternativas associadas à pergunta

    // Desenhando a pergunta
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas antes de redesenhar
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(question.statement, 100, 80);

    // Desenhando as alternativas
    altIds.forEach((id, index) => {
        const alt = alternativas.find(a => a.id === id); // Encontrando a alternativa pelo id
        if (alt) { // Verificando se a alternativa foi encontrada
            const rectY = 120 + index * 50;
            const rectHeight = 40;

            // Destacando a alternativa selecionada
            if (selectedAnswer === alt.alternatives[index]) {
                ctx.fillStyle = "#A5D6A7"; // Cor de destaque
            } else {
                ctx.fillStyle = "#DDD"; // Cor normal
            }

            ctx.fillRect(100, rectY, 300, rectHeight); // Caixa de cada alternativa
            ctx.strokeStyle = "black";
            ctx.strokeRect(100, rectY, 300, rectHeight); // Borda

            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(alt.alternatives[index], 110, rectY + 25); // Desenhando o texto da alternativa
        }
    });

    // Desenhando o botão "Enviar"
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(100, 320, 100, 40);
    ctx.strokeStyle = "black";
    ctx.strokeRect(100, 320, 100, 40);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Enviar", 120, 350);

    // Evento de clique para selecionar as alternativas
    canvas.addEventListener("click", (event) => {
        const x = event.offsetX;
        const y = event.offsetY;

        // Verificando o clique nas alternativas
        altIds.forEach((id, index) => {
            const alt = alternativas.find(a => a.id === id);
            const rectY = 120 + index * 50;
            const rectHeight = 40;
            if (x >= 100 && x <= 400 && y >= rectY && y <= rectY + rectHeight) {
                selectedAnswer = alt.alternatives[index]; // Armazenando a alternativa selecionada
                drawForm(); // Redesenha o formulário para mostrar a seleção
            }
        });

        // Verificando o clique no botão "Enviar"
        if (x >= 100 && x <= 200 && y >= 320 && y <= 360) {
            if (selectedAnswer) {
                const correctAnswer = alternativas.find(a => a.id === altIds[0]).correct;
                if (selectedAnswer === correctAnswer) {
                    ctx.fillStyle = "green";
                    ctx.fillText("Acertou!", 100, 380);
                } else {
                    ctx.fillStyle = "red";
                    ctx.fillText("Errou!", 100, 380);
                }
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("Por favor, selecione uma alternativa.", 100, 380);
            }
        }
    });
}

// Função para ajustar o tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Inicializando o formulário
resizeCanvas();
drawForm();
