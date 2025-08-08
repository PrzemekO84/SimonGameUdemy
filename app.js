let userScore = 1;

let gamePattern = [];
let playerPattern = [];

let gameState = false;

//game pattern
//runda gracza
//gracz zaznacza 
// check - false/true


function main(){

}

async function game(){

    gameState = true;

    while(gameState){
        countPoints();
        await playRound();
    }
    

}


$(document).keydown(function(event){

    if((event.key === "a" || event.key === "A") && gameState === false){
        game();
    }

});

async function playRound() {

    await changeColorOfBox();   

    await new Promise(resolve => setTimeout(resolve, 400));

    const startRestartInformation = $("#startResetInformation");
    startRestartInformation.text("Player move");

    for(let i = 0; i < userScore; i++){
        if(!gameState){
            return;
        }
        else{
            await playerMove(i);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    playerPattern = [];

    userScore++;
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
        startRestartInformation.text("Wrong answer! Press A key to restart");
        startRestartInformation.css("display", "block");
        score.text(`Your score in this round was: ${userScore}`);
    }

}

async function changeColorOfBox(){

    await new Promise(resolve => setTimeout(resolve, 500));

    const redBox = $(".red");
    const blueBox = $(".blue");
    const yellowBox = $(".yellow");
    const greenBox = $(".green");

    let randomBox = pickRandomBox();

    gamePattern.push(randomBox);

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

    }

}

function playerMove(currentMoveLoop){

    const redBox = "play-box red";
    const blueBox = "play-box blue";
    const yellowBox = "play-box yellow";
    const greenBox = "play-box green";

    const redBoxMove = $(".red");
    const blueBoxMove = $(".blue");
    const yellowBoxMove = $(".yellow");
    const greenBoxMove = $(".green");

    let currentMove = currentMoveLoop;

    return new Promise((resolve) => {
        $(document).one("click", function (event) {
            const clickedElement = event.target;
            const clickedElementClass = clickedElement.className;

            const clickedElementBoxColor = clickedElementClass.slice(9);

            if (clickedElementClass === redBox) {
                redBoxMove.fadeOut(100).fadeIn(100);
                let redBoxAudio = new Audio("sounds/red.mp3");
                redBoxAudio.play()
                playerPattern.push(clickedElementBoxColor);
            }
            else if (clickedElementClass === blueBox) {
                blueBoxMove.fadeOut(100).fadeIn(100);
                let blueBoxAudio = new Audio("sounds/blue.mp3");
                blueBoxAudio.play();
                playerPattern.push(clickedElementBoxColor);

            }
            else if (clickedElementClass === yellowBox) {
                yellowBoxMove.fadeOut(100).fadeIn(100);
                let yellowBoxAudio = new Audio("sounds/yellow.mp3");
                yellowBoxAudio.play()
                playerPattern.push(clickedElementBoxColor);

            }
            else if (clickedElementClass === greenBox) {
                greenBoxMove.fadeOut(100).fadeIn(100);
                let greenBoxAudio = new Audio("sounds/green.mp3");
                greenBoxAudio.play()
                playerPattern.push(clickedElementBoxColor)
            }

            resolve(checkAnswers(currentMove));

        })
    })

}

function checkAnswers(currentMove){

    if(gamePattern[currentMove] !== playerPattern[currentMove]){
        gameState = false;
        const loseSound = new Audio("sounds/wrong.mp3");
        loseSound.play();
        countPoints();
        userScore = 0;
        gamePattern = [];
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
