/**************************************************************
/
/           GOLBAL VARIABLES
/
/*************************************************************/
// var RESET_VALUE = 15;
var RESET_VALUE = 20;
var count = RESET_VALUE;
var isRunning = false;
var counter = null;
// var brick_font = false;
// var options_collapsed_width;


//Pre-load sounds
var charge_sound = new Audio("/sounds/charge.mp3");
var laser_sound = new Audio("/sounds/laser.mp3");
var buzzer_sound = new Audio("/sounds/buzzer.mp3");

/**************************************************************
/
/           GET HTML ELEMENTS
/
/*************************************************************/
var display = document.getElementById("timer_display");
var startButtonText = document.querySelector("#start_pause");

/**************************************************************
/
/           INITIALIZE SOME ELEMENTS
/
/*************************************************************/
//initialize the start button text
startButtonText.innerHTML = "Start";
//initialize the timer display
setClockValue(RESET_VALUE);

function setStartTime(val) {
  RESET_VALUE = val;
  reset();
}

//set the clock value (val in seconds)
function setClockValue(val) {
  display.innerHTML = secsToClock(val)
}

/**************************************************************
/
/           MAIN TIMER FUNCTION
/             Called once per second by setInterval() when
/             the timer is running.
/
/*************************************************************/
function timer() {
  count = count - 1;
  if (count <= 0) {
    console.log("timer ended");
    pause();
    clearInterval(counter);
    setClockValue(0);
    playEndSound();
    //Wait 5 seconds, then reset
    setTimeout(reset, 5000);
    return;
  }

  //update the time on the display
  setClockValue(count);

  //play sound effect, if any
  if (count == 5) {
    play30SecondWarning();
  }
}

/**************************************************************
/
/           START, PAUSE, RESET, TOGGLE
/            Control when to start, pause, and reset the 
/            timer.
/
/*************************************************************/
function start() {
  console.log("Starting timer");
  //play the "start" sound effect, if applicable
  if (count === RESET_VALUE) {
    playStartSound();
  }
  if (!isRunning) {
    isRunning = true;
    counter = setInterval(timer, 1000);
    startButtonText.innerHTML = "Stop";
  }
}

function increment_timer(){
  console.log("incrementing timer");
  count += 10;
  setClockValue(count);
}

function pause() {
  console.log("Pausing timer");
  clearInterval(counter);
  startButtonText.innerHTML = "Start";
  isRunning = false;
}

function reset() {
  // location.reload();
  pause();
  console.log("Resetting timer");
  count = RESET_VALUE;
  setClockValue(count);
}

function toggle() {
  if (isRunning) {
    pause();
  } else {
    start();
  }
}

/**************************************************************
/
/           SECONDS TO CLOCK FUNCTION
/             Converts a number of seconds (e.g. 67) to a
/             clock display format (e.g. 1:07).
/
/*************************************************************/
function secsToClock(time) {
  var secs = time % 60;
  if (secs < 10) {
    //force 2-digit display of seconds
    secs = "0" + secs;
  }
  var mins = Math.floor(time / 60);
  return mins + ":" + secs;
}

/**************************************************************
/
/           SOUND-PLAYING FUNCTIONS
/             Play the currently-selected sound in each category.
/
/*************************************************************/
function playStartSound() {
  charge_sound.play();
}

function play30SecondWarning() {
  laser_sound.play();
}

function playEndSound() {
  buzzer_sound.play();
}

// do some initialization on page load
document.addEventListener("DOMContentLoaded", () => {
  setAppearance();
});

function setAppearance() {
  // let darkMode = true;
  let darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.querySelector("body").classList.toggle("bg-dark", darkMode);
  document.querySelector("body").classList.toggle("text-light", darkMode);
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.toggle("bg-dark", darkMode);
    card.classList.toggle("border-secondary", darkMode);
    // card.classList.toggle("text-light",)
  });
}
