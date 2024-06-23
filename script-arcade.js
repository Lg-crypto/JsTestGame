
const qtdbaloesPorFase = [20, 40, 60];
const fases = [0, 1, 2];
let faseAtual = 0;

const faltamenu = document.getElementById('faltam');
const estouradosmenu = document.getElementById('estourados');
const time = document.getElementById('sec');
const mlr = document.getElementById('mlr');
const game1 = document.getElementById('gamecont1');



function gerarBaloes(fase, g1) {
    const qtdBaloes = qtdbaloesPorFase[fase];
    let numeroDobalao = 0;
    const largura = 100;
    const altura = 100;
    const margin = 10;
    const columns = 10;

    for (let i = 0; i < qtdBaloes; i++) {


        const bloon = document.createElement('div');
        bloon.className = 'bloon';
        bloon.innerHTML = '<img src="img/balao.png">';

        const lin = Math.floor(numeroDobalao / columns);
        const col = numeroDobalao % columns;
        const posTop = (lin * (altura + margin)) + 'px';
        const posLeft = (col * (largura + margin)) + 'px';

        bloon.style.top = posTop;
        bloon.style.left = posLeft;

        g1.appendChild(bloon);
        numeroDobalao++;

    }
}
function passarDeFase() {

    alert('Você venceu a fase!');
    faseAtual++;
    limparBaloes();
    gerarBaloes(fases[faseAtual], game1);
    
}
function estourar(n, f) {
    const bloons = document.querySelectorAll('.bloon');
    let nbloons = n;
    let fbloons = f;

    bloons.forEach(bloon => {


        bloon.addEventListener('click', function estourarBloon() {
            bloon.innerHTML = '<img src="img/balaopow.png">';
            setTimeout(() => {
                bloon.style.display = 'none';
                bloon.classList.remove('bloon');
                nbloons--;
                fbloons++;

                faltamenu.innerHTML = nbloons;
                estouradosmenu.innerHTML = fbloons;

                if (faltamenu.innerHTML == 0 && faseAtual < fases.length - 1) {
                    passarDeFase()
                } else if (faltamenu.innerHTML == 0 && faseAtual === fases.length - 1) {
                    alert('Você venceu todas as fases!');
                }

                
            }, 100);
        });
    });
}


function timer() {
    let second = 30;

    function updateTimer() {
        if (second > 0) {
            second--;
            time.innerHTML = second;
            setTimeout(updateTimer, 1000);
        } else {
            alert('Você perdeu!');
            location.reload()
        }
    }

    updateTimer();
}
function limparBaloes() {
    const bloons = document.querySelectorAll('.bloon');
    bloons.forEach(bloon => {
    bloon.remove();
    });
}


timer();
gerarBaloes(fases[faseAtual], game1);
estourar(qtdbaloesPorFase[faseAtual], 0);
