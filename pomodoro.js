//DOCUMENT
const startButton =  document.querySelector("#start");
const clearButton =  document.querySelector("#clear");
const timerText = document.querySelector("#timerText");
const pomodoroTime = document.querySelector("#pomodoroSession");
const breakTime = document.querySelector("#breakSession");
const sliderPomodoro = document.querySelector("#pomodoroTimeSlider");
const outputPomodoro = document.querySelector("#pomodoroTimeSliderValue");
const sliderBreak = document.querySelector("#breakTimeSlider");
const outputBreak = document.querySelector("#pomodoroBreakSliderValue");
const buttons = document.querySelectorAll("button");
const clickSound = new Audio("mouse-click.wav");
const alarmSound = new Audio("alarm.wav")
clickSound.volume = 0.3;
//VARIABLES
let time = 2700;
let timeValue = time;
let timeInterval;
let isCounting = false;
console.log(buttons);

//SLIDERS
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

//LISTENERS
startButton.addEventListener("click",startCountDown,false);
clearButton.addEventListener("click",clearCountDown,false);
pomodoroTime.addEventListener("click",setPomodoroTime,false);
breakTime.addEventListener("click",setPomodoroTime2,false);
for(const button of buttons){
    button.addEventListener("click",playSound,false);
}

function playSound(){
    clickSound.play();
}
function setPomodoroTime(){
    document.body.style.setProperty("--backgroundColor", "#f06865")
    document.body.style.setProperty("--itemColor", "#F08080")
    time = sliderPomodoro.value*60;
    timeValue = time;
    clearInterval(timeInterval);
    timerText.textContent = "00:00"
    startButton.textContent = "START"
    isCounting = false;
}
function setPomodoroTime2(){
    document.body.style.setProperty("--backgroundColor", "#3A78F0")
    document.body.style.setProperty("--itemColor", "#4F9FF0")

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
        alarmSound.play();
        clearInterval(timeInterval);
    }
}
const settingsButton =  document.querySelector("#settings")
settingsButton.onclick = function settingsPop() {
    let x = document.querySelector(".slidersContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

