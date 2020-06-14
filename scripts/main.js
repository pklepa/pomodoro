// - Global Variables
const timerStr = document.getElementById('timer-str');
const buttons = document.querySelectorAll('.btn');
const startStopBtn = document.querySelector('#btn-startStop');

let currentTimeMs = timerStr.textContent.split(':')[0] * 60000  + timerStr.textContent.split(':')[1]*1000;
let running = false;
let countDownDate;
let counter;


// - Eventlisteners
buttons.forEach((btn) => {
    btn.addEventListener('click', handleClick);
});

startStopBtn.addEventListener('click', handleTimer);




// ..:: Main Script ::..





// - Functions

function updateTimer() {

  if (running) {
      // Get today's date and time
      let now = new Date().getTime();
        
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      console.log((distance % (1000 * 60 * 60)) / (1000 * 60) + 0.0015);
      console.log((distance % (1000 * 60)) / 1000);
      
      
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) + 0.0015);
      let seconds = pad(Math.round((distance % (1000 * 60)) / 1000), 2);
        
      timerStr.textContent = `${minutes}:${seconds}`;
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
            currentTimeMs = timerStr.textContent.split(':')[0]*60000 + timerStr.textContent.split(':')[1]*1000;
        break;

        default:
            console.warn('[1] Ooops. Something went wrong.');            
    }

}


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
        case 'btn-shortBrk':
            break;
        case 'btn-shortBrk':
            break;
        default:
            console.warn('[2] Ooops. Something went wrong');
    }
}

// - Helper functions
function pad (str, max) {
    str = str.toString();
    
    if (str === '60') return '00';

    return str.length < max ? pad("0" + str, max) : str;
  }