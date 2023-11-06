let score = 0;

document.getElementById("cooperate").addEventListener("click", function() {
    playRound("cooperate");
});

document.getElementById("betray").addEventListener("click", function() {
    playRound("betray");
});
document.getElementById("playAgain").addEventListener("click", function() {
    playAgain();
});

let last = "cooperate";
let flag = 0;
let arr = [0,1,2,3];  
shuffle(arr);
let index = 0;
let behaviour= arr[index];
let behaviourString;
let nCoop = 0;
let nBetray = 0;
let cooperate = 2;
let betrayed  = -1;
let player_betrays = 3;
let both_betrayed = 0; 
let rounds_played = 0;

let rounds = 5 + getRandomInt(4); //entre 5 y 7 rondas
decode(behaviour);

function playRound(playerDecision) {
    
    let computerDecision
    switch (behaviour){
        case 0: //always trust
            computerDecision = "cooperate";
            break;
        case 1: //always betrays
            computerDecision = "betray"
            break;
        case 2: //copycat
            computerDecision = last;
            last = playerDecision;
            break;
        case 3: //grudge
            if(flag == 0){
                computerDecision = "cooperate"
            }else {
                computerDecision = "betray";
            }
            if(playerDecision == "betray"){
                flag = 1;
            }
            break;
    } 
    
    if(playerDecision == "cooperate"){
        nCoop++;
        if(computerDecision == "cooperate"){
            result  = "Ambos cooperaron! recibes " + cooperate + " puntos";
            score = score + cooperate;
        }else{
            result = "Te traicionaron :( recibes "+ betrayed + " puntos";
            score = score + betrayed;
        }
    }else if(computerDecision =="cooperate"){
        nBetray++;
        result = "Traicionaste a tu contrincante y él confió en ti ganas " + player_betrays +" puntos";
        score = score + player_betrays;
    }else{
        nBetray++;
        result = "Ninguno confió en el otro y ambos traicionaron, nadie gana nada"
    }

    document.getElementById("result").textContent = "Resultado: " + result + " rondas jugadas " +index;
    document.getElementById("score").textContent = "Puntaje: " + score;
    document.getElementById("behaviour").textContent = "Comportamiento: " + behaviourString;
    rounds_played++;
    if(rounds == rounds_played){
        rounds_played = 0;
        index= index + 1;
        if(index==arr.length){
            result = "felicidades, finalizaste una partida completa con puntaje: " + score + " habiendo cooperado " + nCoop +" veces y traicionado " + nBetray + " veces."

            document.getElementById("game-container").style.display = "none";

            // Muestra el mensaje de resultado
            document.getElementById("endScreen").style.display = "block";
            document.getElementById("end").textContent = result;
        }
        behaviour = arr[index]
        decode(behaviour);
    }
    // nCoop = 0;
    // nBetray = 0;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
function decode(int){
    switch (behaviour){
        case 0: //always trust
                behaviourString = "always trust";
                break;
            case 1: //always betrays
                behaviourString = "always betray";
                break;
            case 2: //copycat
                behaviourString = "copycat";
                break;
            case 3: //grudge
                behaviourString= "grudge";
                break;
    }
    
}
function playAgain(){
     last = "cooperate";
     flag = 0;
     arr = [0,1,2,3];  
    shuffle(arr);
     index = 0;
     behaviour= arr[index];
     behaviourString;
     nCoop = 0;
     nBetray = 0;
     cooperate = 2;
     betrayed  = -1;
     player_betrays = 3;
     both_betrayed = 0; 
     score = 0;
    
     rounds = 4 + getRandomInt(4); //entre 4 y 7 rondas
    decode(behaviour);
    document.getElementById("game-container").style.display = "block";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("result").textContent = "Resultado: ";
    document.getElementById("score").textContent = "Puntaje: ";
    document.getElementById("behaviour").textContent = "Comportamiento: ";
}