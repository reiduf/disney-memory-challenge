/*----- constants -----*/
const characters = [
    {name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg"}, //0
    {name: "simba", href: "https://i.imgur.com/BhgBKQq.jpg"}, //1
    {name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg"}, //2
    {name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg"}, //3
    {name: "walle", href: "https://i.imgur.com/lltMlBn.jpg"}, //4
    {name: "moana", href: "https://i.imgur.com/wunlajh.jpg"}, //5
    {name: "kevin", href: "https://i.imgur.com/zE3683g.jpg"}, //6
    {name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg"}, //7
    {name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg"}, //8
    {name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg"}, //9
    {name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg"}, //10
    {name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg"}, //11
 ]

 const preShuffleChars = [];

/*----- state variables -----*/
let shuffledChars; //array that stores the shuffled tile order
let winner; //true or false
let numMatches; //need 12 matches to win the game
let matchStatus //true or false
let turn //1 or -1 (1 is first selection, -1 is second selection)


/*----- cached elements  -----*/
const tableEl = document.getElementById("table"); 
const tileEls = document.querySelectorAll("#table > div");


/*----- event listeners -----*/
tableEl.addEventListener("click", handleClick);


/*----- functions -----*/
initialize();

function initialize() {
    //shuffle the preShuffleChars array
    numMatches = 0;
    turn = 1;
    createPreShuffleArray();
    render();
}

function createPreShuffleArray() {
    characters.forEach(function(character) {
      const charObj = {};
      charObj.tileValue = `${character.name}1`; //eg "simba1"
      charObj.name = character.name;
      charObj.turn = 0;
      preShuffleChars.push(charObj);

      const charObj2 = {};
      charObj2.tileValue = `${character.name}2`; //eg "simba2"
      charObj2.name = character.name;
      charObj.turn = 0;
      preShuffleChars.push(charObj2);
    });
};

function handleClick(evt) {
    const clickedTileElID = evt.target.getAttribute("id");
    const activeCharObj = preShuffleChars[clickedTileElID]; //update to shuffled deck later
    
    //GUARD - only click the tiles
    if (evt.target.tagName !== "DIV") {
        return;
    }

    //GUARD - dont click the same tile
    if (activeCharObj.turn) {
        return;
    }

    //GUARD - once second selection made, stop
    if (preShuffleChars.some(char => char.turn === -1)) {
        return;
    }

    //assing the turn number to the state array, change the turn, then render
    activeCharObj.turn = turn;  
    turn *= -1;
    render();

    //check the state array, if the second selection was assigned, then check for a match
    if (preShuffleChars.some(char => char.turn === -1)) {
        setTimeout(function(){
            checkForMatch();
            render();
        }, 900)
    }
};

function checkForMatch() {
    const firstTurn = preShuffleChars.find(char => char.turn === 1);
    const secondTurn = preShuffleChars.find(char => char.turn === -1);

    //compare if the name property of those two match
    if (firstTurn.name === secondTurn.name) {
        numMatches += 1;
        firstTurn.match = true;
        secondTurn.match = true;
    } 

    nextGuess();
};

function nextGuess() {
    preShuffleChars.forEach(char => char.turn = 0);
};

function render() {
    renderTiles();
    renderMessage();
}

//go through the characters, if "active" is true, then render the card
function renderTiles() {
    preShuffleChars.forEach(function(char, idx){
        const tileEl = document.getElementById(idx);
    
        if (char.turn) { //if theres a turn
            tileEl.classList.remove("default", "breathe");
            tileEl.style.backgroundImage = `url("${characters.find(character => character.name === char.name).href}")`;
        } else if (char.match) { //if theres a match
            tileEl.style.visibility = "hidden";
        } else if (!char.match) { //theres a turn and not a match
            tileEl.style.backgroundImage = null;
            tileEl.classList.add("default", "breathe");
        } 
    });
}

function renderMessage() {
    document.getElementById("match-counter").innerText = numMatches;
    const msg = document.getElementById("message");
    const winnerMsg = document.getElementById("winner-message");

    if(turn === 1) {
        msg.innerText = "Select first tile"
    } else if(turn === -1) {
        msg.innerText = "Select second tile";
    } else if (numMatches === 12) {
        winnerMsg.classList.remove("display-none");
    }
};



    

