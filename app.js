let userScore = 1;

let = gamePattern = [];
let playerPattern = [];

let gameState;

//game pattern
//runda gracza
//gracz zaznacza 
// check - false/true


function main(){

}

async function game(){

    gameState = true;

    while(gameState){
        console.log("xd");
        countPoints();
        await playRound();
    }
    

}


$(document).keydown(function(event){

    console.log(event.key);

    if(event.key === "a" || event.key === "A"){
        game();
    }

});

async function playRound() {

    await new Promise(resolve => setTimeout(resolve, 500));

    await changeColorOfBox();

    console.log("zrobilo changecolorofbox");

    for(let i = 0; i < userScore; i++){
        if(!gameState){
            console.log("Wrong pattern");
            return;
        }
        else{
            await playerMove(i);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    console.log(`User Score ${userScore}`);

    userScore++;

    console.log(`User Score ${userScore}`);

    console.log("Checked all patterns");
        
}


async function countPoints(){

    const startRestartInformation = $("#startResetInformation");
    const score = $("#score");

    if(gameState === true){
        startRestartInformation.text("Simon says");
        score.text(`Score: ${userScore}`);
        score.css("display", "block");
    }
    else{
        startRestartInformation.text("Press A key to restart");
        startRestartInformation.css("display", "block");
        score.text(`Your score in this round: ${userScore}`);
    }

}

async function changeColorOfBox(){

    const redBox = $(".red");
    const blueBox = $(".blue");
    const yellowBox = $(".yellow");
    const greenBox = $(".green");

    let randomBox = pickRandomBox();

    console.log(randomBox);

    gamePattern.push(randomBox);

    console.log(gamePattern);

    for (let i = 0; i < gamePattern.length; i++) {

        await new Promise(resolve => setTimeout(resolve, 800));

        switch (gamePattern[i]) {
            case "red":
                //redBox.css("borderColor", "white");
                redBox.fadeOut(200).fadeIn(200);
                let redBoxAudio = new Audio("sounds/red.mp3");
                redBoxAudio.play()
                break;
            case "blue":
                //blueBox.css("borderColor", "white");
                blueBox.fadeOut(200).fadeIn(200);
                let blueBoxAudio = new Audio("sounds/blue.mp3");
                blueBoxAudio.play();
                break;
            case "yellow":
                //yellowBox.css("borderColor", "white");
                yellowBox.fadeOut(200).fadeIn(200);
                let yellowBoxAudio = new Audio("sounds/yellow.mp3");
                yellowBoxAudio.play()
                break;
            case "green":
                //greenBox.css("borderColor", "white");
                greenBox.fadeOut(200).fadeIn(200);
                let greenBoxAudio = new Audio("sounds/green.mp3");
                greenBoxAudio.play()
                break;
            default:
                break;
        }

        await new Promise(resolve => setTimeout(resolve, 300));

        const startRestartInformation = $("#startResetInformation");
        startRestartInformation.text("Player move");   
    }

}

    

    


function playerMove(currentMoveLoop){

    const redBox = "play-box red";
    const blueBox = "play-box blue";
    const yellowBox = "play-box yellow";
    const greenBox = "play-box green";

    let currentMove = currentMoveLoop;

    console.log(`Player mark move number ${currentMove}`);

    return new Promise((resolve) => {
        $(document).one("click", function (event) {
            const clickedElement = event.target;
            const clickedElementClass = clickedElement.className;

            const clickedElementBoxColor = clickedElementClass.slice(9);

            console.log(`Player marks ${clickedElementBoxColor}`);

            if (clickedElementClass === redBox) {
                let redBoxAudio = new Audio("sounds/red.mp3");
                redBoxAudio.play()
                playerPattern.push(clickedElementBoxColor);
            }
            else if (clickedElementClass === blueBox) {
                let blueBoxAudio = new Audio("sounds/blue.mp3");
                blueBoxAudio.play();
                playerPattern.push(clickedElementBoxColor);

            }
            else if (clickedElementClass === yellowBox) {
                let yellowBoxAudio = new Audio("sounds/yellow.mp3");
                yellowBoxAudio.play()
                playerPattern.push(clickedElementBoxColor);

            }
            else if (clickedElementClass === greenBox) {
                let greenBoxAudio = new Audio("sounds/green.mp3");
                greenBoxAudio.play()
                playerPattern.push(clickedElementBoxColor);
            }

            resolve(checkAnswers(currentMove));

        })
    })

}

function checkAnswers(currentMove){

    console.log("currentMove" + currentMove);

    console.log(`Game checks move number ${currentMove}`);


    if(gamePattern[currentMove] !== playerPattern[currentMove]){
        gameState = false;
        console.log("YOU LOSE!");
    }
    else{
        console.log("Dobra odpowiedz nastepna runda!");
    }
    

}

function pickRandomBox(){

    const randomNumber = Math.floor(Math.random() * 4 + 1);

    let randomBox = "";

    switch(randomNumber){
        case 1:
            randomBox = "red"
            break;
        case 2:
            randomBox = "blue"
            break;
        case 3:
            randomBox = "yellow"
            break;
        case 4:
            randomBox = "green"
            break;
        default:
            break;
    }

    return randomBox;
}


$("#testDiv").click(function(){
    console.log("clicked");
    $("#testDiv").fadeOut(200).fadeIn(200);
})




