
function main(){

}

function game(){

    let gameCounter = 3;
    
    const redBox = $(".red");
    const blueBox = $(".blue");
    const yellowBox = $(".yellow");
    const greenBox = $(".green");

   

   for(let i = 0; i < gameCounter; i++){

    

    setTimeout(() => {
        
        const randomBox = pickRandomBox();

        console.log(randomBox);
        switch(randomBox){
        case 1:
            redBox.css("borderColor", "white");
            break;
        case 2:
            blueBox.css("borderColor", "white");
            break;
        case 3:
            yellowBox.css("borderColor", "white");
            break;
        case 4:
            greenBox.css("borderColor", "white");
            break;
    }
    }, 3000);
   }
    
}

$(document).keydown(function(event){

    console.log(event.key);

    if(event.key === "a"){
        game();
    }
});


function countPoints(){

}

function pickRandomBox(){

    const randomBox = Math.floor(Math.random() * 4 + 1);

    return randomBox;
}
