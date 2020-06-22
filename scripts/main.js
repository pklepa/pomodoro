// - Global Variables
const timerStr =     document.getElementById('timer-str');
const buttons =      document.querySelectorAll('.btn');
const pomodoroBtn =  document.querySelector('#btn-pomodoro');
const startStopBtn = document.querySelector('#btn-startStop');
const shortBrkBtn =  document.querySelector('#btn-shortBrk');
const longBrkBtn =   document.querySelector('#btn-longBrk');
const roundCounter = document.querySelector('.roundCounter');
const resetBtn =     document.querySelector('#resetTimer');
const settingsBtn =  document.querySelector('#btn-settings');

let running = false;
let currentTimeMs;
let countDownDate;
let currentFunction;
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
resetBtn.addEventListener('click', () => {
    resetTimer();
    switch (currentFunction) {
        case 'btn-pomodoro':
            setTimer(timers.pomodoro, pomodoroBtn);            
            break;
        case 'btn-shortBrk':
            setTimer(timers.short, shortBrkBtn);            
            break;
        case 'btn-longBrk':
            setTimer(timers.long, longBrkBtn);            
            break;
        default:
            break;
    }
});




// ..:: Main Script ::..
setTimer(timers.pomodoro, pomodoroBtn);




// - Functions
function handleClick(e) {
    resetTimer();

    e.target.classList.add('active');

    switch (e.target.id) {
        case 'btn-pomodoro':
            setTimer(timers.pomodoro, pomodoroBtn);
            break;
        case 'btn-shortBrk':
            setTimer(timers.short, shortBrkBtn);
            break;
        case 'btn-longBrk':
            setTimer(timers.long, longBrkBtn);
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


function setTimer(time, btn){
    currentFunction = btn.id;
    
    timerStr.textContent = time;
    currentTimeMs = timerStr.textContent.split(':')[0] * 60000 + timerStr.textContent.split(':')[1] * 1000;

    btn.classList.add('active');
    startStopBtn.textContent = 'Start';
}


function endTimer() {
    resetTimer();

    console.log(currentFunction)
    switch (currentFunction) {
        case 'btn-shortBrk':
            alert("Time's up! Back to work.");
            setTimer(timers.pomodoro, pomodoroBtn);
            currentFunction = pomodoroBtn.id;
            if (roundCounter.textContent[0] != '4') {
                roundCounter.textContent = `${Number(roundCounter.textContent[0]) + 1}/4`;
            }
            break;
        case 'btn-longBrk':
            alert("Time's up! Back to work.");
            setTimer(timers.pomodoro, pomodoroBtn);
            currentFunction = pomodoroBtn.id;
            roundCounter.textContent = `1/4`;
            break;

        case 'btn-pomodoro':
            alert(`Time's up! You should probably take a break now.`);
            if (roundCounter.textContent !== '4/4') {
                setTimer(timers.short, shortBrkBtn);
                currentFunction = shortBrkBtn.id;
            } else {
                setTimer(timers.long, longBrkBtn);
                currentFunction = longBrkBtn.id;
            }
            break;
        default:
            console.warn('[3] Ooops. Something went wrong.');
            break;
    }
}


function resetTimer(){
    clearInterval(counter);
    running = false;

    buttons.forEach((btn) => {
        if (btn.classList.contains('active')) btn.classList.remove('active');
    });
}


// - Helper functions
function pad(str, max) {
    str = str.toString();

    if (str === '60') return '00';

    return str.length < max ? pad("0" + str, max) : str;
}



// ..:: MODAL SETTINGS


const modal = document.querySelector("#myModal");

const span = document.querySelector(".close");

// When the user clicks on the button, open the modal
settingsBtn.addEventListener('click', () => modal.style.display = 'block');

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => modal.style.display = 'none');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = "none"
});