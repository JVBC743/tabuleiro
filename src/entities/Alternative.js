class Alternative {
    constructor(id, id_question, alternatives, correct) {
        this.id = id;
        this.id_question = id_question;
        this.alternatives = alternatives; // Agora um array de alternativas
        this.correct = correct; // Alternativa correta
    }
}

export default Alternative;
