
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = false;

var gameLevel = 0;

//This will check if game has started hence declaring game level
$(document).click(function() {
  if (!gameStart) {

    $("#level-title").text("Level " + gameLevel);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  animatePress(userChosenColour);

//Calling  checkAnswer() after  user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {

  gameLevel++;

  $("#level-title").text("Level " + gameLevel);

  //generate a random number between 1 and 4
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  //this is to check if the user got the most answers right
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //this will check if the user got their last 3 steps  right and also check if the sequence is complete
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 250);
    }
  }else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 50);

    $("#level-title").text("Game Over, Tap to Restart");

    restartGame();
  }
}

//restart game if user gets wrong answer
function restartGame(){
  level = 0;
  gamePattern = [];
  started = false;
}

//play corresponding sound when button is clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//button animation when clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 30);
}
