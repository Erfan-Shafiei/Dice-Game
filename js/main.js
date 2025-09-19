// متغیرهای بازی
let scores = [0, 0];
let currentPlayer = 0;
let gameActive = true;

// عناصر DOM
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');
const historyList = document.getElementById('historyList');

// تابع ریختن تاس
function rollDice() {
    if (!gameActive) return;

    rollBtn.disabled = true;
    dice1.classList.add('rolling');
    dice2.classList.add('rolling');
    dice1.textContent = '';
    dice2.textContent = '';

    setTimeout(() => {
        const value1 = Math.floor(Math.random() * 6) + 1;
        const value2 = Math.floor(Math.random() * 6) + 1;

        dice1.textContent = value1;
        dice2.textContent = value2;
        dice1.classList.remove('rolling');
        dice2.classList.remove('rolling');

        const sum = value1 + value2;
        let bonus = 0;
        let message = `بازیکن ${currentPlayer + 1}: ${value1} و ${value2} (${sum} امتیاز)`;

        if (value1 === value2) {
            bonus = sum * 2;
            message = `بازیکن ${currentPlayer + 1}: جفت ${value1}! (${bonus} امتیاز)`;
        }

        scores[currentPlayer] += bonus > 0 ? bonus : sum;
        updateScores();
        addToHistory(message);

        currentPlayer = 1 - currentPlayer;
        updatePlayerTurn();

        if (scores[0] >= 100 || scores[1] >= 100) {
            const winner = scores[0] >= 100 ? 1 : 2;
            addToHistory(`🎉 بازیکن ${winner} برنده شد! 🎉`);
            gameActive = false;
        } else {
            rollBtn.disabled = false;
        }
    }, 1000);
}

// تابع به روزرسانی امتیازها
function updateScores() {
    player1Score.textContent = scores[0];
    player2Score.textContent = scores[1];
}

// تابع به روزرسانی نوبت بازیکن
function updatePlayerTurn() {
    player1Element.classList.remove('active');
    player2Element.classList.remove('active');

    if (currentPlayer === 0) {
        player1Element.classList.add('active');
    } else {
        player2Element.classList.add('active');
    }
}

// تابع اضافه کردن به تاریخچه
function addToHistory(message) {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = message;
    historyList.insertBefore(item, historyList.firstChild);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }

    // اسکرول به بالا برای دیدن پیام جدید
    historyList.parentElement.scrollTop = 0;
}

// تابع شروع بازی جدید
function resetGame() {
    scores = [0, 0];
    currentPlayer = 0;
    gameActive = true;
    updateScores();
    updatePlayerTurn();
    dice1.textContent = '?';
    dice2.textContent = '?';
    historyList.innerHTML = '<div class="history-item">بازی جدید شروع شد!</div>';
    rollBtn.disabled = false;
}

// رویدادهای کلیک
rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetGame);

// مقداردهی اولیه
updatePlayerTurn();