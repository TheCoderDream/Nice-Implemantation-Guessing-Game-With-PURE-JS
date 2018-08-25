let min = 1,
    max = 10,
    winningNum = randomNum() ,
    guessessLeft = 3;

let isTrue = true;

const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.getElementById('guess-input'),
    guessBtn = document.getElementById('guess-btn'),
    message = document.querySelector('.message'),
    resetBtn = document.getElementById('reset');


minNum.textContent = min;
maxNum.textContent = max;

function randomNum() {
    return Math.floor(Math.random() * 9 + 1);
}

function resetGame() {
    guessInput.disabled = false;
    guessBtn.disabled = false;
    winningNum = randomNum();
    guessessLeft = 3;

    guessInput.style.borderColor = '#597ea2';

    while (message.firstChild) {
        message.firstChild.remove();
    }
}

resetBtn.addEventListener('click', resetGame);

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value.trim());

    if(isNaN(guess)) {
        if (isTrue) {
            isTrue = false;
            Toaster('.message', 'Please type into a number not a string', 'danger', 2)
                .then(function (falsy) {
                    isTrue = falsy;
                });
        }
    } else if (guess < min || guess > max) {
        console.log('works');
        if (isTrue) {
            isTrue = false;
            Toaster('.message', `Please type into a number between ${min} and ${max}`, 'warning', 2)
                .then(function (falsy) {
                    isTrue = falsy;
                });
        }


    } else {
        if ( guess === winningNum) {

            winOrLost('green');
            Toaster('.message', `${winningNum} is correct answer you've won !!!`, 'success', 50000);
        } else {
            guessessLeft -=1;

            if(guessessLeft === 0) {
                winOrLost('red');
                Toaster('.message', `Game Over, you lost. The correct number was ${winningNum}`, 'danger', 50000);
            } else {
                guessInput.style.border = 'red';
                guessInput.value = '';
                Toaster('.message', `${guess} is not correct, ${guessessLeft} guesses left`, 'warning', 2)
                    .then(function (falsy) {
                        isTrue = falsy;
                    });
            }

        }
    }



});

function winOrLost(color) {
        guessInput.disabled = true;
        guessBtn.disabled = true;
        guessInput.style.borderColor = color;

        while (message.firstChild) {
            message.firstChild.remove();
        }

}


function Toaster(appendableParent, message, type, time) {
    const validTypes = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark', 'light'];
    const parent = document.querySelector(appendableParent);
    const alertDiv = document.createElement('div');
    const alertMessageP = document.createElement('p');
    const dismissLink = document.createElement('button');

    if (!(validTypes.indexOf(type) > -1)) {
        throw new Error('İnvalid Type');
    }


    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');

    alertMessageP.innerText = message;


    dismissLink.setAttribute('type', 'button');
    dismissLink.setAttribute('data-dismiss', 'alert');
    dismissLink.setAttribute('aria-label', 'close');
    dismissLink.setAttribute('title', 'close');
    dismissLink.className = 'close';
    dismissLink.innerHTML = `<span aria-hidden="true">&times;</span>`;
    alertDiv.appendChild(dismissLink);


    alertDiv.appendChild(alertMessageP);


    parent.appendChild(alertDiv);


    return new Promise((resolve, reject) => {
        setTimeout(function () {
            while (parent.firstChild) {
                parent.firstChild.remove();
            }
            resolve(true);
        }, time * 1000);
    })

}