
let secretNumber = Math.trunc(20 * Math.random() + 1);
let highscore = {
    value: 0,
    timer: "0:0"
};
let total_time = 0; 
let timer_val;

function updateTimer() {
    const minutes = Math.floor(total_time / 60);
    const seconds = total_time % 60;
    document.getElementById('timer').innerHTML = `${minutes}:${seconds}`;
}

document.querySelector('.again').addEventListener('click', function () {
    total_time = 0;
    secretNumber = Math.trunc(20 * Math.random() + 1);
    document.querySelector('.score').textContent = '20';
    document.querySelector('.guess').value = '';
    document.getElementById('timer').innerHTML = '0:0';
    document.querySelector('.check').style.backgroundColor = '#f1356d';
    document.querySelector("body").style.backgroundColor = 'white';
    document.querySelector('.number').textContent = '?';
    clearInterval(timer_val);
});

document.querySelector('.check').addEventListener('click', () => {
    let guess = document.querySelector('.guess').value;


    if (!timer_val) {
        timer_val = setInterval(() => {
            total_time++;
            updateTimer();
        }, 1000);
    }

    document.querySelector('.check').style.backgroundColor = 'black';

    if (!guess)
    {
        document.querySelector(".message").textContent = "Not a valid input";
    } 
    else if (parseInt(guess) === secretNumber) {
        document.querySelector(".message").textContent = "You guessed it right!";
        document.querySelector('.number').style.width = '30rem';
        document.querySelector("body").style.backgroundColor = 'green';
        document.querySelector('.number').textContent = secretNumber;
        if (highscore.value < parseInt(document.querySelector('.score').textContent)) {
            highscore.value = parseInt(document.querySelector('.score').textContent);
            highscore.timer = document.getElementById('timer').innerHTML;
        }
        document.querySelector('.highscore').textContent = `${highscore.value} (${highscore.timer})`;
        
        clearInterval(timer_val);
        timer_val = null;
    }
    else if (parseInt(guess) > secretNumber)
    {
        document.querySelector(".message").textContent = "Too high";
        document.querySelector('.score').textContent--;
    } 
    else 
    {
        document.querySelector(".message").textContent = "Too low";
        document.querySelector('.score').textContent--;
    }

    if (parseInt(document.querySelector('.score').textContent) <= 0) {
        document.querySelector(".message").textContent = "You lost the game";
    
        document.querySelector("body").style.backgroundColor = 'red';
    
        clearInterval(timer_val);
        timer_val = null;
    
        document.getElementById('hiddenresult').textContent = secretNumber;
        document.querySelector('.check').style.backgroundColor = '#f1356d';
    }
   
});
