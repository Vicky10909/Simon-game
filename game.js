var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameHasStarted = false;

var level = 0;

function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // button selected based on chosen color
  var randomSelectedButton = $(".btn." + randomChosenColour);
  console.log(randomSelectedButton);
  // make button flash
  randomSelectedButton.fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

  playSound(randomChosenColour);

  // increase the level by 1 every time nextSequence() is called.
  level++;

  $("#level-title").text("level " + level);

  // clear user pattern after one level is completed
  userClickedPattern = [];
}

// call nextSequence() on the first keypress
$(document).keypress(function () {
  if (!gameHasStarted) {
    nextSequence();
    gameHasStarted = true;
    $("h2").hide();
  }
});

// control user click
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // compare user sequence with game pattern sequence start from first click
  if (userClickedPattern.length > 0) {
    checkAnswer(gamePattern, userClickedPattern);
  }
});

function playSound(name) {
  // play audio when selected button flashes
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(".btn." + currentColour).addClass("pressed");

  // remove "pressed" class after 100 milliseconds
  setTimeout(() => {
    $(".btn." + currentColour).removeClass("pressed");
  }, 100);
}

// compare each colour in userClickArr with gamePatternArr
function checkAnswer(gamePatternArr, userClickArr) {
  for (let i = 0; i < userClickArr.length; i++) {
    // if there's one colour doesn't match the one in gamePattern then game over
    if (userClickArr[i] !== gamePatternArr[i]) {
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key To Restart");

      startOver();
      return;
    }
  }

  // nextSequence will be envoked if the number of colours in gamePatternArr and in userClickArr is the same
  if (gamePatternArr.length === userClickArr.length) {
    setTimeout(nextSequence, 1000);
  }
}

// game start over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameHasStarted = false;
}
