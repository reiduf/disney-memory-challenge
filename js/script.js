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
 createPreShuffleArray();

/*----- state variables -----*/
let shuffledChars; //array that stores the shuffled tile order
let winner; //true or false
let numMatches; //need 12 matches to win the game
let firstTileSel = ""; //set by the player - first tile chosen
let secondTileSel = ""; //set by the player - second tile chosen


/*----- cached elements  -----*/
const tableEl = document.getElementById("table"); 
const tileEls = document.querySelectorAll("#table > div");


/*----- event listeners -----*/
tableEl.addEventListener("click", handleClick);


/*----- functions -----*/
function createPreShuffleArray() {
    characters.forEach(function(character) {
      const charObj = {};
      charObj.tileValue = `${character.name}1`; //eg "simba1"
      charObj.name = character.name;
      charObj.active = false;
      preShuffleChars.push(charObj);

      const charObj2 = {};
      charObj2.tileValue = `${character.name}2`; //eg "simba2"
      charObj2.name = character.name;
      charObj2.active = false;
      preShuffleChars.push(charObj2);
    });
};

initialize();

function initialize() {
    //shuffle the preShuffleChars array
}

function render() {
    renderTiles();
    // renderMessage();
}

function handleClick(evt) {
    const clickedTileElID = evt.target.getAttribute("id");
    const activeCharObj = preShuffleChars[clickedTileElID]; //update to shuffled deck later

    //GUARD: if its not a div, exit
    if(evt.target.tagName !== "DIV") {
        return;
    };

    //GUARD: if the tile is already active, exit (prevent clicking same tile)
    if (activeCharObj.active) {
        return;
    }

    //change the "active" property to true and render
    activeCharObj.active = true;
    render();

    //update the first tile selection to the name of the character whose card was active
    firstTileSel = activeCharObj.tileValue; //update to shuffled deck later
    console.log(`first tile selection: ${firstTileSel}`);   
    
};


//go through the characters, if "active" is true, then render the card
function renderTiles() {
    preShuffleChars.forEach(function(char, idx){
        const tileEl = document.getElementById(idx);
    
        if(char.active) {
            tileEl.classList.remove("default", "breathe");
            tileEl.style.backgroundImage = `url("${characters.find(character => character.name === char.name).href}")`;
        }
    });
};





    

