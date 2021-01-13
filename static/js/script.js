//chanllenge1 age in days
 function ageInDays(){
     var birthYear=prompt("please enter your bith year 🥰");
     var yourAge=(2021-birthYear)*365;
     var h1=document.createElement('h1');
     var textAnswer=document.createTextNode('you are '+yourAge +' days old.');
     h1.setAttribute('id','ageInDays');
     h1.appendChild(textAnswer);
     document.getElementById('flex-box-result').appendChild(h1);
    
 }

 function reset(){
     document.getElementById('ageInDays').remove();
 }



 //challenge2: Generate Cat
 function generateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src ="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
 }



 //challange3: Rock Paper and Scissors

 function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randomRpsInt());
    results=decideWinner(humanChoice,botChoice);//[0,1] human lost bot won
    message=finalMessage(results);//you Won
    rpsFrontEnd(humanChoice,botChoice,message);//this will deal with the frontend
     
 }

 function randomRpsInt(){
     return Math.floor(Math.random()*3);//this will generate the random number from 0,1,2
 }

 function numberToChoice(number){
     return ['rock','paper','scissors'][number];
 }

 function decideWinner(humanChoice,botChoice){
     var rpsDatabase={
         "rock":{'scissors':1,'rock':0.5,'paper':0},
         "paper":{'rock':1,'paper':0.5,'scissors':0},
         "scissors":{'paper':1,'scissors':0.5,'rock':0}
     }
     var yourScore=rpsDatabase[humanChoice][botChoice];
     var botScore=rpsDatabase[botChoice][humanChoice];
     return [yourScore,botScore];
 }

 function finalMessage([yourScore,botScore]){
    if(yourScore===0.5){
        return{
            "message":"Game Tied",
            "color":"brown"
        };
    }
    else if(yourScore===0){
        return {
            "message":"You Lost!!",
            "color":"red"
        };
    }
    else{
        return {
            "message":"You Won!!",
            "color":"Green"
        };
    }
 }

 function rpsFrontEnd(humanChoice,botChoice,finalMessage){
     imagesDatabase={
         "rock":document.getElementById('rock').src,
         "paper":document.getElementById('paper').src,
         "scissors":document.getElementById('scissors').src
     }

     //remove the images
     document.getElementById('rock').remove();
     document.getElementById('paper').remove();
     document.getElementById('scissors').remove();

     //creating the div for the final result
     humanDiv=document.createElement('div');
     messageDiv=document.createElement('div');
     botDiv=document.createElement('div');

     //filling up the new div with new values
     humanDiv.innerHTML="<img src='"+imagesDatabase[humanChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(50,30,233,0.7);'>";
     document.getElementById('flex-box-rps-div').appendChild(humanDiv);

     messageDiv.innerHTML=`<h2 style="color:${finalMessage.color}">${finalMessage.message}</h2>`;
     document.getElementById('flex-box-rps-div').appendChild(messageDiv);

     botDiv.innerHTML="<img src='"+imagesDatabase[botChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(223,30,50,0.7)'>";
     document.getElementById('flex-box-rps-div').appendChild(botDiv);
 }



 //challenge4: Chnage color of all buttons
 var all_buttons=document.getElementsByTagName('button');
 console.log(all_buttons);

 var copyAllButtons=[];
 for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
 }
 console.log(copyAllButtons);

 //main function which change the color
 function buttonColorChange (buttonThing){
     if(buttonThing.value==='red'){
         buttonRed();
     }
     else if(buttonThing.value==='green'){
        buttonGreen();
    }
    else if(buttonThing.value==='blue'){
        buttonBlue();
    }
    else if(buttonThing.value==='random'){
        buttonRandom();
    }
    else if(buttonThing.value==='reset'){
        buttonReset();
    }

    function buttonRed(){
        for(let i=0;i<all_buttons.length;i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-danger');
        }
    }
    function buttonGreen(){
        for(let i=0;i<all_buttons.length;i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-success');
        }
    }
    function buttonBlue(){
        for(let i=0;i<all_buttons.length;i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-primary');
        }
    }
    function buttonReset(){
        for(let i=0;i<all_buttons.length;i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copyAllButtons[i]);
        }
    }
    function buttonRandom(){
        let choices=['btn-primary','btn-warning','btn-success','btn-danger'];
        for(let i=0;i<all_buttons.length;i++){
            let random=Math.floor(Math.random()*4);
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(choices[random]);
        }
    }
}



//challenge5: blackjack
let blackjackGame={
    'you':{
        'scoreSpan':'#your-blackjack-score',
        'div':'#your-box',
        'score':0
    },
    'dealer':{
        'scoreSpan':'#dealer-blackjack-score',
        'div':'#dealer-box',
        'score':0
    },
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'Q':10,'J':10,'K':10,'A':[1,11]},
}
const YOU=blackjackGame.you;
const DEALER=blackjackGame.dealer;
// console.log(YOU,DEALER);

const hitSound=new Audio('static/sounds/swish.m4a');
const awwSound= new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    let card=randomCard();
    showCard(YOU,card);
    updateScore(card,YOU);
    showScore(YOU);
}
function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame.cards[randomIndex];  
}
function showCard(activePlayer,card){
    if(activePlayer.score<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`static/images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitSound.play();
    }
}
function blackjackDeal(){
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    // console.log(yourImages);
    for(let i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    YOU.score=0;
    DEALER.score=0;

    document.querySelector(YOU.scoreSpan).textContent=0;
    document.querySelector(DEALER.scoreSpan).textContent=0;
    document.querySelector(YOU.scoreSpan).style.color='white';
    document.querySelector(DEALER.scoreSpan).style.color='white';


}
function updateScore(card,activePlayer){
    //if adding 11 keeps me below 21 add 11 otherwise add 1.
    if(card==='A'){
        if(activePlayer.score+blackjackGame.cardsMap[card][1]<=21){
            activePlayer.score += blackjackGame.cardsMap[card][1];
        }
        else{
            activePlayer.score += blackjackGame.cardsMap[card][0];
        }
    }
    else{
        activePlayer.score += blackjackGame.cardsMap[card];
    }  
}
function showScore(activePlayer){
    if(activePlayer.score<=21){
    document.querySelector(activePlayer.scoreSpan).textContent=activePlayer.score;
    }
    else{
        document.querySelector(activePlayer.scoreSpan).textContent="khel khatam!!";
        document.querySelector(activePlayer.scoreSpan).style.color="red";
    }
}










