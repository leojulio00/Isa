const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const data = new Date();



//PERGUNTAS


const isaEsclamacao = "isa olá isa bom dia boa tarde boa noite isa";
const bomDia = "isa bom dia boa tarde boa noite";
const sobreCriador = "qual é o nome do teu criador quem é o teu criador como se chama quem criou você";
const queHoras = "que horas são qual é a hora actual";
const qualTeuNome = "qual é o teu nome";
const clarear = "clarear a deixa coloca a tela mais clara deixar a tela mais brilhante";
const escurecer = "escurecer a tela deixa coloca a tela mais escura deixar a mais escurecida";




//RESPOSTAS

const isaEsclamacaoRes = ["Bom dia, como você está", "Boa tarde, como você está", "Boa noite, como você está"];

const sobreCriadorRes = "O meu criador chama-se Leonildo Júlio, ele criou-me no ano de 2021 e me baptizou com o nome da mãe";

const queHorasRes = horaActual();

const greetings = ["am good you little piece of love", "doing good homeboi", "leave me alone"];

const weather = ["the weather its fine today", "you need a ton"];

const qualTeuNomeRes = "Meu nome é Isa, eu sou uma inteligência artificial";

const clarearRes = "Clareando a tela";
const escurecerRes = "Escurecendo a tela";


//FUNCOES PRINCIPAIS

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

speechRecognition.lang = "pt";

recognition.onstart = function() {
  content.innerHTML("o microfone ja esta ligado, podes comecar a falar");
};

recognition.onresult = function(event) {
  const current = event.resultIndex;
  
  const transcript = event.results[current][0].transcript;
  content.innerHTML = transcript;
  
  
  //COMANDOS AREA DE TEXTO
  
  /*
  if(message.includes("pesquisar por")){
  var mensagem = message;
  var mensagemIndexPor = mensagem.lastIndexOf("por");
  
  content.innerHTML = mensagemIndexPor;
}*/
  
 /*if(transcript.includes(escurecer)){
    //speech.text = escurecerRes;
    container.classList.remove("active")
  }
  if(transcript.includes(clarear)){
    //speech.text = clarearRes;
    container.classList.add("active")
  }*/
  
  readOutLoud(transcript.toLowerCase());
};

btn.addEventListener("click", ()=>{
  recognition.start();
});



  function compararPalavras(textoExistente,textoAdquirido){
    
    var textoExistente, textoAdquirido;
    
    
    var addArr = textoAdquirido.split(" ");
  
    var palavrasEncontradas = 0, palavrasNaoEncontradas = 0;
  
    for(var i = 0; i < addArr.length; i++){
      
      if(textoExistente.search(addArr[i]) < 0){
        palavrasNaoEncontradas += 1;
      }else{
        palavrasEncontradas += 1;
      }
     
    }
      
      if(palavrasEncontradas > palavrasNaoEncontradas){
        return 1;
      }else{
        return 0;
      }
  }



const minhaHora = {
  hora: data.getHours(),
  minutos: data.getMinutes(),
  dia: data.getDate(),
  diaSemana: data.getDay(),
  mes: data.getMonth(),
  anos: data.getFullYear()
}

  function horaActual(){
    
    const hora = data.getHours();
    const minutos = data.getMinutes();
    
    return hora + " horas e " + minutos + " minutos";
  }

function readOutLoud(message){
  const fala = SpeechSynthesisUtterance;
  const speech = new fala();
  
  
  
  
  
  speech.text = "Não entendi bem o que você disse, peço para repetir ou falar sobre assuntos que eu conheço!";
  
  if(compararPalavras(isaEsclamacao, message) == 1){
    if(minhaHora.hora < 12 && minhaHora.hora > 0){
      speech.text = isaEsclamacaoRes[0];
    }else if(minhaHora.hora >= 12 && minhaHora.hora < 18){
      speech.text = isaEsclamacaoRes[1];
    }else{
      speech.text = isaEsclamacaoRes[2];
    }
  }
  
  if(compararPalavras(sobreCriador,message) == 1){
    speech.text = sobreCriadorRes;
  }
  
  if(compararPalavras(queHoras, message) == 1){
    speech.text = queHorasRes;
    content.innerHTML = horaActual();
  }
  
  if(compararPalavras(qualTeuNome, message) == 1){
    speech.text = qualTeuNomeRes;
    content.innerHTML = message;
  }
  
  if(compararPalavras(escurecer,message) == 1){
    speech.text = escurecerRes;
    container.classList.remove("active");
  }
  if(compararPalavras(clarear,message) == 1){
    speech.text = clarearRes;
    container.classList.add("active");
  }
  
  if(message.includes("pesquisar por")){
    
    var contentArray = message.split(" ");
    var lastWordIndex = contentArray.length;
    var lastWord = contentArray[lastWordIndex - 1];
    var subStringFinal = message.substr(message.indexOf("por") + 4, message.lastIndexOf(lastWord));
    var subStringFinalReplace = subStringFinal.replace(/ /g, "+");
    const googleSearch = "https://www.google.com/search?q=";
    content.innerHTML = "encaminhando a tua pesquisa...";
    speech.text = "encaminhando a tua pesquisa..."
    window.location.href = googleSearch + subStringFinalReplace;
  }
  
  
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = .54;
  
  window.speechSynthesis.speak(speech);
}



/*function readOutLoud(message){
  const fala = SpeechSynthesisUtterance();
  const speech = new fala();
  
  speech.text = "Não entendi bem o que você disse, peço para repetir ou falar sobre assuntos que eu conheço!";
  
  
  
    if(compararPalavras(sobreCriador,message) == 1){
    speech.text = sobreCriadorRes;
  }
  if(compararPalavras(isaEsclamacao, message) == 1){
    if(minhaHora.hora < 12 && minhaHora.hora > 0){
      speech.text = isaEsclamacaoRes[0];
    }else if(minhaHora.hora >= 12 && minhaHora.hora < 18){
      speech.text = isaEsclamacaoRes[1];
    }else{
      speech.text = isaEsclamacaoRes[2];
    }
  
    
    
    
    //speech.text = isaEsclamacaoRes;
  }
  
  if(compararPalavras(bomDia, message) == 1){
    //if(){}
    
    speech.text = "Bom dia, como você está";
  }
  
  if(compararPalavras(queHoras, message) == 1){
    speech.text = queHorasRes;
    content.innerHTML = horaActual();
  }
  
  if(compararPalavras(qualTeuNome, message) == 1){
    speech.text = qualTeuNomeRes;
  }
  
  if(compararPalavras(escurecer,message) == 1){
    speech.text = escurecerRes;
    container.classList.remove("active")
  }
  
  if(compararPalavras(clarear,message) == 1){
    speech.text = clarearRes;
    container.classList.add("active")
  }
/*  
if(message.includes("pesquisar por")){
  var mensagem = message;
  var mensagemIndexPor = mensagem.lastIndexOf("por");
  
  content.innerHTML = mensagemIndexPor;
}
  */
  
  
  
  
  
  //speech.text = "I dont understand what you said";
  
  /*switch(message.includes()){
    case "How are you":
      //const finalText = greetings[Math.floor(Math.random * greetings.length)];
      const finalText = greetings[1];
      speech.text = finalText; 
    //speech.text = "am good and how are you?";
      alert("ola");
    break;
    case "Como te chamas" || "Qual é o teu nome":
      speech.text = nome;
    alert("ola");
    break;
    
    default:
    speech.text = "Não entendi o que disseste";break;
  }
  
  if(message.includes("how are you")){
    //const finalText = greetings[Math.floor(Math.random * greetings.length)];
    //const finalText = greetings[1];
   //speech.text = finalText; 
    speech.text = "am good and how are you?";
    //alert("ola");
  }else{
    speech.text = "I dont understand what you said";
  }
  
  
  if(message.includes("como te chamas")){
    speech.text = nome;
  }else{
    speech.text = "Eu não entendi o que você disse";
  }
  
  if(message.includes(sobreCriador)){
    speech.text = sobreCriadorRes;
  }else{
    speech.text = "erro";
  }
  
 
  
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = .54;
  
  window.speechSynthesis.speak(speech);
}*/

