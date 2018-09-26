var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
    // Mode buttons event listeners
    setupModeButtons();
    // Color squares initialized
    setupSquares();

    reset();
}

function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){

        // Add click listeners to squares
        squares[i].addEventListener("click", function(){
            // Grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // Compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            }
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again.";
            }
        })
    }
}

resetButton.addEventListener("click", function(){
    reset();
})

function generateRandomColors(num){

    // Make an array
    var arr = [];
    // Add num random colors to arr
    for(var i = 0; i < num; i++){
        // Get random color and push into arr
        arr.push(randomColor());
    }
    // Return that array
    return arr;
}

function randomColor(){
    // Pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256);
    // Pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    // Pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);
    // Format into "rgb(r, g, b)"
    var generatedColor = `rgb(${r}, ${g}, ${b})`;
    return generatedColor;
}


function pickColor(){
    // Pick a random number
    var random = Math.floor(Math.random() * colors.length );
    return colors[random];
}

function changeColors(color){
    // Loop through all squares
    for(var i = 0; i < squares.length; i++){
    // Change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function reset() {
    // Generate all new colors
    colors = generateRandomColors(numSquares);
    // Pick a new Random Color from Array
    pickedColor = pickColor();
    // Change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    // Getting rid of the "Success" prompt after hitting play again
    messageDisplay.textContent = "";
    // Change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}