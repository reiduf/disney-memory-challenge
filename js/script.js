/*----- constants -----*/
const characters = [
   {name: "nemo", href: "https://i.imgur.com/TcP6KrR.jpg" }, //0
   {name: "simba", href: "https://i.imgur.com/BhgBKQq.jpg" }, //1
   {name: "mickey", href: "https://i.imgur.com/Z9WCIBt.jpg" }, //2
   {name: "remy", href: "https://i.imgur.com/7yDqzJR.jpg" }, //3
   {name: "walle", href: "https://i.imgur.com/lltMlBn.jpg" }, //4
   {name: "moana", href: "https://i.imgur.com/wunlajh.jpg" }, //5
   {name: "kevin", href: "https://i.imgur.com/zE3683g.jpg" }, //6
   {name: "mike", href: "https://i.imgur.com/qzHVMDN.jpg" }, //7
   {name: "sully", href: "https://i.imgur.com/bHQEtPX.jpg" }, //8
   {name: "woody", href: "https://i.imgur.com/3jYJhCy.jpg" }, //9
   {name: "buzz", href: "https://i.imgur.com/jCXG4AV.jpg" }, //10
   {name: "eve", href: "https://i.imgur.com/yUT2Pkd.jpg" } //11   
];

const preShuffleChars = [];
createPreShuffleArray();

/*----- state variables -----*/
let table; //array that stores the shuffled tile order
let winner; //true or false
let numMatches; //need 12 matches to win the game
let firstTileSel; //set by the player - first tile chosen
let secondTileSel; //set by the player - second tile chosen


/*----- cached elements  -----*/
const tableEl = document.getElementById("table"); 
const tileEls = document.querySelectorAll("#table > div");


/*----- event listeners -----*/
tableEl.addEventListener("click", handleClick);


/*----- functions -----*/
function createPreShuffleArray() {
    characters.forEach(function(character) {
        preShuffleChars.push(character.name); //tile 1
        preShuffleChars.push(character.name); //tile 2
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
    const charName = characters.find(char => char.name === `${preShuffleChars[tileElID]}`) //update to shuffled deck later

    //GUARD: if its not a div, exit
    if(evt.target.tagName !== "DIV") {
        return;
    };

    //update the first tile selection to the name of the character whose card was clicked
    firstTileSel = charName.name; //update to shuffled deck later
    console.log(`first tile selection: ${firstTileSel}`);
    console.log(evt.target.classList);
        
    //turn off the default/breathing styling of the clicked tile
    evt.target.classList.remove("default", "breathe");
    evt.target.classList.add("clicked");
    console.log(evt.target.classList);
    
    //render the background of that tile that was clicked
    evt.target.style.backgroundImage = `url("${charName.href}")`
   
    //GUARD: if the clicked tile doesnt have a class of default, return
    if(evt.target.classList.contains("clicked")) {
        return;
    } 

    //update the second tile selection
    secondTileSel = charName.name;
    console.log(`second selection = ${secondTileSel}`)
};
