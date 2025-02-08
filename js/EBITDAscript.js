// Initial game variables
let money = 100;
let workers = 0;
let bottles = 0;
let lemons = 0;
let lemonades = 0;
let startTime;
let bottleAmount = 5;
let lemonAmount = 5;
let lemonadePrice = 2.00;
let wage = 0.10;
let totalSpentOnBottles = 0;
let totalSpentOnLemons = 0;
let totalSpentOnWages = 0;
let totalSpentOnHiring = 0;
let totalSpentOnAdvertising = 0;
let totalProfit = 0;
let daySpentOnBottles = 0;
let daySpentOnLemons = 0;
let daySpentOnWages = 0;
let daySpentOnHiring = 0;
let daySpentOnAdvertising = 0;
let dayProfit = 0;
let customerBoost = 1;
let timerInterval;
let workerInterval;
const gameDuration = 10;

// Update the displayed resources
function updateResources() {
    document.getElementById('money').innerText = money.toFixed(2);
    document.getElementById('workers').innerText = workers;
    document.getElementById('bottles').innerText = bottles;
    document.getElementById('lemons').innerText = lemons;
    document.getElementById('lemonades').innerText = lemonades;
    document.getElementById('lemonadePrice').innerText = lemonadePrice.toFixed(2);
    document.getElementById('wage').innerText = wage.toFixed(2);
}

// Hire a worker
function buyWorker() {
    if (money >= 10) {
        money -= 10;
        workers += 1;
        totalSpentOnHiring += 10;
        daySpentOnHiring += 10;
        updateResources();
    }
}

// Fire a worker
function fireWorker() {
    if (workers > 0) {
        workers -= 1;
        updateResources();
    }
}

// Increase the amount of bottles or lemons to buy
function increaseAmount(type) {
    if (type === 'bottle') {
        bottleAmount += 1;
        document.getElementById('bottleAmount').innerText = bottleAmount;
    } else if (type === 'lemon') {
        lemonAmount += 1;
        document.getElementById('lemonAmount').innerText = lemonAmount;
    }
}

// Decrease the amount of bottles or lemons to buy
function decreaseAmount(type) {
    if (type === 'bottle' && bottleAmount > 1) {
        bottleAmount -= 1;
        document.getElementById('bottleAmount').innerText = bottleAmount;
    } else if (type === 'lemon' && lemonAmount > 1) {
        lemonAmount -= 1;
        document.getElementById('lemonAmount').innerText = lemonAmount;
    }
}

// Increase the price of lemonade
function increasePrice() {
    lemonadePrice = Math.round((lemonadePrice + 0.1) * 100) / 100;
    updateResources();
}

// Decrease the price of lemonade
function decreasePrice() {
    if (lemonadePrice > 0.1) {
        lemonadePrice = Math.round((lemonadePrice - 0.1) * 100) / 100;
        updateResources();
    }
}

// Increase the wage of workers
function increaseWage() {
    wage = Math.round((wage + 0.01) * 100) / 100;
    updateResources();
}

// Decrease the wage of workers
function decreaseWage() {
    if (wage > 0.01) {
        wage = Math.round((wage - 0.01) * 100) / 100;
        updateResources();
    }
}

// Calculate worker productivity based on wage
function getProductivity() {
    if (wage <= 0.1) {
        return wage / 0.1;
    } else {
        return 1 + Math.log(wage / 0.1);
    }
}

// Buy bottles
function buyBottle() {
    const cost = bottleAmount;
    if (money >= cost) {
        money -= cost;
        bottles += bottleAmount;
        totalSpentOnBottles += cost;
        daySpentOnBottles += cost;
        updateResources();
    }
}

// Buy lemons
function buyLemon() {
    const cost = lemonAmount * 0.5;
    if (money >= cost) {
        money -= cost;
        lemons += lemonAmount;
        totalSpentOnLemons += cost;
        daySpentOnLemons += cost;
        updateResources();
    }
}

// Start the day timer
function startDayTimer() {
    resetDayStats();
    clearQuizAndCalculator();
    startTime = new Date().getTime();
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 6000;
        const remainingTime = gameDuration - elapsedTime;
        const rotation = (360 * (elapsedTime / gameDuration)) + 90;

        document.querySelector('.hand').style.transform = `rotate(${rotation}deg)`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(workerInterval);
            document.querySelector('.hand').style.transform = 'rotate(90deg)';
            showEndOfDaySummary();
            document.getElementById('popup').classList.remove('hidden');
        }
    }, 100);

    workerInterval = setInterval(() => {
        if (workers > 0) {
            const wageCost = workers * wage;
            money -= wageCost;
            totalSpentOnWages += wageCost;
            daySpentOnWages += wageCost;
            updateResources();
            produceLemonade();
            attractCustomers();
        }
    }, 2000 / getProductivity());
}

// Produce lemonade
function produceLemonade() {
    for (let i = 0; i < workers; i++) {
        if (bottles > 0 && lemons > 0) {
            bottles -= 1;
            lemons -= 1;
            lemonades += 1;
            updateResources();
        }
    }
}

// Attract customers to buy lemonade
function attractCustomers() {
    const priceFactor = Math.max(0.1, 2.5 - lemonadePrice);
    const customers = Math.floor(Math.random() * 5 * priceFactor * customerBoost);
    for (let i = 0; i < customers; i++) {
        if (lemonades > 0) {
            lemonades -= 1;
            money += lemonadePrice;
            totalProfit += lemonadePrice;
            dayProfit += lemonadePrice;
            updateResources();
        }
    }
    checkGameOver();
}

// Advertise to boost customer purchases
function advertise(type) {
    if (type === 'newspaper' && money >= 10) {
        money -= 10;
        customerBoost += 0.5;
        totalSpentOnAdvertising += 10;
        daySpentOnAdvertising += 10;
        document.getElementById('newspaperAd').disabled = true;
        document.getElementById('newspaperAd').style.backgroundColor = 'grey';
    } else if (type === 'billboard' && money >= 20) {
        money -= 20;
        customerBoost += 1.0;
        totalSpentOnAdvertising += 20;
        daySpentOnAdvertising += 20;
        document.getElementById('billboardAd').disabled = true;
        document.getElementById('billboardAd').style.backgroundColor = 'grey';
    } else if (type === 'tv' && money >= 30) {
        money -= 30;
        customerBoost += 1.5;
        totalSpentOnAdvertising += 30;
        daySpentOnAdvertising += 30;
        document.getElementById('tvAd').disabled = true;
        document.getElementById('tvAd').style.backgroundColor = 'grey';
    }
}

// Check if the game is over (bankruptcy)
function checkGameOver() {
    if (money <= -50) {
        alert('You have gone bankrupt! The game will reset.');
        resetGame();
    }
}

// Reset the game
function resetGame() {
    clearInterval(timerInterval);
    clearInterval(workerInterval);
    money = 100;
    workers = 0;
    bottles = 0;
    lemons = 0;
    lemonades = 0;
    bottleAmount = 5;
    lemonAmount = 5;
    lemonadePrice = 2.00;
    wage = 0.10;
    totalSpentOnBottles = 0;
    totalSpentOnLemons = 0;
    totalSpentOnWages = 0;
    totalSpentOnHiring = 0;
    totalSpentOnAdvertising = 0;
    totalProfit = 0;
    customerBoost = 1;
    resetDayStats();
    clearQuizAndCalculator();
    updateResources();
    startDayTimer();
}

// Reset daily statistics
function resetDayStats() {
    daySpentOnBottles = 0;
    daySpentOnLemons = 0;
    daySpentOnWages = 0;
    daySpentOnHiring = 0;
    daySpentOnAdvertising = 0;
    dayProfit = 0;
}

// Clear the quiz and calculator inputs
function clearQuizAndCalculator() {
    document.getElementById('revenue').value = '';
    document.getElementById('cogs').value = '';
    document.getElementById('opex').value = '';
    document.getElementById('ebitda').value = '';
    document.getElementById('result').value = '';
}

// Submit the quiz answers and validate them
function submitAnswer() {
    const revenue = parseFloat(document.getElementById('revenue').value);
    const cogs = parseFloat(document.getElementById('cogs').value);
    const opex = parseFloat(document.getElementById('opex').value);
    const ebitda = parseFloat(document.getElementById('ebitda').value);

    const correctRevenue = Math.round(dayProfit * 100) / 100;
    const correctCogs = Math.round((daySpentOnBottles + daySpentOnLemons) * 100) / 100;
    const correctOpex = Math.round((daySpentOnWages + daySpentOnHiring + daySpentOnAdvertising) * 100) / 100;
    const correctEbitda = Math.round((correctRevenue - correctCogs - correctOpex) * 100) / 100;

    if (revenue === correctRevenue && cogs === correctCogs && opex === correctOpex && ebitda === correctEbitda) {
        document.getElementById('popup').classList.add('hidden');
        startDayTimer();
    } else {
        alert('Incorrect answers. Please review your calculations and try again.');
    }
}

// Start the game
function startGame() {
    document.getElementById('rules-popup').classList.add('hidden');
    updateResources();
    startDayTimer();
}

// Show the end of day summary
function showEndOfDaySummary() {
    document.getElementById('totalSpentOnBottles').innerText = daySpentOnBottles.toFixed(2);
    document.getElementById('totalSpentOnLemons').innerText = daySpentOnLemons.toFixed(2);
    document.getElementById('totalSpentOnWages').innerText = daySpentOnWages.toFixed(2);
    document.getElementById('totalSpentOnHiring').innerText = daySpentOnHiring.toFixed(2);
    document.getElementById('totalSpentOnAdvertising').innerText = daySpentOnAdvertising.toFixed(2);
    document.getElementById('totalProfit').innerText = dayProfit.toFixed(2);
}

// Calculator functions
function dis(val) {
    document.getElementById("result").value += val;
}

function solve() {
    let x = document.getElementById("result").value;
    let y = eval(x);
    document.getElementById("result").value = Math.round(y * 100) / 100;
}

function clr() {
    document.getElementById("result").value = "";
}

// Show the rules popup on window load
window.onload = function() {
    document.getElementById('rules-popup').classList.remove('hidden');
};
