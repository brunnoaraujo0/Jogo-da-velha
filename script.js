// DADOS INICIAIS //////////////////////////////////////////////////////////////////////////////Q
let quadro = { //UMA COPIA DO TABULEIRO SIMULTANEAMENTE LIGADA
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false; // VARIAVEL PARA SABER SE PODE JOGAR
let vez = 'X'; //VARIAVEL PRA SABER O JOGADOR DA VEZ
let warning = ''; //VARIAVEL DO JOGADPR CAMPEAO

reset(); //FUNCAO PARA INICIAR/RESETAR






// EVENTOS ////////////////////////////////////////////////////////////////////////////////////////
document.querySelector('.reset').addEventListener('click', reset); //EVENTO DO BOTAO RESETAR

document.querySelectorAll('.item').forEach((item)=>{ //EVENTO DE CADA CAIXINHA 
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item'); //PEGUE O ATRIBUTO DATA-ITEM DO ELEMENTO CLICADO
        
        if(playing && quadro[loc] === '') { //SE PUDER JOGAR E SE A POSICAO CLICADA TIVER VAZIO
            quadro[loc] = vez; //A POSICAO RECEBE O JOGADOR DA VEZ
            renderQuadro(); //CHAMA A FUNCAR RENDERQUADRO PARA ATUALIZAR O QUADRO
            togglePlayer(); //CHAMA A FUNCAO PRA TROCAR O JOGADOR
        }
    });
});





// FUNCOES ///////////////////////////////////////////////////////////////////////////////////
function reset() { //FUNCAO QUE RESETA O JOGO/INICIA
    warning = ''; //O GANHADOR COMECA COM VAZIO

    // definir a vez
    let random = Math.floor(Math.random() * 2); //UM NUMERO ALEATORIO DE 0 A 1
    vez = random === 0 ? 'X' : 'O'; //SE 0 JOGADOR X, SE 1 JOGADOR O

    // resetar os quadros
    for(let i in quadro) { //RESETAR O QUADRO, ESVAZIA TUDO
        quadro[i] = '';
    }

    // renderizar tudo
    renderQuadro(); //REDERIZA O QUADRO
    renderInfo(); //RENDERIZA AS INFORMACOS DO PAINEL

    playing = true; //SINALIZA QUE PODE JOGAR
}

function renderQuadro() { //FUNCAO QUE RENDERIZA O QUADRO

    for(let i in quadro) { 
        let item = document.querySelector(`div[data-item=${i}]`); //PEGUE O CONTAINER I
        if(quadro[i] !== '') { //SE QUADRO DA POSICAO I TIVER ELEMENTO
            item.innerHTML = quadro[i]; //ATUALIZE NO HTML
            if(item.innerHTML === 'X'){
                item.style.color = '#33BADA';
            }else {
                item.style.color = '#FFE41F';
            }
            
        } else { //SE NÃO TIVER, DEIXA VAZIO MSM
            item.innerHTML = '';
        }
    }

    checkGame();  //CHAMA A FUNCAO PRA CONFERIR COMO TA O JOGO CADA VEZ QUE RENDERIZAR 
}

function renderInfo() { //FUNCAO QUE ATUALIZA O PAINEL DE JOGADOR
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() { //FUNCAO PARA TROCAR O JOGADOR
    vez = vez === 'X' ? 'O' : 'X'; // SE JOGADOR FOR X COLOQUE O,SE NAO X
    renderInfo(); //CHAME A FUNCAO QUE ATUALIZA O PAINEL
}

function checkGame() { //FUNCAO PARA SABER A SITUACAO DO JOGO
    if(checkWinnerFor('X')) { //ESSE CHECKWINNERFOR TESTA SE X GANHOU, ELA RETORNA UM BOOLEANO
        warning = 'O "X" venceu'; 
        playing = false;
       
    } else if(checkWinnerFor('o')) { //SE X NAO GANHOU, TESTE SE O GANHOU
        warning = 'O "O" venceu';
        playing = false;
    } else if(isFull()) { //SE NENHUM DOS DOIS GANHOU, TESTE SE DEU EMPATE
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(jogador) { //FUNCAO DO "GABARITO" PRA SAVER SE ACERTOU
    let pos = [ //ARRAY DAS RESPOSTAS CERTAS
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) { //ESSE FOR VAI TESTAR
        let pArray = pos[w].split(','); //faca um array separado por virgula da cada item do gabarito (pArray vai ser tipo a1, a2, a3)
        let hasWon = pArray.every(option=>quadro[option] === jogador); //teste se nesse array cada posicao ta preenchido com a variavel jogador (o jogador vai ser x ou o). A funcao every testa se tudo é vrdd, se for retorna true, se tiver algum errado, returna false
        if(hasWon) return true; // se hasWon for true (vindo de every), houve vencedor, se não teste com outro gabarito, até acabar gabarito
    }

    return false; //se passar por tudo significa que nao achou vencedor de acordo com o gabarito
}
function isFull() { //FUNCAO PRA TESTAR SE DEU EMPATE
    for(let i in quadro) { //PERCORRA TODO O QUADRO
        if(quadro[i] === '') { //SE ALGUM CONTAINER TIVER VAZIO, A PESSOA AINDA PODE JOGAR, OU SEJA NAO ACABOU O JOGO, CONSEQUENTIMENTE NAO DEU EMPATE
            return false; //RETORNA FALSO PARA O EMPATE
        }
    }
    return true; //CASO PASSE PELO FOR E TODOS TIVEREM PREENCHIDO, CONSEQUENTIMENTE DEU EMPATE
}


function color(){

    let caixas = document.querySelectorAll('.item');

    caixas.forEach(item => {
        if(item.innerHTML == 'X') {
            console.log('ola');
        }
    })
}
