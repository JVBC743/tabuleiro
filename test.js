import Question from "./src/entities/Question.js"
import Alternative from "./src/entities/Alternative.js"

const questions = [

    new Question(1, "Teste 123", 1 ),

    // new Question(id-questao, "enunciado", id-alternativas ),

]

const alternatives = [

    new Alternative(1, 1, "1", "2", "3", "4", "2")

    // new Alternative(id-alternativas, id-questao, "alt1", "alt2", "alt3", "alt4", "correto")

]

const quest_alt = {

    [questions[0].id]: alternatives[0],

}

window.alert(`Alternativa correta: ${quest_alt[questions[0].id].correct}`);
