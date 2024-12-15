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
        this.dado = null;
        this.tabuleiro = null;

        // Questões e alternativas mapeadas
        this.questoes = [
            new Question(1, "O que é hardware em um computador?"), // Azul -> Quadrado 1 
            new Question(2, "Qual das alternativas a seguir é um exemplo de mutualismo?"), // Verde -> Quadrado 2
            new Question(3, "O que significa a sigla CPU?"), // Azul -> Quadrado 3
            new Question(4, "O parasitismo é uma relação em que:"), // Verde -> Quadrado 4
            new Question(5, "Qual destes é um sistema operacional?"), // Azul -> Quadrado 5
            new Question(6, "Na relação ecológica chamada comensalismo, uma das espécies:"), // Verde -> Quadrado 6
            new Question(7, "Qual das relações abaixo é um exemplo de competição?"), // Verde -> Quadrado 7
            new Question(8, "O que é uma rede de computadores?"), // Azul -> Quadrado 8
            new Question(9, "Uma relação onde uma espécie utiliza outra como abrigo, sem prejudicá-la, é chamada de:"), // Verde -> Quadrado 9
            new Question(10, "Qual é a função do protocolo HTTP?"), // Azul -> Quadrado 10
            new Question(11, "O que significa 'open source'"), // Azul -> Quadrado 11
            new Question(12, "Qual o principal responsável pela captura de energia do Sol em um ecossistema?"), // Verde -> Quadrado 12
            new Question(13, "Qual linguagem é mais usada para desenvolvimento web?"), // Azul -> Quadrado 13 
            new Question(14, "O fluxo de energia nos ecossistemas:"), // Verde -> Quadrado 14
            new Question(15, "Qual é o principal objetivo de um firewall?"), // Azul -> Quadrado 15
            new Question(16, "O que é virtualização?"), // Azul -> Quadrado 16
            new Question(17, "Qual é a diferença entre IPv4 e IPv6?"), // Azul -> Quadrado 17
            new Question(18, "A energia disponível para os consumidores primários em uma cadeia alimentar vem:"), // Verde -> Quadrado 18
            new Question(19, "Em uma pirâmide ecológica de energia, qual nível trófico possui a maior quantidade de energia disponível?"), // Verde -> Quadrado 19
            new Question(20, "Por que apenas cerca de 10% da energia é transferida entre os níveis tróficos em uma cadeia alimentar?"), // Verde -> Quadrado 20
            new Question(21, "O que é a camada de aplicação no modelo OSI?"), // Azul -> Quadrado 21
            new Question(22, "O que é 'Machine Learning'"), // Azul -> Quadrado 22
            new Question(23, "Qual o principal reservatório de carbono no ciclo do carbono?"), // Verde -> Quadrado 23
            new Question(24, "Qual é a vantagem de um sistema de arquivos NTFS?"), // Azul -> Quadrado 24
            new Question(25, "O que significa SLA em serviços de TI?"), // Azul -> Quadrado 25
            new Question(26, "O ciclo do nitrogênio depende de qual tipo de organismos para fixar o nitrogênio atmosférico?"), // Verde -> Quadrado 26
            new Question(27, "Qual o conceito de DevOps?"), // Azul -> Quadrado 27
            new Question(28, "No ciclo da água, a transpiração está relacionada com:"), // Verde -> Quadrado 28
            new Question(29, "Qual o papel dos decompositores nos ciclos biogeoquímicos?"), // Verde -> Quadrado 29
            new Question(30, "O que é um ataque de força bruta?"), // Azul -> Quadrado 30
            new Question(31, "No ciclo do fósforo, o principal reservatório de fósforo é:"), // Verde -> Quadrado 31
            new Question(32, "Qual é a função do protocolo SSH?"), // Azul -> Quadrado 32
            new Question(33, "O aumento de gás carbônico na atmosfera tem impacto direto sobre:"), // Verde -> Quadrado 33
            new Question(34, "O que é 'containerização' em TI?"), // Azul -> Quadrado 34
            new Question(35, " Qual processo do ciclo do nitrogênio transforma amônia em nitrato?"), // Verde -> Quadrado 35
            new Question(36, "Qual é o objetivo principal de um balanceador de carga?"), // Azul -> Quadrado 36
            new Question(37, "Nos ciclos biogeoquímicos, o termo 'assimilação' refere-se a:"), // Verde -> Quadrado 37
            new Question(38, "O que é um banco de dados relacional?") // Azul -> Quadrado 38


            /*

                    Relações ecológicas entre seres vivos

                    1. Qual das alternativas a seguir é um exemplo de mutualismo?
                    a) Leão e zebra
                    b) Abelha e flor
                    c) Tubarão e rêmora
                    d) Lobo e coelho

                    Resposta: b

                    2. O parasitismo é uma relação em que:

                    a) Ambos os organismos se beneficiam
                    b) Um organismo se beneficia e o outro é prejudicado
                    c) Nenhum organismo é afetado
                    d) Ambos são prejudicados

                    Resposta: b

                    3. Na relação ecológica chamada comensalismo, uma das espécies:

                    a) É prejudicada
                    b) Não é afetada
                    c) Se beneficia sem prejudicar a outra
                    d) Se beneficia prejudicando a outra

                    Resposta: c

                    4. Qual das relações abaixo é um exemplo de competição?

                    a) Dois leões disputando território
                    b) Pássaros construindo ninhos em árvores
                    c) Fungos crescendo em árvores
                    d) Cupins degradando madeira

                    Resposta: a

                    5. Uma relação onde uma espécie utiliza outra como abrigo, sem prejudicá-la, é chamada de:

                    a) Mutualismo
                    b) Amensalismo
                    c) Comensalismo
                    d) Predação

                    Resposta: c

                    Ciclo de nutrientes e fluxo de energia

                    6. Qual o principal responsável pela captura de energia do Sol em um ecossistema?

                    a) Consumidores primários
                    b) Herbívoros
                    c) Produtores
                    d) Decompositores

                    Resposta: c

                    7. O fluxo de energia nos ecossistemas:

                    a) É cíclico
                    b) É unidirecional
                    c) Não depende dos produtores
                    d) É reciclado continuamente pelos decompositores

                    Resposta: b

                    8. A energia disponível para os consumidores primários em uma cadeia alimentar vem:

                    a) Diretamente do Sol
                    b) Da respiração dos decompositores
                    c) Da biomassa dos produtores
                    d) Dos consumidores secundários

                    Resposta: c

                    9. Em uma pirâmide ecológica de energia, qual nível trófico possui a maior quantidade de energia disponível?

                    a) Consumidores terciários
                    b) Produtores
                    c) Consumidores primários
                    d) Decompositores

                    Resposta: b

                    10. Por que apenas cerca de 10% da energia é transferida entre os níveis tróficos em uma cadeia alimentar?

                    a) Porque a maior parte da energia é armazenada no ambiente
                    b) Porque a maior parte da energia é perdida como calor durante processos metabólicos
                    c) Porque os decompositores consomem a maior parte da energia
                    d) Porque os produtores produzem pouca energia

                    Resposta: b

                    Ciclos biogeoquímicos

                    11. Qual o principal reservatório de carbono no ciclo do carbono?

                    a) Atmosfera
                    b) Oceanos
                    c) Organismos vivos
                    d) Solo

                    Resposta: b

                    12. O ciclo do nitrogênio depende de qual tipo de organismos para fixar o nitrogênio atmosférico?

                    a) Fungos
                    b) Bactérias
                    c) Protozoários
                    d) Algas

                    Resposta: b

                    13. No ciclo da água, a transpiração está relacionada com:

                    a) A perda de água pela atmosfera
                    b) O movimento de água no subsolo
                    c) A liberação de vapor d'água pelas plantas
                    d) A formação de rios e lagos

                    Resposta: c

                    14. Qual o papel dos decompositores nos ciclos biogeoquímicos?

                    a) Transformar matéria orgânica em matéria inorgânica
                    b) Fixar carbono da atmosfera
                    c) Absorver nutrientes diretamente das plantas
                    d) Alocar energia para consumidores secundários

                    Resposta: a

                    15. No ciclo do fósforo, o principal reservatório de fósforo é:

                    a) Atmosfera
                    b) Organismos vivos
                    c) Rochas sedimentares
                    d) Oceanos

                    Resposta: c

                    16. O aumento de gás carbônico na atmosfera tem impacto direto sobre:

                    a) O ciclo do nitrogênio
                    b) O aquecimento global
                    c) A formação de fósforo
                    d) O ciclo do fósforo

                    Resposta: b

                    17. Qual processo do ciclo do nitrogênio transforma amônia em nitrato?

                    a) Fixação
                    b) Nitrificação
                    c) Desnitrificação
                    d) Amonificação

                    Resposta: b

                    18. Nos ciclos biogeoquímicos, o termo "assimilação" refere-se a:

                    a) A conversão de nutrientes inorgânicos em compostos orgânicos pelos organismos vivos
                    b) A decomposição da matéria orgânica em nutrientes inorgânicos
                    c) A perda de nutrientes do solo para o ambiente aquático
                    d) A formação de novos compostos minerais

                    Resposta: a
            */
        ];

        this.alternativas = [
            new Alternative(1, 1, ["a) Softwares que rodam no sistema", "b) Componentes físicos de um computador", "c) Dados armazenados em nuvem", "d) Programas utilizados para edição de texto"], "b) Componentes físicos de um computador"),//azul
            new Alternative(2, 2, ["a) Leão e zebra", "b) Abelha e flor", "c) Tubarão e rêmora", "d) Lobo e coelho"], "b) Abelha e flor"),
            new Alternative(3, 3, ["a) Central Processing Unit", "b) Computer Programming Unit", "c) Central Power Unit", "d) Core Programming Utility"], "a) Central Processing Unit"),//azul
            new Alternative(4, 4, ["a) Ambos os organismos se beneficiam", "b) Um organismo se beneficia e o outro é prejudicado", "c) Nenhum organismo é afetado", "d) Ambos são prejudicados"], "b) Um organismo se beneficia e o outro é prejudicado"),
            new Alternative(5, 5, ["a) Python", "b) Windows", "c) Chrome", "d) HTML"], "b) Windows"),//azul
            new Alternative(6, 6, ["a) É prejudicada", "b) Não é afetada", "c) Se beneficia sem prejudicar a outra", "d) Se beneficia prejudicando a outra"], "c) Se beneficia sem prejudicar a outra"),
            new Alternative(7, 7, ["a) Dois leões disputando território", "b) Pássaros construindo ninhos em árvores", "c) Fungos crescendo em árvores", "d) Cupins degradando madeira"], "a) Dois leões disputando território"),
            new Alternative(8, 8, ["a) Uma conexão entre usuários em um servidor local", "b) Um conjunto de computadores interligados que compartilham recursos", "c) Apenas uma conexão com a internet", "d) Um programa de desenvolvimento de sistemas"], "b) Um conjunto de computadores interligados que compartilham recursos"),//azul
            new Alternative(9, 9, ["a) Mutualismo", "b) Amensalismo", "c) Comensalismo", "d) Predação"], "c) Comensalismo"),
            new Alternative(10, 10, ["a) Transferir arquivos via FTP", "b) Estabelecer conexões seguras", "c) Comunicação entre navegadores e servidores web", "d) Enviar e-mails"], "c) Comunicação entre navegadores e servidores web"),//azul
            new Alternative(11, 11, ["a) Software que é gratuito para usar", "b) Software cujo código-fonte está disponível para modificação", "c) Um programa que exige licença paga", "d) Código exclusivo desenvolvido por empresas privadas"], "b) Software cujo código-fonte está disponível para modificação"),//azul
            new Alternative(12, 12, ["a) Consumidores primários", "b) Herbívoros", "c) Produtores", "d) Decompositores"], "c) Produtores"),
            new Alternative(13, 13, ["a) Java", "b) C++", "c) HTML", "d) Swift"], "c) HTML"),//azul
            new Alternative(14, 14, ["a) É cíclico", "b) É unidirecional", "c) Não depende dos produtores", "d) É reciclado continuamente pelos decompositores"], "b) É unidirecional"),
            new Alternative(15, 15, ["a) Proteger contra spam", "b) Bloquear sites inseguros", "c) Filtrar e controlar o tráfego de rede para segurança", "d) Acelerar conexões de internet"], "c) Filtrar e controlar o tráfego de rede para segurança"),//azul
            new Alternative(16, 16, ["a) Simulação de hardware em um ambiente digital", "b) Criação de um software a partir de código aberto", "c) Divisão de redes para maior segurança", "d) Compactação de dados para armazenamento"], "a) Simulação de hardware em um ambiente digital"),//azul
            new Alternative(17, 17, ["a) O IPv4 é mais rápido que o IPv6", "b) O IPv6 suporta um maior número de endereços IP", "c) O IPv4 é usado apenas em redes locais", "d) O IPv6 é específico para redes sem fio"], "b) O IPv6 suporta um maior número de endereços IP"),//azul
            new Alternative(18, 18, ["a) Diretamente do Sol", "b) Da respiração dos decompositores", "c) Da biomassa dos produtores", "d) Dos consumidores secundários"], "c) Da biomassa dos produtores"),            
            new Alternative(19, 19, ["a) Consumidores terciários", "b) Produtores", "c) Consumidores primários", "d) Decompositores"], "b) Produtores"),
            new Alternative(20, 20, ["a) Porque a maior parte da energia é armazenada no ambiente", "b) Porque a maior parte da energia é perdida como calor durante processos metabólicos", "c) Porque os decompositores consomem a maior parte da energia", "d) Porque os produtores produzem pouca energia"], "b) Porque a maior parte da energia é perdida como calor durante processos metabólicos"),
            new Alternative(21, 21, ["a) Proteger contra ataques DDoS", "b) Aumentar a velocidade da internet", "c) Controlar o tráfego de rede interno", "d) Traduzir nomes de domínio em endereços IP"], "d) Traduzir nomes de domínio em endereços IP"),//azul
            new Alternative(22, 22, ["a) Desenvolvimento de hardwares inteligentes", "b) A técnica de programação para dispositivos móveis", "c) Um ramo da IA que cria algoritmos capazes de aprender com dados", "d) Uma abordagem para desenvolvimento de software ágil"], "c) Um ramo da IA que cria algoritmos capazes de aprender com dados"),//azul
            new Alternative(23, 23, ["a) Atmosfera", "b) Oceanos", "c) Organismos vivos", "d) Solo"], "b) Oceanos"),            
            new Alternative(24, 24, ["a) Suporta criptografia nativa", "b) É usado apenas em dispositivos móveis", "c) É mais rápido que FAT32 para leitura de discos", "d) Não suporta permissões de usuários"], "a) Suporta criptografia nativa"),//azul
            new Alternative(25, 25, ["a) System Level Application", "b) Secure Login Authentication", "c) Software Level Adjustment", "d) Service Level Agreement"], "d) Service Level Agreement"),//azul
            new Alternative(26, 26, ["A_1", "A_2", "A_3", "A_4"], "RESP"),
            new Alternative(27, 27, ["a) Integração de desenvolvimento e operações para entrega contínua", "b) Um sistema de monitoramento de redes", "c) Uma linguagem de programação específica", "d) Um método de controle de acesso"], "a) Integração de desenvolvimento e operações para entrega contínua"),//azul
            new Alternative(28, 28, ["a) A perda de água pela atmosfera", "b) O movimento de água no subsolo", "c) A liberação de vapor d'água pelas plantas", "d) A formação de rios e lagos"], "c) A liberação de vapor d'água pelas plantas"),
            new Alternative(29, 29, ["a) Transformar matéria orgânica em matéria inorgânica", "b) Fixar carbono da atmosfera", "c) Absorver nutrientes diretamente das plantas", "d) Alocar energia para consumidores secundários"], "a) Transformar matéria orgânica em matéria inorgânica"),
            new Alternative(30, 30, ["a) Explorar vulnerabilidades em sistemas operacionais", "b) Injetar comandos maliciosos em SQL", "c) Tentativa de quebrar senhas tentando combinações possíveis", "d) Enviar pacotes corrompidos para derrubar servidores"], "c) Tentativa de quebrar senhas tentando combinações possíveis"),//azul
            new Alternative(31, 31, ["a) Atmosfera", "b) Organismos vivos", "c) Rochas sedimentares", "d) Oceanos"], "c) Rochas sedimentares"),
            new Alternative(32, 32, ["a) Transferir arquivos entre servidores", "b) Estabelecer conexões remotas seguras", "c) Gerenciar pacotes de rede", "d) Configurar permissões de usuários"], "b) Estabelecer conexões remotas seguras"),//azul
            new Alternative(33, 33, ["a) O ciclo do nitrogênio", "b) O aquecimento global", "c) A formação de fósforo", "d) O ciclo do fósforo"], "b) O aquecimento global"),
            new Alternative(34, 34, ["a) Divisão de servidores em ambientes isolados", "b) Virtualização de hardware para performance", "c) Uso de ferramentas para compactar aplicativos", "d) Compartilhamento de arquivos em redes privadas"], "a) Divisão de servidores em ambientes isolados"),//azul
            new Alternative(35, 35, ["a) Fixação", "b) Nitrificação", "c) Desnitrificação", "d) Amonificação"], "b) Nitrificação"),    
            new Alternative(36, 36, ["a) Diminuir a largura de banda necessária", "b) Monitorar e corrigir falhas automaticamente", "c) Proteger redes contra acessos não autorizados", "d) Distribuir o tráfego entre servidores para otimizar desempenho"], "d) Distribuir o tráfego entre servidores para otimizar desempenho"),//azul
            new Alternative(37, 37, ["a) A conversão de nutrientes inorgânicos em compostos orgânicos pelos organismos vivos", "b) A decomposição da matéria orgânica em nutrientes inorgânicos", "c) A perda de nutrientes do solo para o ambiente aquático", "d) A formação de novos compostos minerais"], "a) A conversão de nutrientes inorgânicos em compostos orgânicos pelos organismos vivos"),
        
            new Alternative(38, 38, ["a) Um banco que armazena dados de forma não estruturada", "b) Um banco que usa tabelas interconectadas para organizar dados", "c) Um banco que gerencia apenas textos e números", "d) Um banco que não suporta SQL"], "b) Um banco que usa tabelas interconectadas para organizar dados"),//azul
            //new Alternative(id_alt, id_perg, ["A_1", "A_2", "A_3", "A_4"], "RESP")

            
        ];


        // Mapeamento de questões por casa
        this.questoesPorCasa = [
            { casa: 1, pergunta: this.questoes[0], alternativas: this.alternativas.slice(0, 1) },  // Alternativa 1
            { casa: 2, pergunta: this.questoes[1], alternativas: this.alternativas.slice(1, 2) },  // Alternativa 2
            { casa: 3, pergunta: this.questoes[2], alternativas: this.alternativas.slice(2, 3) },  // Alternativa 3
            { casa: 4, pergunta: this.questoes[3], alternativas: this.alternativas.slice(3, 4) },   // Alternativa 4
            { casa: 5, pergunta: this.questoes[4], alternativas: this.alternativas.slice(4, 5) },   // Alternativa 5
            { casa: 6, pergunta: this.questoes[5], alternativas: this.alternativas.slice(5, 6) },   // Alternativa 6
            { casa: 7, pergunta: this.questoes[6], alternativas: this.alternativas.slice(6, 7) },   // Alternativa 7
            { casa: 8, pergunta: this.questoes[7], alternativas: this.alternativas.slice(7, 8) },   // Alternativa 8
            { casa: 9, pergunta: this.questoes[8], alternativas: this.alternativas.slice(8,9) },   // Alternativa 9
            { casa: 10, pergunta: this.questoes[9], alternativas: this.alternativas.slice(9, 10) },   // Alternativa 10
            { casa: 11, pergunta: this.questoes[10], alternativas: this.alternativas.slice(10, 11) },   // Alternativa 11
            { casa: 12, pergunta: this.questoes[11], alternativas: this.alternativas.slice(11, 12) },   // Alternativa 12
            { casa: 13, pergunta: this.questoes[12], alternativas: this.alternativas.slice(12, 13) },   // Alternativa 13
            { casa: 14, pergunta: this.questoes[13], alternativas: this.alternativas.slice(13, 14) },   // Alternativa 14
            { casa: 15, pergunta: this.questoes[14], alternativas: this.alternativas.slice(14, 15) },   // Alternativa 15
            { casa: 16, pergunta: this.questoes[15], alternativas: this.alternativas.slice(15, 16) },   // Alternativa 16
            { casa: 17, pergunta: this.questoes[16], alternativas: this.alternativas.slice(16, 17) },   // Alternativa 17
            { casa: 18, pergunta: this.questoes[17], alternativas: this.alternativas.slice(17, 18) },   // Alternativa 18
            { casa: 19, pergunta: this.questoes[18], alternativas: this.alternativas.slice(18, 19) },   // Alternativa 19
            { casa: 20, pergunta: this.questoes[19], alternativas: this.alternativas.slice(19, 20) },   // Alternativa 20
            { casa: 21, pergunta: this.questoes[20], alternativas: this.alternativas.slice(20, 21) },   // Alternativa 21
            { casa: 22, pergunta: this.questoes[21], alternativas: this.alternativas.slice(21, 22) },   // Alternativa 22
            { casa: 23, pergunta: this.questoes[22], alternativas: this.alternativas.slice(22, 23) },   // Alternativa 23
            { casa: 24, pergunta: this.questoes[23], alternativas: this.alternativas.slice(23, 24) },   // Alternativa 24
            { casa: 25, pergunta: this.questoes[24], alternativas: this.alternativas.slice(24, 25) },   // Alternativa 25
            { casa: 26, pergunta: this.questoes[25], alternativas: this.alternativas.slice(25, 26) },   // Alternativa 26
            { casa: 27, pergunta: this.questoes[26], alternativas: this.alternativas.slice(26, 27) },   // Alternativa 27
            { casa: 28, pergunta: this.questoes[27], alternativas: this.alternativas.slice(27, 28) },   // Alternativa 28
            { casa: 29, pergunta: this.questoes[28], alternativas: this.alternativas.slice(28, 29) },   // Alternativa 29
            { casa: 30, pergunta: this.questoes[29], alternativas: this.alternativas.slice(29, 30) },   // Alternativa 30
            { casa: 31, pergunta: this.questoes[30], alternativas: this.alternativas.slice(30, 31) },   // Alternativa 31
            { casa: 32, pergunta: this.questoes[31], alternativas: this.alternativas.slice(31, 32) },   // Alternativa 32
            { casa: 33, pergunta: this.questoes[32], alternativas: this.alternativas.slice(32, 33) },   // Alternativa 33
            { casa: 34, pergunta: this.questoes[33], alternativas: this.alternativas.slice(33, 34) },   // Alternativa 34
            { casa: 35, pergunta: this.questoes[34], alternativas: this.alternativas.slice(34, 35) },   // Alternativa 35
            { casa: 36, pergunta: this.questoes[35], alternativas: this.alternativas.slice(35, 36) },   // Alternativa 36
            { casa: 37, pergunta: this.questoes[36], alternativas: this.alternativas.slice(36, 37) },   // Alternativa 37
            { casa: 38, pergunta: this.questoes[37], alternativas: this.alternativas.slice(37, 38) }   // Alternativa 38

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
                if (this.currentPosition === this.targetPosition && this.currentPosition != tabuleiro.length - 1 && this.currentPosition != 0) {
                    this.showModal(); // Exibe a modal apenas quando o movimento for concluído
                }

                // Continua a animação se não alcançou o objetivo final
                if (this.currentPosition !== this.targetPosition) {
                    requestAnimationFrame(() => this.moveToNextSquare(tabuleiro)); // Próxima animação
                } else {
                    this.isMoving = false; // Finaliza a movimentação
                    this.direction = 1; // Reseta a direção para frente após o movimento
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
            this.moveToNextSquare(tabuleiro); // Inicia o movimento para a casa anterior
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

        // Estilos personalizados para o enunciado
        perguntaElement.style.fontFamily = 'Arial, sans-serif';  // Fonte do enunciado
        perguntaElement.style.fontSize = '24px';  // Tamanho da fonte
        perguntaElement.style.fontWeight = 'bold';  // Deixa o texto em negrito
        perguntaElement.style.color = '#333';  // Cor do texto (um cinza escuro)
        perguntaElement.style.textAlign = 'center';  // Alinha o texto ao centro
        perguntaElement.style.marginBottom = '20px';  // Espaço abaixo do enunciado
        perguntaElement.style.padding = '10px';  // Espaço interno para um efeito de "margem interna"
        perguntaElement.style.backgroundColor = '#f4f4f4';  // Cor de fundo suave
        perguntaElement.style.borderRadius = '8px';  // Bordas arredondadas
        perguntaElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';  // Sombra suave
        perguntaElement.style.transition = 'all 0.3s ease';  // Transição suave para interatividade

        // Efeito ao passar o mouse (hover)
        perguntaElement.addEventListener('mouseover', () => {
            perguntaElement.style.transform = 'scale(1.05)';  // Aumenta um pouco o tamanho do enunciado
            perguntaElement.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';  // Sombra mais intensa
        });

        perguntaElement.addEventListener('mouseout', () => {
            perguntaElement.style.transform = 'scale(1)';  // Retorna ao tamanho original
            perguntaElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';  // Sombra suave
        });

        // Adiciona o enunciado ao modal
        modal.appendChild(perguntaElement);


        // Exibe as alternativas
        alternativas.forEach(alternativa => {
            alternativa.respostas.forEach(resposta => {
                const alternativaBtn = document.createElement('button');
                alternativaBtn.textContent = resposta;  // Cada alternativa será exibida em um botão separado

                // Estilos personalizados para o botão
                alternativaBtn.style.margin = '10px';  // Margem para afastar os botões
                alternativaBtn.style.padding = '10px 20px';  // Espaçamento interno do botão
                alternativaBtn.style.border = 'none';  // Remove a borda padrão
                alternativaBtn.style.borderRadius = '8px';  // Bordas arredondadas
                alternativaBtn.style.backgroundColor = '#4CAF50';  // Cor de fundo (verde)
                alternativaBtn.style.color = '#fff';  // Cor do texto (branco)
                alternativaBtn.style.fontSize = '16px';  // Tamanho da fonte
                alternativaBtn.style.cursor = 'pointer';  // Cursor para indicar que é clicável
                alternativaBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';  // Efeito de sombra para o efeito 3D
                alternativaBtn.style.transition = 'all 0.3s ease';  // Transição suave para efeitos de hover

                // Efeito ao passar o mouse (hover)
                alternativaBtn.addEventListener('mouseover', () => {
                    alternativaBtn.style.transform = 'translateY(-3px)';  // Levanta o botão
                    alternativaBtn.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';  // Sombra mais intensa
                });

                alternativaBtn.addEventListener('mouseout', () => {
                    alternativaBtn.style.transform = 'translateY(0)';  // Retorna à posição original
                    alternativaBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';  // Sombra mais suave
                });

                alternativaBtn.addEventListener('click', () => {
                    this.selectedAnswer = resposta;  // Define a resposta selecionada
                    this.checkAnswer(modal);  // Verifica a resposta selecionada
                });

                modal.appendChild(alternativaBtn);
            });
        });


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
            // Quando o jogador erra, roda o dado
            const dice = this.dado;
            dice.roll();

            // Exibe o valor do dado
            alert('Você errou! O dado rolou: ' + dice.currentValue);
            this.closeModal(modal);

            // Faz o jogador andar para trás com o valor do dado
            this.moveBackward(dice.currentValue, this.tabuleiro);
            return null;
        }

        this.closeModal(modal); // Fecha o modal após a resposta
    }

    closeModal(modal) {
        document.body.removeChild(modal); // Remove o modal
    }
}

export default Player;
