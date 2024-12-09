import Question from "./src/entities/Question.js";
import Alternative from "./src/entities/Alternative.js";

// Criando perguntas e alternativas
const question = new Question(1, "Qual é a capital do Brasil?", 1);

const alternative = new Alternative(
    1, 1, "alt1", "alt2", "alt3", "alt4",
    "Brasília", "Rio de Janeiro", "São Paulo", "Curitiba", "Brasília"
);

// Selecionando o formulário no HTML
const form = document.querySelector("form");

// Criando o título da questão
const titulo = document.createElement("h2");

titulo.textContent = question.statement; // Adiciona o enunciado da questão
form.appendChild(titulo);

// Criando as alternativas dinamicamente
const alternatives_id_cont = [
    { id: alternative.id_alt1, text: alternative.cont1, correct: alternative.correct},
    { id: alternative.id_alt2, text: alternative.cont2, correct: alternative.correct },
    { id: alternative.id_alt3, text: alternative.cont3, correct: alternative.correct },
    { id: alternative.id_alt4, text: alternative.cont4, correct: alternative.correct },
];

alternatives_id_cont.forEach((alt) => {

    // Cria o input do tipo radio
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = alt.id;
    radio.name = `question${question.id}`;
    radio.value = alt.text;

    // Cria a label associada ao input
    const label = document.createElement("label");
    label.htmlFor = alt.id;
    label.textContent = alt.text;

    // Adiciona o radio e a label ao formulário
    form.appendChild(radio);
    form.appendChild(label);

    // Adiciona uma quebra de linha para separar as alternativas
    form.appendChild(document.createElement("br"));

});

//Fazer a respota com alternativas funcionar

const button = document.createElement("button")

form.appendChild(document.createElement("br"));

button.textContent = "Enviar"
button.htmlFor = question.id

form.appendChild(button)

button.addEventListener("click", (event) => {

    event.preventDefault()

    const caixinha_marcada = document.querySelector(`input[name="question${question.id}"]:checked`)

    if(caixinha_marcada){

        const resposta_marcada = caixinha_marcada.value
        const resposta_correta = alternative.correct
        if(resposta_marcada === resposta_correta){

            alert("Acertou!")
        }else{

            alert("Errou!")
        }
    }

});