//Document
const startButton =  document.getElementById("start");
const clearButton =  document.getElementById("clear");
const timerText = document.getElementById("timerText");
const pomodoroTime = document.getElementById("pomodoroSession");
const breakTime = document.getElementById("breakSession");
//Variables
let time = 2700;
let timeValue = time;
let timeInterval;
let isCounting = false;
let sliderPomodoro = document.getElementById("pomodoroTimeSlider");
let outputPomodoro = document.getElementById("pomodoroTimeSliderValue");
let sliderBreak = document.getElementById("breakTimeSlider");
let outputBreak = document.getElementById("pomodoroBreakSliderValue");

outputPomodoro.innerHTML = sliderPomodoro.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderPomodoro.oninput = function() {
    outputPomodoro.innerHTML = this.value;
}

outputBreak.innerHTML = sliderBreak.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderBreak.oninput = function() {
    outputBreak.innerHTML = this.value;
}


startButton.addEventListener("click",startCountDown,false);
clearButton.addEventListener("click",clearCountDown,false);
pomodoroTime.addEventListener("click",setPomodoroTime,false);
breakTime.addEventListener("click",setPomodoroTime2,false);

function setPomodoroTime(){
    time = sliderPomodoro.value*60;
    timeValue = time;
    clearInterval(timeInterval);
    timerText.textContent = "00:00"
    startButton.textContent = "START"
    isCounting = false;
}
function setPomodoroTime2(){
    time = sliderBreak.value*60;
    timeValue = time;
    clearInterval(timeInterval);
    timerText.textContent = "00:00"
    startButton.textContent = "START"
    isCounting = false;
}

function startCountDown(){
    if(!isCounting){
        timeInterval = setInterval(countdown, 1000);
        startButton.textContent = "PAUSE"
        isCounting = true;
    }
    else {
        clearInterval(timeInterval);
        startButton.textContent = "START"
        isCounting = false;
    }
}

function clearCountDown(){
    timeValue = time;
    clearInterval(timeInterval);
    timerText.textContent = "00:00"
    startButton.textContent = "START"
    isCounting = false;
}

function countdown() {
    const minutes = Math.floor(timeValue / 60);
    let seconds = timeValue % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerText.textContent = minutes+":"+seconds;

    timeValue--;

    if (timeValue < 0) {
        clearInterval(timeInterval);
    }
}

