/*----- constants -----*/
const characters = [
   {name: "nemo1", tileValue: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", clicked: false}, //0
   {name: "nemo2", tileValue: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", clicked: false}, //1
   {name: "simba1", tileValue: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", clicked: false}, //2
   {name: "simba2", tileValue: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", clicked: false}, //3
   {name: "mickey1", tileValue: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", clicked: false}, //4
   {name: "mickey2", tileValue: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", clicked: false}, //5
   {name: "remy1", tileValue: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", clicked: false}, //6
   {name: "remy2", tileValue: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", clicked: false}, //7
   {name: "walle1", tileValue: "walle", href: "https://i.imgur.com/lltMlBn.jpg", clicked: false}, //8
   {name: "walle2", tileValue: "walle", href: "https://i.imgur.com/lltMlBn.jpg", clicked: false}, //9
   {name: "moana1", tileValue: "moana", href: "https://i.imgur.com/wunlajh.jpg", clicked: false}, //10
   {name: "moana2", tileValue: "moana", href: "https://i.imgur.com/wunlajh.jpg", clicked: false}, //11
   {name: "kevin1", tileValue: "kevin", href: "https://i.imgur.com/zE3683g.jpg", clicked: false}, //12
   {name: "kevin2", tileValue: "kevin", href: "https://i.imgur.com/zE3683g.jpg", clicked: false}, //13
   {name: "mike1", tileValue: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", clicked: false}, //14
   {name: "mike2", tileValue: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", clicked: false}, //15
   {name: "sully1", tileValue: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", clicked: false}, //16
   {name: "sully2", tileValue: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", clicked: false}, //17
   {name: "woody1", tileValue: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", clicked: false}, //18
   {name: "woody2", tileValue: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", clicked: false}, //19
   {name: "buzz1", tileValue: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", clicked: false}, //20
   {name: "buzz2", tileValue: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", clicked: false}, //21
   {name: "eve1", tileValue: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", clicked: false}, //22 
   {name: "eve2", tileValue: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", clicked: false} //23   
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
    // renderMessage();
}

function handleClick(evt) {
    const tileElID = evt.target.getAttribute("id");
    const clickedCharObj = characters.find(char => char.tileValue === `${preShuffleChars[tileElID]}`) //update to shuffled deck later

    //GUARD: if its not a div, exit
    if(evt.target.tagName !== "DIV") {
        return;
    };

    //update the first tile selection to the name of the character whose card was clicked
    firstTileSel = clickedCharObj.tileValue; //update to shuffled deck later
    console.log(`first tile selection: ${firstTileSel}`);

    //change the "clicked" property to true
    clickedCharObj.clicked = true;
    console.log(clickedCharObj);
        
    //turn off the default/breathing styling of the clicked tile
    evt.target.classList.remove("default", "breathe");
    
    //render the background of that tile that was clicked
    evt.target.style.backgroundImage = `url("${clickedCharObj.href}")`
   
    //GUARD: loop thru the characters, if the tile is clicked, return
    
};



    

