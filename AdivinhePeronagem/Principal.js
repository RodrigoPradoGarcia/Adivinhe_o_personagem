const personagens = 
[
    {
        nome:'Bowser',
        imagem:'./Personagens/Bowser.png'
    },
    {
        nome:'Creeper',
        imagem:'./Personagens/Creeper.png'
    },
    {
        nome:'Enderman',
        imagem:'./Personagens/Enderman.png'
    },
    {
        nome:'Link',
        imagem:'./Personagens/Link.png'
    },
    {
        nome:'Luigi',
        imagem:'./Personagens/Luigi.png'
    },
    {
        nome:'Mario',
        imagem:'./Personagens/Mario.png'
    },
    {
        nome:'Mega man',
        imagem:'./Personagens/Megaman.png'
    },
    {
        nome:'miss Pac Man',
        imagem:'./Personagens/msPacMan.png'
    },
    {
        nome:'Pac Man',
        imagem:'./Personagens/PacMan.png'
    },
    {
        nome:'Peach',
        imagem:'./Personagens/Peach.png'
    },
    {
        nome:'Sonic',
        imagem:'./Personagens/Sonic.png'
    },
    {
        nome:'Steve',
        imagem:'./Personagens/Steve.png'     
    },
    {
        nome:'Toad',
        imagem:'./Personagens/Toad.png'
    },
    {
        nome:'Yoshi',
        imagem:'./Personagens/Yoshi.png'
    },
    {
        nome:'Zelda',
        imagem:'./Personagens/Zelda.png'
    },
    {
        nome:'0',
        imagem:'./Personagens/Zero.png'
    },
    {
        nome:'Donkey Kong',
        imagem:'./Personagens/DonkeyKong.png'
    },
    {
        nome:'Cloud',
        imagem:'./Personagens/Cloud.png'
    },
    {
        nome:'Jill',
        imagem:'./Personagens/Jill.png'
    },
    {
        nome:'Leon',
        imagem:'./Personagens/Leon.png'
    },
    {
        nome:'Shadow',
        imagem:'./Personagens/Shadow.png'
    },
    {
        nome:'Tails',
        imagem:'./Personagens/Tails.png'
    },
    {
        nome:'Zack',
        imagem:'./Personagens/Zack.png'
    },
    {
        nome:'Hope',
        imagem:'./Personagens/Hope.png'
    },
    {
        nome:'Lightning',
        imagem:'./Personagens/Lightning.png'
    },
    {
        nome:'Yuna',
        imagem:'./Personagens/Yuna.png'
    }
];

let selecionado;
let tempo;
let acertos;
let erros;
let resposta;
let gravando = false;
let mutado = true;
let partida;

let timer;

let coinAudio = document.querySelector("#audioMoeda");
let deathAudio = document.querySelector("#audioMorte");
let timeAudio = document.querySelector("#audioTempo");

const inputAudio = new webkitSpeechRecognition();
inputAudio.interimResults = true;
inputAudio.continuous = true;
inputAudio.onresult=(event)=>{
    for(let i=event.resultIndex;i<event.results.length;i++)
    {
        if(event.results[i].isFinal)
        {
            const resultado = event.results[i][0].transcript.trim();
            setResposta(resultado);
        }
    }
};

setTempo(30);
setAcertos(0);
setErros(0);
setResposta("Comece a falar...");
setPartida('nao iniciada');

function setPartida(valor)
{
    let opcoes = ['nao iniciada','em andamento','perdida','vencida'];
    if(opcoes.includes(valor))
    {
        partida = valor;
        switch(valor)
        {
            case opcoes[0]:
                document.querySelector(".regras").innerHTML = "<div id='regras' class='divImagem'><h3 class='mt-5 text-center'>Regras</h3><ul><li>A imagem do personagem irá aparecer aqui</li><li>Você precisa falar o nome do personagem corretamente para vencer</li><li>O tempo máximo para adivinhar o nome é de 30 segundos</li><li>Você pode ativar ou desativar o microfone clicando no botão abaixo</li></ul><button onclick='setPartida(\"em andamento\")' class='mx-auto my-auto btn btn-light text-dark btn-lg' style='max-width:300px;'>Começar partida</button></div>";
                break;
            case opcoes[1]:
                document.querySelector(".regras").classList.remove('pb-5');
                document.querySelector(".regras").innerHTML = "";
                document.querySelector("#palco").innerHTML = "<img id='imagemPersonagem' class='imag' src=''></img>";
                trocarPersonagem();
                iniciarPartida();
                break;
            case opcoes[2]:
                document.querySelector("#palco").innerHTML = "<div id='perdeu' class='divImagem bg-danger'><h3 class='mt-5 text-center text-light'>Tempo esgotado!</h3><svg style='color:rgb(255, 255, 255);' xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='mt-5 mx-auto bi bi-x-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z'/></svg><button onclick='setPartida(\"em andamento\")' class='btnResult mx-auto my-auto btn btn-light btn-lg' style='max-width:300px;'>Proximo personagem</button></div>";
                setErros(erros+1);
                break;
            case opcoes[3]:
                document.querySelector("#palco").innerHTML = "<div id='perdeu' class='divImagem bg-success'><h3 class='mt-5 text-center text-light'>Resposta correta!</h3><svg style='color:rgb(255, 255, 255);' xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='mx-auto my-4 bi bi-check-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z'/></svg><button onclick='setPartida(\"em andamento\")' class='btnResult mx-auto my-auto btn btn-light btn-lg' style='max-width:300px;'>Proximo personagem</button></div>";
                setAcertos(acertos+1);
                break;
        }
    }   
    else
    {
        alert("Status de partida inválido!");
    }
}

function trocarPersonagem()
{
    selecionado = personagens[Math.floor(Math.random()*personagens.length)];
    document.querySelector("#imagemPersonagem").src = selecionado.imagem;
}

function iniciarPartida()
{
    timer = setInterval( async()=>{
        setTempo(tempo-1);
        if(tempo==10)
        {
            if(!mutado)
            {
                await tempoAudio.play();
            }
        }
        else if(tempo==0)
        {
            clearInterval(timer);
            setTempo(30);
            setPartida('perdida');
            deathAudio.play();
            toggleAudio();
            selecionado = null;
        }
    } , 1000 );
}


function setTempo(valor)
{
    tempo = valor;
    if(valor==10)
    {
        document.querySelector("#tempo").classList.remove('text-warning');
        document.querySelector("#tempo").classList.add('text-danger');
        timeAudio.play();
    }
    if(valor==30)
    {
        document.querySelector("#tempo").classList.add('text-warning');
        document.querySelector("#tempo").classList.remove('text-danger');
    }
    document.querySelector("#tempo").innerHTML = tempo;
}

function setAcertos(valor)
{
    acertos = valor;
    document.querySelector("#acertos").innerHTML = acertos;
}

function setErros(valor)
{
    erros = valor;
    document.querySelector("#erros").innerHTML = erros;
}

function setResposta(valor)
{
    resposta = valor;
    document.querySelector("#resposta").innerHTML = valor;

    if(partida=='em andamento')
    {
        if(resposta.toLowerCase()==selecionado.nome.toLowerCase() || resposta.toLowerCase()==selecionado.nome.toLowerCase()+"?" || resposta.toLowerCase()==selecionado.nome.toLowerCase()+".")
        {
            clearInterval(timer);
            setTempo(30);
            setPartida('vencida');
            coinAudio.play();
            toggleAudio();
            selecionado = null;
        }
    }
}

function toggleAudio()
{
    document.querySelector("#gravarAudio").classList.toggle('d-none');
    document.querySelector("#pausarAudio").classList.toggle('d-none');
    gravando = !gravando;
    if(gravando)
    {
        inputAudio.start();
    }
    else
    {
        inputAudio.stop();
    }
}

async function toggleMutado()
{
    document.querySelector("#btnmuted").classList.toggle('d-none');
    document.querySelector("#btnunmuted").classList.toggle('d-none');
    mutado = !mutado;
}

window.setInterval( ()=>{
    document.querySelector("#gravando").innerHTML = 'Gravando.&nbsp&nbsp';
    window.setTimeout( ()=>{
        document.querySelector("#gravando").innerHTML = 'Gravando..&nbsp';
    } , 500);
    window.setTimeout( ()=>{
        document.querySelector("#gravando").innerHTML = 'Gravando...';
    } , 1000);
} ,1500);