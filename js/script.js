/*----- constants -----*/
const characters = [
   {tileValue: "nemo1", name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", clicked: false}, //0
   {tileValue: "nemo2", name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg", clicked: false}, //1
   {tileValue: "simba1", namee: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", clicked: false}, //2
   {tileValue: "simba2", namee: "simba", href: "https://i.imgur.com/BhgBKQq.jpg", clicked: false}, //3
   {tileValue: "mickey1", name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", clicked: false}, //4
   {tileValue: "mickey2", name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg", clicked: false}, //5
   {tileValue: "remy1", name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", clicked: false}, //6
   {tileValue: "remy2", name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg", clicked: false}, //7
   {tileValue: "walle1", name: "walle", href: "https://i.imgur.com/lltMlBn.jpg", clicked: false}, //8
   {tileValue: "walle2", name: "walle", href: "https://i.imgur.com/lltMlBn.jpg", clicked: false}, //9
   {tileValue: "moana1", name: "moana", href: "https://i.imgur.com/wunlajh.jpg", clicked: false}, //10
   {tileValue: "moana2", name: "moana", href: "https://i.imgur.com/wunlajh.jpg", clicked: false}, //11
   {tileValue: "kevin1", name: "kevin", href: "https://i.imgur.com/zE3683g.jpg", clicked: false}, //12
   {tileValue: "kevin2", name: "kevin", href: "https://i.imgur.com/zE3683g.jpg", clicked: false}, //13
   {tileValue: "mike1", name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", clicked: false}, //14
   {tileValue: "mike2", name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg", clicked: false}, //15
   {tileValue: "sully1", name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", clicked: false}, //16
   {tileValue: "sully2", name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg", clicked: false}, //17
   {tileValue: "woody1", name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", clicked: false}, //18
   {tileValue: "woody2", name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg", clicked: false}, //19
   {tileValue: "buzz1", name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", clicked: false}, //20
   {tileValue: "buzz2", name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg", clicked: false}, //21
   {tileValue: "eve1", name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", clicked: false}, //22 
   {tileValue: "eve2", name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg", clicked: false} //23   
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



    

