let startTime;
let pausedTime = 0;
let running = false;
let laps = [];
let lastDisplayedTime = ""; // Store the last displayed time

function startStopwatch() {
  if (!running) {
    if (pausedTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - pausedTime;
      pausedTime = 0;
    }
    running = true;
    updateStopwatch();
    document.getElementById("startBtn").innerHTML =
      '<i class="fas fa-pause"></i>';
    toggleStopwatchBtnColor("start-button", "pause-button");
  } else {
    running = false;
    pausedTime = Date.now() - startTime;
    document.getElementById("startBtn").innerHTML =
      '<i class="fas fa-play"></i>';
    toggleStopwatchBtnColor("pause-button", "start-button");
  }
}

function toggleStopwatchBtnColor(firstClass, secondClass) {
  document.getElementById("startBtn").classList.remove(firstClass);
  document.getElementById("startBtn").classList.add(secondClass);
}

function resetStopwatch() {
  running = false;
  pausedTime = 0;
  document.getElementById("display").innerText = "00:00:00.00";
  document.getElementById("startBtn").innerHTML = '<i class="fas fa-play"></i>';
  toggleStopwatchBtnColor("pause-button", "start-button");
  laps = [];
  updateLapsList();
}

function recordLap() {
  if (running) {
    const lapTime = calculateTimeElapsed(startTime);
    laps.push(lapTime);
    updateLapsList();
  }
}

function updateStopwatch() {
  if (running) {
    const elapsedTime = calculateTimeElapsed(startTime);
    const formattedTime = formatTime(elapsedTime);

    // Only update if the time has changed significantly
    if (formattedTime !== lastDisplayedTime) {
      document.getElementById("display").innerText = formattedTime;
      lastDisplayedTime = formattedTime;
    }

    requestAnimationFrame(updateStopwatch);
  }
}

function calculateTimeElapsed(startTime) {
  const currentTime = Date.now();
  return currentTime - startTime;
}

function formatTime(time) {
  const totalMilliseconds = Math.floor(time);
  const milliseconds = totalMilliseconds % 1000;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
    milliseconds,
    3
  ).slice(0, 2)}`;
}

function pad(num, size = 2) {
  return num.toString().padStart(size, "0");
}

function updateLapsList() {
  const lapsList = document.getElementById("lapsList");
  lapsList.innerHTML = "";
  laps.forEach((lap, index) => {
    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
    lapsList.appendChild(lapItem);
  });
}
