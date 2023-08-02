const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");

// it will tell the current player wheather it is a X or O
// its default value will be X
let currentPlayer;

// it will tell the current status of the game wheather we ahve to give more turns to the player or not
// it will be an array
// the default avle of gameGrid will be empty
let gameGrid;

// in a tic-tac-toe game there are 8 winning positions 
// the gridGame is an array that is why the winningPositions are wittin in an array form
const winningPositions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];


// this fuction is to initialize the game
function initGame() {

    // this line telling that that at teh initial the current player will be x
    currentPlayer = "X";
    // this line is telling that at initial the grid will be empty
    gameGrid = ["","","","","","","","",""];
    // when the game will start the newGame button will hide

    // thos loop empties the boxes the in UI
    boxes.forEach((box, index) => {
        // it will empty the boxes in the UI
        box.innerText = "";
        // and this statement will make the cursor to Pointer
        boxes[index].computedStyleMap.pointerEvents = "all";

        // this will new the green color when the when the newGameBtn is clicked after the winner is found
        // this will reinitilize the properties of the boxes. 
        box.classList = `box box${index+1}`;
       
    });
    newGameBtn.classList.remove("active");
    // and when the game will start gameInfo will tell which player's turn is this
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
}
initGame();

// this function is a call back fuction which swaps the turns
function swapTurn() {
    // this if statement tells that if the currentPlayer is on X then change the currentPlayer to O
    if(currentPlayer === "X") 
    {
        currentPlayer = "O";
    }
    // this else statement tells us that if the currentPlayer is O then cahnge the currentPlayer to X
    else{
        currentPlayer = "X";
    }
    // this statement tells us that whenever the swapping is done then change the current Player in the UI 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}


function checkGameOver(){
    let answer = "";

    // this for each loop check or iterates on all the winning postions which have been mentioned above

    // this postition tells us that each postition have 3 indexs winning position wala indexes
    winningPositions.forEach((position) => {

        // this loop tells that the position should be non empty and the positions 
        // should have the same vale X or O 
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {


            // this loop checks if the winner is X or the winner is O
            // it checks that the position have 3 index and index are filled with O or X
            if(gameGrid[position[0]] === "X")
            
                answer = "X";
            
            else
                answer = "O";

            // this statement tells us that if we have got a winner then no next move can be done
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });    

                // these three lines shows on the UI the green color on the index by which the game have be won
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            
        }

    });

    // this line tells us that if the answer is not empty that means  WE HAVE  A WINNER
    if(answer!= "") {

        // if we have got the winner then show the winner in the gameInfo
        gameInfo.innerText = `Winner player ${answer}`;
        // and if we have win the game then show the newGameBtn
        newGameBtn.classList.add("active");
        return;
    }

    // this is to check wheather there is a tie or you can there is no winner
    let fillCount = 0;
    // this loop counts the number of boxes which are filled
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });

    // this statement tells us that if the boxes are filled then the game is tied
    if(fillCount ===9) {
        // this will show on the UI that the game is tied
        gameInfo.innerText = "Game Tied !";
        // this will show the newGameBtn
        newGameBtn.classList.add("active");

    }


}




// this function is made to fill the current grid cell with X or 0
// and it will make that box unclickable
function handleClick(index) {
 
    // thi if statement syas that is cell of tthe grid is empty then only make changes
    //  and by this statement we are making the cells unclickable
    if(gameGrid[index] === "") {
        // this line makes changes in the UI
        boxes[index].innerText= currentPlayer;
        // this line makes changes in the gridGame indexes which is in the initGame() function(INNER LOGIC)
        gameGrid[index] = currentPlayer;

        // this statement tells us that which so ever box or cell is filled with X or O the cursor pointer wont work
        boxes[index].style.pointerEvents = "none";

        // This fuction is ti swap the turn
        // this means that if the user is is on X then it will change the user to O in the next turn
        swapTurn();

        // this the fuction that wheather the player has won the game or not
        checkGameOver();
    }
}


// in this for each is used because it want to add teh eventListener to each box at once
boxes.forEach((box , index) => {
// if ine of the boxes is clicked thencall the handleClick function
    box.addEventListener("click",() => {
        // index is passed in handleClick because it will tell on what index the function is called upon
        handleClick(index);
    })
});



newGameBtn.addEventListener("click" , initGame);







