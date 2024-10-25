// script.js
let startTime = 0; // The time when the stopwatch is started
let updatedTime = 0; // The current time when the stopwatch is running
let difference = 0; // The difference between the start time and the current time
let timerInterval; // Holds the interval for updating the time
let running = false; // Flag to check if the stopwatch is running
let lapCounter = 0; // Counter for laps

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() {
    if (!running) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateDisplay, 1000 / 60); // Update every 16.67ms (~60fps)
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    running = false;
    display.textContent = "00:00:00";
    laps.innerHTML = ""; // Clear the lap times
    lapCounter = 0;
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor(updatedTime / 3600000);
    let minutes = Math.floor((updatedTime % 3600000) / 60000);
    let seconds = Math.floor((updatedTime % 60000) / 1000);

    // Format the time as HH:MM:SS
    display.textContent =
        (hours > 9 ? hours : "0" + hours) + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

