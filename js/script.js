/*----- constants -----*/
const characters = [
   {tileValue: "nemo1", name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", active: false}, //0
   {tileValue: "nemo2", name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", active: false}, //1
   {tileValue: "simba1", namee: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", active: false}, //2
   {tileValue: "simba2", namee: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", active: false}, //3
   {tileValue: "mickey1", name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", active: false}, //4
   {tileValue: "mickey2", name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", active: false}, //5
   {tileValue: "remy1", name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", active: false}, //6
   {tileValue: "remy2", name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", active: false}, //7
   {tileValue: "walle1", name: "walle", href: "https://i.imgur.com/lltMlBn.jpg", active: false}, //8
   {tileValue: "walle2", name: "walle", href: "https://i.imgur.com/lltMlBn.jpg", active: false}, //9
   {tileValue: "moana1", name: "moana", href: "https://i.imgur.com/wunlajh.jpg", active: false}, //10
   {tileValue: "moana2", name: "moana", href: "https://i.imgur.com/wunlajh.jpg", active: false}, //11
   {tileValue: "kevin1", name: "kevin", href: "https://i.imgur.com/zE3683g.jpg", active: false}, //12
   {tileValue: "kevin2", name: "kevin", href: "https://i.imgur.com/zE3683g.jpg", active: false}, //13
   {tileValue: "mike1", name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", active: false}, //14
   {tileValue: "mike2", name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", active: false}, //15
   {tileValue: "sully1", name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", active: false}, //16
   {tileValue: "sully2", name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", active: false}, //17
   {tileValue: "woody1", name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", active: false}, //18
   {tileValue: "woody2", name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", active: false}, //19
   {tileValue: "buzz1", name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", active: false}, //20
   {tileValue: "buzz2", name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", active: false}, //21
   {tileValue: "eve1", name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", active: false}, //22 
   {tileValue: "eve2", name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", active: false} //23   
];

const preShuffleChars = [];
createPreShuffleArray();

/*----- state variables -----*/
let table; //array that stores the shuffled tile order
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
        preShuffleChars.push(character.tileValue);
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
    const tileElID = evt.target.getAttribute("id");
    const activeCharObj = characters.find(char => char.tileValue === `${preShuffleChars[tileElID]}`) //update to shuffled deck later

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
    
    // //update the first tile selection to the name of the character whose card was active
    // firstTileSel = activeCharObj.tileValue; //update to shuffled deck later
    // console.log(`first tile selection: ${firstTileSel}`);

    
    // console.log(activeCharObj);
        
    // //turn off the default/breathing styling of the active tile
    // evt.target.classList.remove("default", "breathe");
    
    // //render the background of that tile that was active
    // evt.target.style.backgroundImage = `url("${activeCharObj.href}")`
   
    
};


//go through the characters, if "active" is true, then render the card
function renderTiles() {
    characters.forEach(function(char, idx){
        const tileEl = document.getElementById(idx);
    
        if(char.active) {
            tileEl.classList.remove("default", "breathe");
            tileEl.style.backgroundImage = `url("${char.href}")`;
        }
    });
};





    

