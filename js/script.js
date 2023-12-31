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
 ];

/*----- state variables -----*/
let numMatches; //need 12 matches to win the game
let matchStatus; //1 = match, 2 = no match, 3 = default
let turn; //1 or -1 (1 is first selection, -1 is second selection)
let tileDeck; //state arrray

/*----- cached elements  -----*/
const tableEl = document.getElementById("table"); 
const tileEls = document.querySelectorAll("#table > div");
const demoButtonEl = document.querySelector(".demo");

/*----- event listeners -----*/
tableEl.addEventListener("click", handleClick);
document.querySelector(".restart").addEventListener("click", runRestartBtn);
document.querySelector(".demo").addEventListener("click", runDemoBtn);

/*----- functions -----*/
initialize(false); //dont start in demo mode

function initialize(isDemo) {
    createPreShuffleArray();

    if (!isDemo) {   
        shuffleTiles(tileDeck);
    }

    numMatches = 0;
    turn = 1;
    matchStatus = 3; //default
    demoButtonEl.classList.remove("demo-button-activate");
    render();
};

function runDemoBtn() {
    initialize(true);
    demoButtonEl.classList.add("demo-button-activate");
};

function runRestartBtn() {
    initialize(false);
};

function createPreShuffleArray() {
    tileDeck = [];

    characters.forEach(function(character) {
      const charObj = {};
      charObj.tileValue = `${character.name}1`; //eg "simba1"
      charObj.name = character.name;
      charObj.turn = 0;
      tileDeck.push(charObj);

      const charObj2 = {};
      charObj2.tileValue = `${character.name}2`; //eg "simba2"
      charObj2.name = character.name;
      charObj2.turn = 0;
      tileDeck.push(charObj2);
    });
};

function shuffleTiles(array) {
    let currentArrayIndex = array.length; //the END element of the array
    let randomArrayIndex;
  
    //only do this when there are elements to shuffle
    while (currentArrayIndex > 0) {

        //pick an element at random (i.e. randomIndex = random number between 0 - array unshuffled end)
        randomArrayIndex = Math.floor(Math.random() * currentArrayIndex); 
        currentArrayIndex--; //set up guard for shuffle area  
        
        //save the item to be overwritten
        const savedPrevElement = array[currentArrayIndex]

        //replace the current index with random index,
        //put the overwritten index back in
        array[currentArrayIndex] = array[randomArrayIndex];
        array[randomArrayIndex] = savedPrevElement; 
    }
  
    return array;
};

function handleClick(evt) {
    const clickedTileElID = evt.target.getAttribute("id");
    const activeCharObj = tileDeck[clickedTileElID]; //update to shuffled deck later
    
    //GUARD - only click the tiles
    if (evt.target.tagName !== "DIV") {
        return;
    }

    //GUARD - dont click the same tile
    if (activeCharObj.turn) {
        return;
    }

    //GUARD - once second selection made, stop
    if (tileDeck.some(char => char.turn === -1)) {
        return;
    }

    //assing the turn number to the state array, change the turn, then render
    activeCharObj.turn = turn;  
    turn *= -1;
    render();

    //check the state array, if the second selection was assigned, then check for a match
    if (tileDeck.some(char => char.turn === -1)) {
        setTimeout(function(){
            checkForMatch();
            render();
            matchStatus = 3; //default
        }, 900)
    }
};

function checkForMatch() {
    const firstTurn = tileDeck.find(char => char.turn === 1);
    const secondTurn = tileDeck.find(char => char.turn === -1);

    //compare if the name property of those two match
    if (firstTurn.name === secondTurn.name) {
        numMatches += 1;
        firstTurn.match = true;
        secondTurn.match = true;
        matchStatus = 1; //match
    } else {
        matchStatus = 2; //no match
    }

    prepNextGuess();
};

function prepNextGuess() {
    tileDeck.forEach(char => char.turn = 0);
};

function render() {
    renderTiles();
    renderMessage();
    renderFindMeGrid();
};

//go through the characters, if "active" is true, then render the card
function renderTiles() {
    tileDeck.forEach(function(char, idx){
        const tileEl = document.getElementById(idx);
    
        if (char.turn) { //if theres a turn
            tileEl.classList.remove("default", "breathe");
            tileEl.style.backgroundImage = `url("${characters.find(character => character.name === char.name).href}")`;
        } else if (char.match) { //if theres a match
            tileEl.style.visibility = "hidden";
        } else if (!char.match) { //theres a turn and not a match
            tileEl.style.visibility = "visible";
            tileEl.style.backgroundImage = null;
            tileEl.classList.add("default", "breathe");
        }
    });
};

function renderMessage() {
    document.getElementById("match-counter").innerText = numMatches;
    const msg = document.getElementById("message");
    const winnerMsg = document.getElementById("winner-message");
    const matchStatusMsg = document.getElementById("match-status-msg");
    
    if (numMatches === 12) {
        winnerMsg.classList.remove("hidden");  
        winnerMsg.classList.add("breathe-win");
    } else {
        winnerMsg.classList.add("hidden"); //for restart
    };
    
    msg.innerText = (turn === 1) ? "Select first tile" : "Select second tile"; 
    
    matchStatusMsg.classList.remove("shake", "nope"); //clear classes first

    if (matchStatus === 1 && numMatches === 12) { //match and winner
        return;
    } else if (matchStatus === 1) { //its a match
        matchStatusMsg.innerText = "It's a match!"
        matchStatusMsg.classList.add("shake");
    } else if (matchStatus === 2) { //no match
        matchStatusMsg.innerText = "No match, try again"
        matchStatusMsg.classList.add("nope");
    } else if (matchStatus === 3) { //default state
        matchStatusMsg.innerText = "";
    };    
};

function renderFindMeGrid() {
    const findMeCellEls = [...document.querySelectorAll("#char-thumbnails > div")];

    findMeCellEls.forEach(function(cell, idx) {
        cell.style.backgroundImage = `url("${characters[idx].href}")`
    });

    tileDeck.forEach(function(char){
        const matchCell = findMeCellEls.find(cell => cell.id === char.name);
        matchCell.style.opacity = char.match ? "0.15" : "1";
    });
};



    

