const startButton =  document.querySelector("#start");
const clearButton =  document.querySelector("#clear");
const timerText = document.querySelector("#timerText");
const pomodoroTime = document.querySelector("#pomodoroSession");
const breakTime = document.querySelector("#breakSession");
const sliderPomodoro = document.querySelector("#pomodoroTimeSlider");
const outputPomodoro = document.querySelector("#pomodoroTimeSliderValue");
const sliderBreak = document.querySelector("#breakTimeSlider");
const outputBreak = document.querySelector("#pomodoroBreakSliderValue");
const settingsButton =  document.querySelector("#settings")
const sliders = document.querySelector(".slidersContainer");
const sessionsContainer = document.querySelector(".sessions");

const clickSound = new Audio("mouse-click.wav");
const alarmSound = new Audio("alarm.wav")
clickSound.volume = 0.1;

let time = 3;
let timeValue = time;
let timeInterval;
let isCounting = false;
let isBreak = false;
let session = 1;
let isCreated = false;

outputPomodoro.innerHTML = sliderPomodoro.value;
sliderPomodoro.oninput = function() {
    outputPomodoro.innerHTML = this.value;
}

outputBreak.innerHTML = sliderBreak.value;
sliderBreak.oninput = function() {
    outputBreak.innerHTML = this.value;
}

document.onclick = function playSound(){
    clickSound.load();
    clickSound.play().then(r => console.log(r));
}

settingsButton.onclick = function settingsPop() {
    if (sliders.style.display === "none") {
        sliders.style.display = "block";
    } else {
        sliders.style.display = "none";
    }
}

pomodoroTime.onclick = function(){
    setPomodoroTime("#f06865" ,"#F08080" ,sliderPomodoro.value)
    isBreak = false;
}

breakTime.onclick = function(){
    setPomodoroTime("#3A78F0", "#4F9FF0", sliderBreak.value)
    isBreak = true;
}

startButton.onclick = function startCountDown(){
    if(!isCounting && time > 0){
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

clearButton.onclick = function clearCountDown(){
    if (!isBreak){
        setPomodoroTime("#f06865" ,"#F08080" ,sliderPomodoro.value)
    }
    else{
        setPomodoroTime("#3A78F0", "#4F9FF0", sliderBreak.value)
    }
    while (sessionsContainer.firstChild) {
        sessionsContainer.removeChild(sessionsContainer.lastChild);
    }
    session=1;
    isCreated = false;
}
function countdown() {

    if(!isBreak && isCreated === false){
        let time= new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let sessionText = document.createTextNode("Session "+ session+".  Started at:" + time)
        sessionsContainer.appendChild(sessionText);
        sessionsContainer.appendChild(document.createElement("br"))
        isCreated=true;
    }

    const minutes = Math.floor(timeValue / 60);
    let seconds = timeValue % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerText.textContent = minutes+":"+seconds;

    timeValue--;

    if (timeValue < 0) {
        alarmSound.play().then(r => console.log(r));
        if(!isBreak){
            setPomodoroTime("#3A78F0", "#4F9FF0", sliderBreak.value)
        }
        else{
            setPomodoroTime("#f06865" ,"#F08080" ,sliderPomodoro.value)
        }
        if(isBreak === false){
            isBreak=true;
            session++;
        }
        else if(isBreak === true){
            isBreak=false;
            isCreated=false;
        }
        timeInterval = setInterval(countdown, 1000);
    }
}

function setPomodoroTime(backgroundColor,itemColor, value){
    document.body.style.setProperty("--backgroundColor", backgroundColor)
    document.body.style.setProperty("--itemColor", itemColor)
    time = value;
    timeValue = time;
    clearInterval(timeInterval);
    timerText.textContent = "00:00"
    startButton.textContent = "START"
    isCounting = false;
}
