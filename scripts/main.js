// - Global Variables
const timerStr = document.getElementById('timer-str');
const buttons = document.querySelectorAll('.btn');
const pomodoroBtn = document.querySelector('#btn-pomodoro');
const startStopBtn = document.querySelector('#btn-startStop');
const shortBrkBtn = document.querySelector('#btn-shortBrk');
const longBrkBtn = document.querySelector('#btn-longBrk');
const roundCounter = document.querySelector('.roundCounter');

let currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;
let running = false;
let countDownDate;
let counter;

const timers = {
    pomodoro: "25:00",
    short: "05:00",
    long: "15:00",
};


// - Eventlisteners
buttons.forEach((btn) => {
    btn.addEventListener('click', handleClick);
});

startStopBtn.addEventListener('click', handleTimer);




// ..:: Main Script ::..





// - Functions
function handleClick(e) {
    buttons.forEach((btn) => {
        if (btn.classList.contains('active')) btn.classList.remove('active');
    });

    e.target.classList.add('active');

    switch (e.target.id) {
        case 'btn-pomodoro':
            break;
        case 'btn-shortBrk':
            break;
        case 'btn-longBrk':
            break;
        case 'btn-settings':
            break;
        default:
            console.warn('[2] Ooops. Something went wrong');
    }
}


function handleTimer(e) {
    switch (e.target.textContent) {
        case 'Start':
            counter = setInterval(updateTimer, 1000);
            countDownDate = new Date(new Date().getTime() + currentTimeMs);
            running = true;
            e.target.textContent = 'Stop';
            break;

        case 'Stop':
            clearInterval(counter);
            running = false;
            e.target.textContent = 'Start';
            currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;
            break;

        default:
            console.warn('[1] Ooops. Something went wrong.');
    }

}


function updateTimer() {
    if (running) {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        // * uses pad()     
        let minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) + 0.0015), 2);
        let seconds = pad(Math.round((distance % (1000 * 60)) / 1000), 2);

        timerStr.textContent = `${minutes}:${seconds}`;

        if (timerStr.textContent == '00:00') {
            endTimer();
        }
    }
}



function endTimer() {
    clearInterval(counter);
    running = false;
    let currentFunction;

    buttons.forEach((btn) => {
        if (btn.classList.contains('active')) {
            currentFunction = btn.id;
            btn.classList.remove('active');
        }
    });

    switch (currentFunction) {
        case 'btn-shortBrk':
            alert("Time's up! Back to work.");
            startPomodoro();
            if (roundCounter.textContent[0] != '4') {
                roundCounter.textContent = `${Number(roundCounter.textContent[0]) + 1}/4`;
            }
            break;
        case 'btn-longBrk':
            alert("Time's up! Back to work.");
            startPomodoro();
            break;

        case 'btn-pomodoro':
            alert(`Time's up! You should probably take a break now.`);
            if (roundCounter.textContent !== '4/4') {
                startShortBreak();
            } else {
                roundCounter.textContent = `1/4`;
                startLongBreak();
            }
            break;
        default:
            console.warn('[3] Ooops. Something went wrong.');
            break;


    }
}

function startShortBreak() {
    timerStr.textContent = timers.short;
    currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;

    shortBrkBtn.classList.add('active');
    startStopBtn.textContent = 'Start';

}

function startPomodoro() {
  timerStr.textContent = timers.pomodoro;
  currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;
  
  pomodoroBtn.classList.add('active');
  startStopBtn.textContent = 'Start';
}

function startLongBreak(){
  timerStr.textContent = timers.long;
  currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;
  
  longBrkBtn.classList.add('active');
  startStopBtn.textContent = 'Start';
}

// - Helper functions
function pad(str, max) {
    str = str.toString();

    if (str === '60') return '00';

    return str.length < max ? pad("0" + str, max) : str;
}