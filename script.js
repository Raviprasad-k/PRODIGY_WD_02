let timerInterval;
let isRunning = false;
let startTime;
let pausedTime = 0;

function startPause() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('startPauseButton').textContent = 'Pause';
    document.getElementById('startPauseButton').classList.remove('paused');
    startTime = Date.now() - pausedTime;
    timerInterval = setInterval(updateDisplay, 10);
  } else {
    isRunning = false;
    document.getElementById('startPauseButton').textContent = 'Resume';
    document.getElementById('startPauseButton').classList.add('paused');
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
  }
}

function lap() {
  if (isRunning) {
    const lapsList = document.getElementById('laps');
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formattedTime;
    lapsList.prepend(lapItem);
  }
}

function reset() {
  clearInterval(timerInterval);
  isRunning = false;
  pausedTime = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startPauseButton').textContent = 'Start';
  document.getElementById('startPauseButton').classList.remove('paused');
  document.getElementById('laps').innerHTML = '';
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}:${formatTwoDigits(centiseconds)}`;
}

function formatTwoDigits(num) {
  return num.toString().padStart(2, '0');
}

// Function to change background color
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  document.querySelector('.stopwatch').style.backgroundColor = '#fff'; // Reset stopwatch background color
  document.querySelector('.display').style.color = '#000'; // Reset display text color
  document.querySelectorAll('.controls button').forEach(button => {
    button.style.backgroundColor = '#4CAF50'; // Reset button background color
    button.style.transform = 'scale(1)'; // Reset button scale
  });
  document.querySelectorAll('.laps li').forEach(lap => {
    lap.style.backgroundColor = '#f0f0f0'; // Reset lap item background color
  });
}
